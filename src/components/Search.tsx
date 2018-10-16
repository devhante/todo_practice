import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import SearchStore from '../stores/search';

const styles = createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '120px'
    },
    textField: {
        width: '280px'
    }
});

interface IProps extends WithStyles<typeof styles> {
    search?: SearchStore;
}

@inject('search')
@observer
class Search extends React.Component<IProps> {
    private handleChangeSearchWord = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = this.props.search as SearchStore;
        search.setSearchWord(event.currentTarget.value);
    }

    public render() {
        const search = this.props.search as SearchStore;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <TextField className={classes.textField} label="검색" value={search.searchWord} onChange={this.handleChangeSearchWord} />
            </div>
        );
    }
}

export default withStyles(styles)(Search);