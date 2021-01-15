import React from 'react';
import { connect } from 'react-redux';
import { getSells } from '../actions/index';
import { getCookie, getDate } from '../js/index';

class Selling extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            sells: [],
            loaded: false
        }
    }

    componentDidMount = async () => {
        let jwt = getCookie('jwt');
        if(jwt) {
            await this.props.getSells(jwt);
            this.setState({sells: this.props.sells})
        }

        this.setState({loaded: true})
    }

    renderTable = () => {

        return this.state.sells.map(sell => {
            let date = new Date(sell.date);
            let stringDate = getDate(date)

            return (
                <tr>
                    <td>{sell.ID}</td>
                    <td>{stringDate}</td>
                    <td>{sell.brand.name}</td>
                    <td>{sell.model}</td>
                    <td>{sell.serialNumber}</td>
                    <td>{sell.buyNetPrice}</td>
                    <td>{sell.buyGrossPrice}</td>
                    <td>{sell.sellNetPrice}</td>
                    <td>{sell.sellGrossPrice}</td>
                    <td><a href={`/sprzedaz/dokument/${sell._id}`}><i className="fas fa-info-circle"></i></a></td>
                </tr>
            )
        })
    }

    render() {

        const renderSite = (
            <div className="container">
            <header className="flex">
                <a href='/sprzedaz/dodaj'><button className="button green">DODAJ SPRZEDAŻ</button></a>
            </header>
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data sprzedaży</th>
                            <th>Marka</th>
                            <th>Model</th>
                            <th>Numer seryjny</th>
                            <th>Cena zakupu netto</th>
                            <th>Cena zakupu brutto</th>
                            <th>Cena sprzedaży netto</th>
                            <th>Cena sprzedaży brutto</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
            </main>
        </div>
        )
        return (
            <>{this.state.loaded ? renderSite : <div>...Loading...</div>}</>
        )
    }
}

const mapStateToProps = (state) => {
    return { sells: state.sells };

};

export default connect(
    mapStateToProps,
    { getSells }
    )(Selling);