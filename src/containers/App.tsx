import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import MyAppBar from '../components/MyAppBar';
import Content from './Content';

const styles = createStyles({
  root: {
    minHeight: 'inherit',
  }
});

interface IProps extends WithStyles<typeof styles> { }

class App extends React.Component<IProps> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MyAppBar />
        <Content />
      </div>
    );
  }
}

export default withStyles(styles)(App);
