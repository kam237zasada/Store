import React from 'react';
import { getBuyingDocument } from '../actions/index';
import { connect } from 'react-redux';
import { getCookie } from '../js/index';



class SingleBuyDoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            buyDoc: {},
            products: [],
            seller: {}
        }
    }

    componentDidMount = async () => {
        let jwt = getCookie('jwt');

        try{
            await this.props.getBuyingDocument(jwt, this.props.match.params.id);
            this.setState({buyDoc: this.props.buyDoc})
            this.setState({seller: this.props.buyDoc.seller})
            this.setState({products: this.props.buyDoc.products})
            this.setState({loaded: true})
            console.log(this.state.buyDoc)
        } catch(err) {

        }
    }

    renderTable = () => {
        
        return this.state.products.map((product, index) => {
            return (
                <tr>
                    <td>{index+1}</td>
                    <td>{product.brandId}</td>
                    <td>{product.model}</td>
                    <td>{product.amount}</td>
                    <td>{product.netPrice}</td>
                    <td>{product.grossPrice}</td>
                    <td>{product.totalPrice}</td>
                </tr>
            )
        })
    }

    render() {
        const renderContent = (
            <div className="container">
                <header className="flex center">
                    <div>Data sprzedaży: {this.state.buyDoc.date}</div>
                    <div>Numer dokumentu: {this.state.buyDoc.docNumber}</div>

                    <div>Sprzedawca:
                        <div className="flex column">
                            <div>Firma: {this.state.seller.name}</div>
                            <div>Adres: {this.state.seller.address}</div>
                            <div>Kod i miejscowość: {this.state.seller.postalCode} {this.state.seller.city}</div>
                            <div>NIP: {this.state.seller.NIP}</div>

                        </div>
                    </div>
                </header>
                <table>
                    <thead>
                        <tr>
                            <th>L.p.</th>
                            <th>Marka</th>
                            <th>Model</th>
                            <th>Ilość</th>
                            <th>Cena netto</th>
                            <th>Cena brutto</th>
                            <th>Koszt razem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                        <tr>
                            <td className="right" colspan="7">{this.state.buyDoc.totalPrice}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
        return (
            <div>{this.state.loaded ? renderContent : <div>...Loading...</div>}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return { buyDoc: state.buyDoc };

};

export default connect(
    mapStateToProps,
    { getBuyingDocument }
    )(SingleBuyDoc);