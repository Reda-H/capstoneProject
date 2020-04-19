import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import {login} from '../../../server-side/routes/Users'

 class Login extends Component {
    constructor(){
        super()
        this.state = {
            auiID: '',
            passwordHash: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
        
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()

        const user = {
            auiID: this.state.auiID,
            passwordHash: this.state.passwordHash
        }

        login(user).then(res => {
            if(res) {
                this.props.history.push('/profile')
            }
        })


    }

    render() {
        return (
            <View style={styles.logform}>
                <form noValidate onSubmit={this.onSubmit}>
                <Text style={styles.header}>Login Page</Text>

                <TextInput style={styles.textinput} placeholder="AUI ID" underlineColorAndroid={'transparent'} />
                
                <TextInput style={styles.textinput} secureTextEntry={true} placeholder="PASSWORD" underlineColorAndroid={'transparent'} />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btntext}>Login !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btntext}>Register your ID !</Text>
                </TouchableOpacity>
                </form>
            </View>
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

export default Login