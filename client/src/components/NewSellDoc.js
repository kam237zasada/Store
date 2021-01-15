import React from 'react';
import { connect } from 'react-redux';

class NewSellDoc extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <form id="newbuydoc" className="form">
                    <div className="field">
                        <input 
                        className="input"
                        name="serialNumber"
                        placeholder='Numer seryjny'
                        />
                    </div>
                    <div className="field">
                        <input 
                        className="input"
                        name="brand"
                        placeholder='Marka'
                        />
                    </div>
                    <div className="field">
                        <input 
                        className="input"
                        name="model"
                        placeholder='Model'
                        />
                    </div>
                </form>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return { user: state.user };

};

export default connect(
    mapStateToProps,
    { }
    )(NewSellDoc);