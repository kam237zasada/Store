import React from 'react';
import { connect } from 'react-redux';
import { getBuyingDocuments } from '../actions/index';
import { getCookie, getDate } from '../js/index';

class Buying extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            buyDocs: [],
            loaded: false
        }
    }

    componentDidMount = async () => {
        let jwt = getCookie('jwt');
        if(jwt) {
            await this.props.getBuyingDocuments(jwt);
            this.setState({buyDocs: this.props.buyDocs})
        }

        this.setState({loaded: true})
    }

    renderTable = () => {

        return this.state.buyDocs.map(buyDoc => {
            let date = new Date(buyDoc.date);
            let stringDate = getDate(date)

            return (
                <tr>
                    <td>{buyDoc.ID}</td>
                    <td>{stringDate}</td>
                    <td>{buyDoc.docNumber}</td>
                    <td>{buyDoc.seller.name}</td>
                    <td>{buyDoc.totalPrice}</td>
                    <td><a href={`/zakupy/dokument/${buyDoc._id}`}><i className="fas fa-info-circle"></i></a></td>
                </tr>
            )
        })
    }

    render() {

        const renderSite = (
            <div className="container">
            <header className="flex">
                <a href='/zakupy/dodaj'><button className="button green">DODAJ DOKUMENT ZAKUPOWY</button></a>
            </header>
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>L.p.</th>
                            <th>Data sprzedaży</th>
                            <th>Numer dokumentu</th>
                            <th>Sprzedawca</th>
                            <th>Kwota brutto</th>
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
    return { buyDocs: state.buyDocs };

};

export default connect(
    mapStateToProps,
    { getBuyingDocuments }
    )(Buying);