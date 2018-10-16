import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import LoadingStore from'../stores/loading';

const styles = createStyles({
    root: {
        position: "fixed",
        right: 0,
        bottom: 0
    }
});

interface IProps extends WithStyles<typeof styles> {
    loading?: LoadingStore;
}

@inject('loading')
@observer
class LoadingSwitch extends React.Component<IProps> {
    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const loading = this.props.loading as LoadingStore;
        console.log(event.target.checked);
        if(event.target.checked) {
            loading.allowLoading();
        } else {
            loading.disallowLoading();
        }
    }

    public render() {
        const loading = this.props.loading as LoadingStore;
        const { classes } = this.props;
        return (
            <FormControlLabel className={classes.root} control={<Switch checked={loading.loadingSwitch} onChange={this.handleChange} />} label="로딩 표시하기"/>
        );
    }
}

export default withStyles(styles)(LoadingSwitch);