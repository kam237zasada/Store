import React from 'react';
import { connect } from 'react-redux';
import Options from './Options';
import Form from './Form'
import { getSellers, addBuyingDocument, addProduct } from '../actions';
import { getCookie } from '../js';

class NewBuyDoc extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fetchSellers: false,
            sellers: [],
            sellerSelected: '',
            addProduct: false,
            products: [],
            date: '',
            docNumber: '',
            error:'',
            totalPrice: 0
        }
    }

    componentDidMount = () => {

    }

    handleSellers = async () => {
        const jwt = getCookie('jwt');
        if(this.state.sellers.length===0) {
        try {
            await this.props.getSellers(jwt);
            this.setState({sellers: this.props.sellers})
        } catch(err) {

        }
    }
        this.setState({fetchSellers: true})

    }

    handleAdd = () => {
        console.log("dodaj nowy")
    }

    totalPrice(products) {

        let totalPrice = 0;
        products.map(product => {
            totalPrice+=product.totalPrice;
        })
        this.setState({totalPrice: totalPrice})
    }

    addToList = e => {
        let products = this.state.products;
        products.push(e)
        this.setState({products: products})
        this.setState({addProduct: false})
        this.totalPrice(this.state.products);
        
    }

    handleSelect = e => {
        this.setState({sellerSelected: e})
    }

    handleProduct = () => {
        
        this.setState({addProduct: true})
    }

    handleDelete = e => {
        let products = this.state.products;
        products.splice(e.target.id, 1);
        this.setState({products: products})
        this.totalPrice(this.state.products);
    }

    handleChange = e => {
        switch(e.target.name) {
            case 'date':
                this.setState({date: e.target.valueAsNumber})
                break;
            case 'docNumber':
                this.setState({docNumber: e.target.value})
                break;
            default:
                break;
        }
    }

    renderTable = () => {
        return this.state.products.map((product, index) => {
            return (
                <tr>
                    <td>{index+1}</td>
                    <td>{product.brand.name}</td>
                    <td>{product.model}</td>
                    <td>{product.amount}</td>
                    <td>{product.netPrice}</td>
                    <td>{product.grossPrice}</td>
                    <td>{product.totalPrice}</td>
                    <td><button id={index} onClick={this.handleDelete}className="button red"><i className="fas fa-trash"></i></button></td>
                </tr>
            )
        })
    }

    handleAddBuyDoc = async () => {
        const jwt = getCookie('jwt');
        this.setState({error: ''})
        if(this.state.date==='') { return this.setState({error: 'Musisz podać datę'})}
        if(this.state.docNumber==='') { return this.setState({error: 'Musisz podać numer dokumentu'})}
        if(this.state.sellerSelected==='' || !this.state.sellerSelected) { return this.setState({error: 'Musisz podać sprzedawcę'})};
        if(this.state.products.length===0) { return this.setState({error: 'Musisz dodać produkty'})};

        try {
            await this.props.addBuyingDocument(jwt, this.state.date, this.state.docNumber, this.state.sellerSelected._id, this.state.products, this.state.totalPrice)
            this.state.products.map(async product => {
                await this.props.addProduct(jwt, product.brand._id, product.model, product.amount, product.serialNumbers)
            })
        } catch(err) {
            return this.setState({error: err.response.data})
        }
    }
    

    render() {
        return(
            <div className="container">
                <h1 className="narrow">Nowy dokument zakupowy</h1>
                <header className="flex narrow center">
                    <div className="date narrow">
                        <input className="input" type="date"
                        name="date"
                        onChange={this.handleChange}
                        placeholder="Wybierz datę"/>
                    </div>
                    <div className="doc-number narrow">
                        <div className="field">
                            <input className="input"
                            type="text"
                            name="docNumber"
                            onChange={this.handleChange}

                            placeholder="Numer dokumentu"/>
                        </div>
                    </div>
                    <div className="seller narrow">
                        <select className="input" onClick={this.handleSellers}>
                            <option value="">Wybierz sprzedawcę z listy</option>
                            <option onClick={this.handleAdd}value="">Dodaj nowy + </option>
                            {this.state.fetchSellers ? <Options select={this.handleSelect} options={this.state.sellers}/> : null}
                        </select>
                        <div className="flex column">
                            <div>Nazwa firmy: {this.state.sellerSelected.name}</div>
                            <div>Adres: {this.state.sellerSelected.address}</div> 
                            <div>Kod i miejscowość: {this.state.sellerSelected.postalCode} {this.state.sellerSelected.city}</div>
                            <div>NIP: {this.state.sellerSelected.NIP}</div>
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
                            <th>Koszt brutto</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                        <tr><td className="right"colspan="8">RAZEM: {this.state.totalPrice}</td></tr>
                    </tbody>
                </table>
                <button onClick={this.handleProduct} className="button green">DODAJ PRODUKT +</button>
                {this.state.addProduct ? <Form addToList={this.addToList}/> : null}

                <button onClick={this.handleAddBuyDoc} className="button green">DODAJ DOKUMENT ZAKUPOWY</button>
                {this.state.error}
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return { sellers: state.sellers, buyDoc: state.buyDoc };

};

export default connect(
    mapStateToProps,
    { getSellers, addBuyingDocument, addProduct }
    )(NewBuyDoc);