import React from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../actions'
import { getCookie } from '../js'

class Store extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            loaded: false,
            error: ''
        }
    }

    componentDidMount = async () => {
        const jwt = getCookie('jwt');
        try {
            await this.props.getProducts(jwt);
            this.setState({products: this.props.products})
        } catch(err) {
            this.setState({error: err.response.data})
        }       
        this.setState({loaded: true})

    }

    renderTable = () => {

        return this.state.products.map(product => {

            return (
                <tr>
                    <td>{product.brand.name}</td>
                    <td>{product.model}</td>
                    <td>{product.amount}</td>
                </tr>
            )
        })
    }

    render() {
        const renderSite = (
                    <div className="container">
                    <header className="flex">Magazyn
                    </header>
                    <main>
                        <table>
                            <thead>
                                <tr>
                                    <th>Marka</th>
                                    <th>Model</th>
                                    <th>Ilość</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTable()}
                            </tbody>
                        </table>
                    </main>
                    {this.state.error}
                </div>
                )
                return (
                    <>{this.state.loaded ? renderSite : <div>...Loading...</div>}</>
                )    }
}

const mapStateToProps = (state) => {
    return { products: state.products };

};

export default connect(
    mapStateToProps,
    { getProducts }
    )(Store);