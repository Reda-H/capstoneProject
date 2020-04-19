import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Login from './Login/Login'

class Navbar extends Component {
    logOut(e){
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }

    render() {
       const loginPage = (<Login />)
       const loggedOutPage = (
           <li className="navbar-nav">
               <li className="nav-item">
                   <Link to="/profile" className="nav-link">
                       Profile
                   </Link>
               </li>
               <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                        Log Out
                    </a>
               </li>
           </li>
       )
       
       return  (
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
               <TouchableOpacity style={styles.button}>
                    <Text style={styles.btntext}>Login !</Text>
                </TouchableOpacity>
           </nav>
       )
    }
}


const styles = StyleSheet.create({
    logform: {
        alignSelf: 'stretch'
    },
    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#59cbbd',
        marginTop: 30
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default withRouter(Navbar)