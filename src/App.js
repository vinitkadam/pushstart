import React, { Component } from 'react';
// import codePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import reducers from './reducers';


class App extends Component {
  render() {
    const store = createStore(
      reducers,
      {},
      compose(
        applyMiddleware(ReduxThunk),
      )
    );

    persistStore(store, null, () => { store.getState(); });

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

// App = codePush(
//   { 
//     checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
//     installMode: codePush.InstallMode.ON_NEXT_RESUME
//   }
// )(App);

export default App;
