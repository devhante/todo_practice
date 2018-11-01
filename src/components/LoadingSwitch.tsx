import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import RootStore from'../stores/root';

const styles = createStyles({
    root: {
        position: "fixed",
        right: 0,
        bottom: 0
    }
});

interface IProps extends WithStyles<typeof styles> {
    root?: RootStore;
}

@inject('root')
@observer
class LoadingSwitch extends React.Component<IProps> {
    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const root = this.props.root as RootStore;
        console.log(event.target.checked);
        if(event.target.checked) {
            root.loadingStore.allowLoading();
        } else {
            root.loadingStore.disallowLoading();
        }
    }

    public render() {
        const root = this.props.root as RootStore;
        const { classes } = this.props;
        return (
            <FormControlLabel className={classes.root} control={<Switch checked={root.loadingStore.loadingSwitch} onChange={this.handleChange} />} label="로딩 표시하기"/>
        );
    }
}

export default withStyles(styles)(LoadingSwitch);