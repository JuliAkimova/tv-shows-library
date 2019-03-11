import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './context';

import Index from './components/pages/Index';
import ShowPage from './components/pages/ShowPage';
import SeasonPage from './components/pages/SeasonPage';
import EpisodePage from './components/pages/EpisodePage';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import Editor from './components/pages/Editor';
import './App.scss';

class App extends Component {
    render() {
        return (
            <Provider>
                <Router>
                    <React.Fragment>
                        <Switch>
                            <Route exact path='/' component={ Index } />
                            <Route exact path='/show/:showTitle' component={ ShowPage } />
                            <Route exact path='/show/:showTitle/:seasonNumber' component={ SeasonPage } />
                            <Route exact path='/show/:showTitle/:seasonNumber/:episodeNumber' component={ EpisodePage } />
                            <Route exact path='/admin' component={ Login } />
                            <Route exact path='/admin/editor' component={ Editor} />
                            <Route component={ NotFound } />
                        </Switch>
                    </React.Fragment>
                </Router>
            </Provider>
        )
    }
};

export default App;
