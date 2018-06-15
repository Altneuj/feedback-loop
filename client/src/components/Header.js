import React , {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions'

class Header extends Component{

  renderLogin = () => {
      console.log(this.props.auth)
        if(!this.props.auth) {
            return <a href='/auth/google'>Login with Google</a>
        }
        return <a href='/api/logout'>Logout</a>
        }

    render(){
        return(
        <nav>
            <div className="nav-wrapper">
                <a className="left brand-logo">
                </a>
                <ul className="right">
                    <li>
                        {this.renderLogin()}
                    </li>
                </ul>
            </div>
        </nav>)
    }
}

function mapStateToProps({auth}){
return {auth}
}

export default connect(mapStateToProps, actions)(Header);
