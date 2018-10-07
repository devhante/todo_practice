import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import LoginCard from './LoginCard';
import MyAppBar from './MyAppBar';

const styles = createStyles({
  root: {
    display: 'flex',
    height: 'inherit',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

interface IProps extends WithStyles<typeof styles> { }

class App extends React.Component<IProps> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MyAppBar />
        <LoginCard />
      </div>
    );
  }
}

export default withStyles(styles)(App);
