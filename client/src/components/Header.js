import React from 'react';
import { connect } from 'react-redux';
import { checkRoom } from '../actions';
import { Redirect } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            peopleAmount: 1,
            adults: 1,
            children: 0,
            checkInDate: '',
            checkOutDate: '',
            typeId:'',
            roomId:'',
            goAhead: false
        }
    }

    handleChange = e => {
        switch(e.target.name) {
            case 'Adults':
                this.setState({adults: e.target.value});
                this.setState({peopleAmount: Number(this.state.adults) + Number(this.state.children)});
            break;
            case 'Kids':
                this.setState({children: e.target.value});
                this.setState({peopleAmount: Number(this.state.adults) + Number(this.state.children)});
            break;
            case 'CheckIn':
                console.log(e.target.valueAsNumber)
                this.setState({checkInDate: e.target.valueAsNumber});
            break;
            case 'CheckOut':
                console.log(e.target.valueAsNumber)
                this.setState({checkOutDate: e.target.valueAsNumber});
            break;   
            case 'Type':
                this.setState({typeId: e.target.value})      

        }

    }

    renderTypes = () => {
        if(this.state.peopleAmount === 1) {
            return (
                <><option value="5ee7f4319a5b10434447312e">Pojedynczy</option>
                <option value="5ee7f43a9a5b10434447312f">Podwójny</option>
                <option value="5eed64fdfd0288371800efc5">DeLuxe</option>
                <option value="5eed6506fd0288371800efc6">Rodzinny</option></>
            )
        } else if(this.state.peopleAmount < 3) {
                return(
                <><option value="5ee7f43a9a5b10434447312f">Podwójny</option>
                <option value="5eed64fdfd0288371800efc5">DeLuxe</option>
                <option value="5eed6506fd0288371800efc6">Rodzinny</option></>
                )
        } else if(this.state.peopleAmount >= 3) {
                return (
                <><option value="5eed64fdfd0288371800efc5">DeLuxe</option>
                <option value="5eed6506fd0288371800efc6">Rodzinny</option></>
                )
        }
    }

    handleCheckRoom = async e => {
        e.preventDefault();
        if(this.state.checkInDate ==='' || this.state.checkOutDate==='') {
            return this.setState({error: "Musisz podać datę planowanego zameldowania oraz wymeldowania!"})
        } else if(this.state.checkInDate >= this.state.checkOutDate) {
            return this.setState({error: "Data wymeldowania musi być datą późniejszą!"})
        } 
        else if (this.state.checkOutDate<Date.now()) {return this.setState({error: "Data wymeldowania nie może być wcześniejsza niż data dzisiejsza!"})}
        else if(this.state.typeId==='') {
            return this.setState({error: "Musisz wybrac rodzaj pokoju!"});
        }
        try {
        await this.props.checkRoom(this.state.checkInDate, this.state.checkOutDate, this.state.typeId);
        this.setState({roomId: this.props.room})
        sessionStorage.setItem("dateStart", this.state.checkInDate);
        sessionStorage.setItem("dateEnd", this.state.checkOutDate);
        this.setState({goAhead: true})
        } catch (error) {
            sessionStorage.removeItem("roomId")
            this.setState({error: error.response.data})
            this.setState({roomId:''})
        }
    }

    render() {


        const renderSite = (
            <header className="w3-display-container w3-content" style={{maxWidth: "1500px"}}>
                <img className="w3-image" src="img/baner.jpg" alt="The Hotel" style={{minWidth: "1000px", width:"1500", height:"800"}}/>
                <div className="w3-display-left w3-padding w3-col l6 m8">
                    <div className="w3-container w3-red">
                    <h2><i className="fa fa-bed w3-margin-right"></i>Copernicus</h2>
                    </div>
                    <div className="w3-container w3-white w3-padding-16">
                    <form action="/action_page.php" target="_blank">
                        <div className="w3-row-padding" style={{margin: "0 -16px"}}>
                        <div className="w3-half w3-margin-bottom">
                            <label><i className="fa fa-calendar-o"></i> Zamelduj się </label>
                            <input className="w3-input w3-border" type="date" placeholder="DD MM YYYY" name="CheckIn" onChange={this.handleChange} required/>
                        </div>
                        <div className="w3-half">
                            <label><i className="fa fa-calendar-o"></i> Wymelduj się </label>
                            <input className="w3-input w3-border" type="date" placeholder="DD MM YYYY" name="CheckOut" onChange={this.handleChange} required/>
                        </div>
                        </div>
                        <div className="w3-row-padding" style={{margin: "8px -16px"}}>
                        <div className="w3-half w3-margin-bottom">
                            <label><i className="fa fa-male"></i> Dorośli</label>
                            <input className="w3-input w3-border" type="number" value={this.state.adults} min="1"name="Adults" onChange={this.handleChange}/>
                        </div>
                        <div className="w3-half">
                            <label><i className="fa fa-child"></i> Dzieci</label>
                        <input className="w3-input w3-border" type="number" value={this.state.children} min="0" name="Kids" onChange={this.handleChange}/>
                        </div>
                        <div className="w3-half">
                            <label><i className="fa fa-bed"></i> Rodzaj pokoju</label>
                        <select className="w3-input w3-border" name="Type" onChange={this.handleChange}>
                            <option value="">Wybierz</option>
                            {this.renderTypes()}
                        </select>
                        </div>
                        </div>
                        <span style={{color:"red"}}>{this.state.error}</span>
                        <button className="w3-button w3-dark-grey" type="submit" onClick={this.handleCheckRoom}><i className="fa fa-search w3-margin-right"></i> Szukaj dostępnych </button>
                    </form>
                    </div>
                </div>
                </header>
        )
        return(
            <>{this.state.goAhead ? <Redirect push to="/identities"/>: renderSite}</>
        )
    }
}

const mapStateToProps = (state) => {
    return { room: state.room };
};

export default connect(
    mapStateToProps,
    { checkRoom }
    )(Header);