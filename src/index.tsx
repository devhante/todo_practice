import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import RootStore from './stores/root'

const root = new RootStore();

ReactDOM.render(
  <Provider root={root}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
