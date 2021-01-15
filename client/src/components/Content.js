import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Buying from './Buying';
import Selling from './Selling';
import Settings from './Settings';
import Store from './Store';
import SingleBuyDoc from './SingleBuyDoc';
import NewBuyDoc from './NewBuyDoc';
import NewSellDoc from './NewSellDoc';

class Content extends React.Component {

    render() {

        return (
        <Router>
            <Switch>
                <Route path='/zakupy' exact component={Buying}/>
                <Route path='/zakupy/dokument/:id' exact component={SingleBuyDoc}/>
                <Route path='/sprzedaz' exact component={Selling}/>
                <Route path='/konfiguracja' exact component={Settings}/>
                <Route path='/magazyn' exact component={Store}/>
                <Route path='/zakupy/dodaj' exact component={NewBuyDoc}/>
                <Route path='/sprzedaz/dodaj' exact component={NewSellDoc}/>
            </Switch>
        </Router>
        )
    }
}

export default Content

