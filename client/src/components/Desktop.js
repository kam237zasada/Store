import React from 'react';
import Header from './Header';
import Menu from './Menu';
import Content from './Content';
import { userSignOut } from '../actions/index';
import { connect } from 'react-redux';


class Desktop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user
        }
    }

    componentDidMount = () => {
    }

    handleSignOut = async () => {
        await this.props.userSignOut();
    }

    render() {
        return <div><Header user={this.state.user} signOut={this.handleSignOut}/>
        <div className="flex">
        <Menu/>
        <Content/>
        </div></div>
    }
}

const mapStateToProps = (state) => {
    return { user: state.user };

};

export default connect(
    mapStateToProps,
    { userSignOut }
    )(Desktop);