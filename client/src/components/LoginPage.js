import React from 'react';
import { connect } from 'react-redux';
import { userLogin, getUser } from '../actions/index';
import { getCookie } from '../js/index'
import Desktop from './Desktop'


class LoginPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            login:'',
            password: '',
            error: '',
            isSigned: false
        };
    };

    componentDidMount = async () => {
        let jwt = getCookie('jwt');
        try {
            await this.props.getUser(jwt);
            this.setState({isSigned: true})
        } catch(err) {
            console.log(err)
        }
    }

    handleChange = e => {
        this.setState({error: ''})
        switch(e.target.name) {
            case 'login':
                this.setState({login: e.target.value});
            break;
            case 'password':
                this.setState({password: e.target.value})
                break;
            default:
                break;
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        try {
            await this.props.userLogin(this.state.login, this.state.password)
            this.setState({isSigned: true})
        } catch(err) {
            this.setState({error: err.response.data})
        }
    }

    render() {

        const signform = (
            <div>
            <form id="signin" className="form">
                <div className="field">
                <input
                className="input"
                type="text"
                name="login"
                placeholder="login"
                required
                onChange={this.handleChange}
                />
                </div>
                <div className="field">
                <input
                className="input"
                name="password"
                type="password"
                placeholder="hasło"
                required
                onChange={this.handleChange}
                />
                </div>
                <input className="button"
                type="submit"
                value="Zaloguj"
                form="signin"
                onClick={this.handleSubmit}
                />
            </form>
            {this.state.error}
            </div>
        )
        return (
            <div>
            {this.state.isSigned ? <Desktop user={this.props.user}/> : signform}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { user: state.user };

};

export default connect(
    mapStateToProps,
    { userLogin, getUser }
    )(LoginPage);