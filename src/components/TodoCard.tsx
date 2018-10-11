import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { TodoSerializer } from '../serializer';
import TodoStore from '../stores/todo'

const styles = createStyles({
    root: {
        minWidth: '344px',
        marginTop: "36px",
        padding: '16px 24px 8px 8px'
    },
    content: {
        fontSize: '24px',
        marginLeft: '16px',
        marginBottom: '12px'
    },
    middle: {
        marginLeft: '16px',
        color: 'rgba(0, 0, 0, 0.39)' 
    },
    name: {
        
    },
    createdAt: {
        marginBottom: '12px',
    },
    bottom: {
        display: 'flex'
    },
    buttonComplete: {
        marginRight: '4px'
    },
    buttonDelete: {

    },
    blank: {
        flexGrow: 1
    },
    likeNumber: {
        padding: '12px'
    },
    likeGray: {
        color: 'rgba(0, 0, 0, 0.54)'
    },
    likeRed: {
        color: '#E31B23'
    },
});

interface IProps extends WithStyles<typeof styles> {
    id: number;
    todo?: TodoStore;
}

@inject('todo')
@observer
class TodoCard extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    private addLike = () => {
        const todo = this.props.todo as TodoStore;
        axios.post('https://practice.alpaca.kr/api/todo/' + this.props.id + '/add_like/','', {
            headers: { 'Authorization': 'Token ' + localStorage.getItem('authToken') }
        })
        .then((response: AxiosResponse) => {
            const data = response.data as TodoSerializer;
            todo.setLike(data.id, data.like);
        })
        .catch((err: AxiosError) => {
            if(err.response !== undefined) {
                console.log(err.response);
            }
        });
    }

    public render() {
        const todo = this.props.todo as TodoStore;
        const { classes } = this.props;

        let myTodo = new TodoSerializer;
        todo.todoList.forEach((item) => {
           if(item.id === this.props.id) {
               myTodo = item;
           }
        });

        const year = Number(myTodo.createdAt.substring(0, 4));
        const month = Number(myTodo.createdAt.substring(5, 7));
        const date = Number(myTodo.createdAt.substring(8, 10));
        const ampm = Number(myTodo.createdAt.substring(11, 13)) < 12 ? '오전' : '오후';
        let hour = Number(myTodo.createdAt.substring(11, 13));
        const minute = Number(myTodo.createdAt.substring(14, 16));
        const second = Number(myTodo.createdAt.substring(17, 19));

        if(hour > 12) {
            hour -= 12;
        }

        return (
            <Card className={classes.root}>
                <Typography className={classes.content}>
                    {myTodo.content}
                </Typography>
                <Typography className={[classes.middle, classes.name].join(' ')}>
                    {myTodo.user.name}
                </Typography>
                <Typography className={[classes.middle, classes.createdAt].join(' ')}>
                    {year}년 {month}월 {date}일 {ampm} {hour}시 {minute}분 {second}초에 생성됨
                </Typography>
                <div className={classes.bottom}>
                    <Button className={classes.buttonComplete} size="medium" color="primary">
                        완료
                    </Button>
                    <Button className={classes.buttonDelete} size="medium" color="primary">
                        삭제
                    </Button>
                    <span className={classes.blank} />
                    <IconButton className={myTodo.like > 0 ? classes.likeRed : classes.likeGray} onClick={this.addLike}>
                        <FavoriteIcon fontSize="small"/>
                    </IconButton>
                    <Typography className={[classes.likeNumber, myTodo.like > 0 ? classes.likeRed : classes.likeGray].join(' ')}>
                        {myTodo.like}
                    </Typography>
                    
                </div>
            </Card>
        );
    }
}

export default withStyles(styles)(TodoCard);