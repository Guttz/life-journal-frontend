import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/rootStore';
import Timeline from './containers/TimelineContainer';
import Page404 from './views/Pages/Page404/Page404';
import logo from './logo.svg';
import './App.scss';
const store = configureStore();
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/404" render={(props) => <Page404 />} />
            <Route exact path="/" render={() => <Timeline />} />
            <Route
              path="/default"
              exact
              render={() => (
                <div className="App">
                  <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                      Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                      Learn React
                    </a>
                  </header>
                </div>
              )}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    </Provider>
  );
};

export default App;
