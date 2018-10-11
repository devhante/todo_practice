import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppStore from './stores/app';
import TodoStore from './stores/todo';
import UserStore from './stores/user';

const app = new AppStore();
const todo = new TodoStore();
const user = new UserStore();

ReactDOM.render(
  <Provider app={app} todo={todo} user={user}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
