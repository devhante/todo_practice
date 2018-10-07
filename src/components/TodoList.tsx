import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import TodoCard  from './TodoCard';

const styles = createStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        marginTop: "120px"
    }
});

interface IProps extends WithStyles<typeof styles> { }

class Content extends React.Component<IProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <TodoCard />
                <TodoCard />
                <TodoCard />
            </div>
        );
    }
}

export default withStyles(styles)(Content);