import { createStyles, withStyles } from '@material-ui/core';
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

class App extends React.Component {
  public render() {
    return (
      <div className={styles.root.toString()}>
        <MyAppBar />
        <LoginCard />
      </div>
    );
  }
}

export default withStyles(styles)(App);
