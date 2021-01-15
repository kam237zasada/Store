import React from 'react';
import { connect } from 'react-redux';
import Options from './Options';
import { getCookie } from '../js'
import { getBrands, addBrand, addModel } from '../actions'


class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            brands: [],
            fetch: false,
            brandSelected: null,
            modelSelected: null,
            amount: 0,
            netPrice: '',
            serialNumbers: [],
            error: '',
            newBrand: '',
            newModel: '',
            addingError: ''
        }
    }

    componentDidMount = async () => {
        

    }

    handleBrands = async () => {
        this.setState({fetch: true})
        let jwt = getCookie('jwt');
        try {
            await this.props.getBrands(jwt)
            this.setState({brands: this.props.brands})
        } catch(err) {

        }
    
    }

    handleSelect = e => {
        this.setState({brandSelected: e})
        this.setState({models: e.models})
        console.log(this.state.models)
    }

    selectModel = e => {
        this.setState({modelSelected: e})
    }

    handleChange = e => {
        this.setState({error: ''})
        switch(e.target.name) {
            case 'amount':
                this.setState({amount: e.target.value});
                break;
            case 'netPrice':
                this.setState({netPrice: e.target.value});
                break;
            case 'brand':
                this.setState({newBrand: e.target.value});
                this.setState({addingError: ''})
                let error = document.getElementById('error-message');
                error.innerHTML=''
                break;
            case 'model':
                this.setState({newModel: e.target.value});
                this.setState({addingError: ''})
                let err = document.getElementById('error-message');
                err.innerHTML=''
            default:
                break;
        }
    }

    handleSerials = e => {
        this.setState({error: ''})
        let array = e.target.name.split('-');
        let index = array[1]
        let serials = this.state.serialNumbers;
        serials[index] = e.target.value;
        this.setState({serialNumbers: serials})
        console.log(serials)
    }

    renderInputs = () => {
        let number = Number(this.state.amount)
        let array = []
        for(let i=0; i<number;i++) {
            array.push('')
        }



        return array.map((element, index) => {
            console.log(`abc${index}`)
            return (
                <div className="field"><label>{index+1}.</label>
                <input className="input"
                name={`serialNumber-${index}`}
                onChange={this.handleSerials}
                /></div>
            )
        })
    }

    handleAdd = e => {
        e.preventDefault();
        this.setState({error: ''});
        if(!this.state.brandSelected || this.state.brandSelected==='') {
            return this.setState({error: 'Musisz wybrać markę'})
        }
        if(!this.state.modelSelected || this.state.modelSelected==='') {
            return this.setState({error: 'Musisz wybrać model'})
        }
        if(!this.state.amount || this.state.amount==='' || this.state.amount==0 || isNaN(this.state.amount)) {
            return this.setState({error: 'Podaj poprawną liczbe ilości'})
        }
        if(!this.state.netPrice || this.state.netPrice==='' || isNaN(this.state.netPrice)) {
            return this.setState({error: 'Podaj poprawną cenę netto'})
        }
        let isEmpty = false;
        if(this.state.serialNumbers.length===0) {isEmpty=true}
        this.state.serialNumbers.map(serial => {
            if(serial.length===0) {
                console.log(serial)
                isEmpty=true
            }
        })

        if(isEmpty) {
            return this.setState({error: 'Podaj wszystkie numery seryjne'})
        }
        let grossPrice = this.state.netPrice*1.23;
        grossPrice = Number(Math.round(grossPrice + 'e+2') + 'e-2')
        let amount = Number(this.state.amount);
        amount = Number(Math.round(amount + 'e+2') + 'e-2')
        let totalPrice = grossPrice*amount;
        // let serials = []
        // this.state.serialNumbers.map(serial => {
        //     serials.push({
        //         serialNumber: serial,
        //         netPrice: this.state.netPrice,
        //         grossPrice: grossPrice
        //     })
        // })
        
        let product = {brand: this.state.brandSelected, model: this.state.modelSelected, amount: this.state.amount, netPrice: this.state.netPrice, grossPrice: grossPrice, serialNumbers: this.state.serialNumbers, totalPrice: totalPrice}
        this.props.addToList(product)
    }

    handleCloseForm = () => {
        this.setState({addingError: ''})
        let error = document.getElementById('error-message');
            error.innerHTML=''
        let container = document.getElementById("new-container")
        container.remove();
        let mask = document.getElementById("mask");
        mask.remove();   
    }

    handleNewModel = async () => {
        this.setState({addingError: ''})
            let error = document.getElementById('error-message');
            error.innerHTML=''
        const jwt = getCookie('jwt');
        try {
            await this.props.addModel(jwt, this.state.brandSelected._id, this.state.newModel);
            this.setState({addingError: this.props.brand.message})
            let error = document.getElementById('error-message');
            error.innerHTML=`${this.props.brand.message}`
            let models = this.state.models;
            models.unshift(this.state.newModel);
            this.setState({models: models})
            setTimeout(()=> {
                
                this.handleCloseForm();

            },1000);
        } catch(err) {
            this.setState({addingError: err.response.data})
            let error = document.getElementById('error-message');
            error.innerHTML=`${this.state.addingError}`
        }
    }

    newModel = e => {
        e.preventDefault();
        let root = document.getElementById("root");
        let mask = document.createElement("div");
        mask.setAttribute("id", "mask");
        root.after(mask);
        let container = document.createElement('div');
        container.setAttribute('class', "flex column");
        container.setAttribute('id', 'new-container');
        let header = document.createElement("header")
        header.setAttribute("class", "flex")
        header.innerText="Dodaj nowy model"
        container.appendChild(header);
        let handleClose = document.createElement('button');
        handleClose.setAttribute("class", "button red")
        handleClose.innerHTML="zamknij <b>x</b>";
        handleClose.addEventListener("click", this.handleCloseForm);
        header.appendChild(handleClose);
        let content = document.createElement('div');
        content.setAttribute('class', 'flex column');
        container.appendChild(content);
        let input = document.createElement('input');
        input.setAttribute('class', 'input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'model')
        input.setAttribute('placeholder', 'Podaj nazwę modelu');
        input.addEventListener("change", this.handleChange)
        content.appendChild(input)
        let submit = document.createElement('button');
        submit.setAttribute('class', 'button green');
        submit.addEventListener("click", this.handleNewModel);
        submit.innerHTML="DODAJ";
        content.appendChild(submit);
        let error = document.createElement('div');
        error.setAttribute('id', 'error-message')
        error.innerHTML= `${this.state.addingError}`;
        content.appendChild(error);




        root.after(container)
    }

    handleNewBrand = async () => {
        this.setState({addingError: ''})
            let error = document.getElementById('error-message');
            error.innerHTML=''
        const jwt = getCookie('jwt');
        try {
            await this.props.addBrand(jwt, this.state.newBrand, []);
            this.setState({addingError: this.props.brand.message})
            let error = document.getElementById('error-message');
            error.innerHTML=`${this.props.brand.message}`
            setTimeout(()=> {
                this.handleCloseForm();

            },1000);
        } catch(err) {
            this.setState({addingError: err.response.data})
            let error = document.getElementById('error-message');
            error.innerHTML=`${this.state.addingError}`
        }
    }
    newBrand = e => {
        e.preventDefault();
        let root = document.getElementById("root");
        let mask = document.createElement("div");
        mask.setAttribute("id", "mask");
        root.after(mask);
        let container = document.createElement('div');
        container.setAttribute('class', "flex column");
        container.setAttribute('id', 'new-container');
        let header = document.createElement("header")
        header.setAttribute("class", "flex")
        header.innerText="Dodaj nowa markę"
        container.appendChild(header);
        let handleClose = document.createElement('button');
        handleClose.setAttribute("class", "button red")
        handleClose.innerHTML="zamknij <b>x</b>";
        handleClose.addEventListener("click", this.handleCloseForm);
        header.appendChild(handleClose);
        let content = document.createElement('div');
        content.setAttribute('class', 'flex column');
        container.appendChild(content);
        let input = document.createElement('input');
        input.setAttribute('class', 'input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'brand')
        input.setAttribute('placeholder', 'Podaj nazwę marki');
        input.addEventListener("change", this.handleChange)
        content.appendChild(input)
        let submit = document.createElement('button');
        submit.setAttribute('class', 'button green');
        submit.addEventListener("click", this.handleNewBrand);
        submit.innerHTML="DODAJ";
        content.appendChild(submit);
        let error = document.createElement('div');
        error.setAttribute('id', 'error-message')
        error.innerHTML= `${this.state.addingError}`;
        content.appendChild(error);




        root.after(container)
    }
    render() {
        return(
            <div className="container flex column">
                <header className="flex center">
                    <button>X</button>
                </header>
                <main>
                    <form className="form">
                        <div className="field">
                            <label>MARKA</label><select 
                            onClick={this.handleBrands}
                            className="input"
                            >
                                <option value="">Wybierz z listy</option>
                                {this.state.fetch ? <Options select={this.handleSelect} options={this.state.brands}/> : null}
                            </select>
                            <button onClick={this.newBrand} className="button green">DODAJ MARKĘ</button>
                        </div>
                        {this.state.brandSelected ? <div className="field">
                            <label>MODEL</label><select onClick={this.handleBrands} className="input">
                                <option value="">Wybierz z listy</option>
                                {this.state.fetch ? <Options select={this.selectModel} options={this.state.models}/> : null}
                            </select>
                            <button onClick={this.newModel}className="button green">DODAJ MODEL</button>
                        </div> : null}
                        <div classname="field">
                            <label>ILOŚĆ</label><input
                            className="input"
                            name="amount"
                            type="text"
                            onChange={this.handleChange}
                            />
                        </div>
                        <div classname="field">
                            <label>CENA NETTO</label><input
                            className="input"
                            name="netPrice"
                            type="text"
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="flex column">
                            <h3>Numery seryjne</h3>
                            {this.renderInputs()}
                        </div>
                        <button onClick={this.handleAdd}className="button green">DODAJ DO LISTY</button>
                        {this.state.error}
                    </form>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { brands: state.brands, brand: state.brand };

};

export default connect(
    mapStateToProps,
    { getBrands, addBrand, addModel }
    )(Form);