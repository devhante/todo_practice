import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import * as React from 'react';

const styles = createStyles({
    root: {
        minWidth: '344px',
        minHeight: '148px',
        marginTop: "36px"
    }
});

interface IProps extends WithStyles<typeof styles> { }

class TodoCard extends React.Component<IProps> {
    public render() {
        const { classes } = this.props;
        return (
            <Card className={classes.root}>
                투두리스트입니다
            </Card>
        );
    }
}

export default withStyles(styles)(TodoCard);