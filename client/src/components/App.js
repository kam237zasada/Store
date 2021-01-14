import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage'
import Desktop from './Desktop'
import '../style/style.css'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={LoginPage}/>
                <Route path='/*' exact component={Desktop}/>
            </Switch>
        </Router>
    )
}

export default App