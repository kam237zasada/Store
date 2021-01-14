import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Buying from './Buying';
import Sell from './Sell';
import Settings from './Settings';
import Store from './Store';
import SingleBuyDoc from './SingleBuyDoc'

class Content extends React.Component {

    render() {

        return (
        <Router>
            <Switch>
                <Route path='/zakupy' exact component={Buying}/>
                <Route path='/zakupy/dokument/:id' exact component={SingleBuyDoc}/>
                <Route path='/sprzedaz' exact component={Sell}/>
                <Route path='/konfiguracja' exact component={Settings}/>
                <Route path='/magazyn' exact component={Store}/>
            </Switch>
        </Router>
        )
    }
}

export default Content

