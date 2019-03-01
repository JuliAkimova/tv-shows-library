import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './App.scss';
import Navbar from './components/shared/Navbar';
import Index from './components/pages/Index';
import { Provider } from './context';

class App extends Component {
    render() {
        return (
            <Provider>
                <Router>
                    <React.Fragment>
                        <Navbar />
                        <div>
                            <Switch>
                                <Route exact path="/" component={ Index } />
                            </Switch>
                        </div>
                    </React.Fragment>
                </Router>
            </Provider>
        )
    }
};

export default App;
