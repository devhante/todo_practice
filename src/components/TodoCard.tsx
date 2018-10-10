import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import * as React from 'react';
import { TodoSerializer } from '../serializer';

const styles = createStyles({
    root: {
        minWidth: '344px',
        minHeight: '148px',
        marginTop: "36px"
    }
});

interface IProps extends WithStyles<typeof styles> {
    data: TodoSerializer;
}

class TodoCard extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { classes } = this.props;
        return (
            <Card className={classes.root}>
                {this.props.data.content}
            </Card>
        );
    }
}

export default withStyles(styles)(TodoCard);