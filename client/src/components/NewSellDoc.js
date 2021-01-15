import React from 'react';
import { connect } from 'react-redux';
import { findSerials, findBySerial, addSell } from '../actions'
import { getCookie, changeNumber } from '../js'

function Serials({select, serials}) {
    return serials.map(serial => {
        return <li onClick={select.bind(null, serial)}class="li">{serial}</li>
    })
    
}

class NewSellDoc extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            serials: [],
            error: '',
            serialNumber: '',
            showSerials: false,
            brand: '',
            model: '',
            description: '',
            date: '',
            sellNetPrice: '',
            sellGrossPrice: '',
            brandId: ''
        }
    }

    handleChange = async e => {
        switch(e.target.name) {
            case 'serialNumber':
                this.setState({serialNumber: e.target.value})
                const jwt = getCookie('jwt')

                try {
                    await this.props.findSerials(jwt, this.state.serialNumber)
                    this.setState({serials: this.props.products})
                    this.setState({showSerials: true})
                    console.log(this.state.serials)
                } catch(err) {
                    this.setState({error: err.response.data})
                    this.setState({serials: []})
                    return
                }
                if(e.target.value==='') { this.setState({serials: []})}

            break;
            case 'date':
                this.setState({date: e.target.valueAsNumber});
                break;
            case 'description': 
                this.setState({description: e.target.value});
                break;
            case 'sellNetPrice':
                this.setState({sellNetPrice: e.target.value});
                let grossPrice = Number(e.target.value)*1.23;
                grossPrice = Number(Math.round(grossPrice + 'e+2') + 'e-2')
                this.setState({sellGrossPrice: grossPrice})
                break;

            default:
                break;
        }
    }

    renderSerials = () => {
        return this.state.serials.map(serial => {
            return <li className="li">{serial}</li>
        })
    }

    fillForm = async (serialNumber) => {
        console.log("fill")
        const jwt = getCookie('jwt');
        try {
            await this.props.findBySerial(jwt, serialNumber);
            this.setState({brand: this.props.product.brand.name});
            this.setState({brandId: this.props.product.brand._id})
            this.setState({model: this.props.product.model})
        } catch (err) {
            return this.setState({error: err.response.data})
        }
    }

    handleSelect = serial => {
        this.setState({serialNumber: serial});
        console.log(serial)
        this.setState({showSerials: false})
        this.fillForm(serial);
    }

    handleAdd = async e => {
        e.preventDefault();
        const jwt = getCookie('jwt');
        let sellGrossPrice = changeNumber(this.state.sellGrossPrice);
        let sellNetPrice = changeNumber(this.state.sellNetPrice)
        try {
            await this.props.addSell(jwt, this.state.brandId, this.state.model, this.state.date, sellNetPrice, sellGrossPrice, this.state.serialNumber, this.state.description)
        } catch(err) {
            return this.setState({error: err.response.data})
        }

    }


    render() {
        return(
            <div>
                <header className="flex">
                    <div className="field narrow">
                        <label>Data sprzedaży: </label><input name="date" onChange={this.handleChange} type="date"/>
                    </div>
                </header>
                <form id="newbuydoc" className="form">
                    <div className="field">
                        <input 
                        className="input"
                        name="serialNumber"
                        value={this.state.serialNumber}
                        onChange={this.handleChange}
                        placeholder='Numer seryjny'
                        />
                    </div>
                    {this.state.showSerials ? <div className="flex column"><ul className="ul"><Serials select={this.handleSelect} serials={this.state.serials}/></ul></div> : null}
                    <div className="field">
                        <input 
                        readOnly={true}
                        className="input readonly"
                        name="brand"
                        value={this.state.brand}
                        placeholder='Marka'
                        />
                    </div>
                    <div className="field">
                        <input 
                        className="input readonly"
                        readOnly={true}
                        name="model"
                        value={this.state.model}
                        placeholder='Model'
                        />
                    </div>
                    <div className="field">
                        <input 
                        className="input"
                        onChange={this.handleChange}
                        name="sellNetPrice"
                        placeholder='Cena netto'
                        />
                    </div>
                    <div className="field">
                        <input 
                        readOnly={true}
                        value={this.state.sellGrossPrice}
                        className="input"
                        name="sellGrossPrice"
                        placeholder='Cena brutto'
                        />
                    </div>
                    <div className="field">
                        <textarea 
                        className="input"
                        onChange={this.handleChange}
                        name="description"
                        placeholder='Uwagi'
                        cols="20"
                        rows="7"
                        ></textarea>
                    </div>
                    <button onClick={this.handleAdd} className="button green">DODAJ</button>
                    {this.state.error}
                </form>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return { products: state.products, product: state.product };

};

export default connect(
    mapStateToProps,
    { findSerials, findBySerial, addSell }
    )(NewSellDoc);