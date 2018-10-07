import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import * as React from 'react';

const styles = createStyles({
    root: {
        display: "flex",
        justifyContent: 'center'
    },
    card: {
        minWidth: '344px',
        minHeight: '148px'
    }
});

interface IProps extends WithStyles<typeof styles> { }

class Content extends React.Component<IProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    투두리스트입니다
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(Content);