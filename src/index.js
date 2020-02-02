import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import './styles/index.css';
import App from './components/App';
import UpsertExpense from './components/UpsertExpense';
import Groceries from './components/Groceries';
import NoMatch from './components/NoMatch';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/add-expense" component={UpsertExpense}/>
        <Route path="/groceries" component={Groceries}/>
        <Route path="/" component={App}/>
        <Route path="*" component={NoMatch}/>
      </Switch>
    </Router>
  </Provider>, 
document.getElementById('root'));
