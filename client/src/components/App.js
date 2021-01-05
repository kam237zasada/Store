import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={LandingPage}/>
                <Route path="/identities" exact component={Identities}/>
                <Route path="/admin/*" exact component={AdminHomePage}/>
            </Switch>
        </Router>
    )
}

export default App