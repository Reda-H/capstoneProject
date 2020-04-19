import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';

 class Register extends Component {
    constructor(){
        super()
        this.state = {
            studentID: '',
            firstName: '',
            lastName: '',
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
            studentID: this.state.studentID,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            auiID: this.state.auiID,
            passwordHash: this.state.passwordHash
        }

        register(user).then(res => {
            if(res) {
                this.props.history.push('/login')
            }
        })


    }

    render() {
        return (
            <View style={styles.logform}>
                <form noValidate onSubmit={this.onSubmit}>
                <Text style={styles.header}>Register Here</Text>

                <TextInput style={styles.textinput} placeholder="AUI ID" underlineColorAndroid={'transparent'} />

                <TextInput style={styles.textinput} placeholder="FIRST NAME" underlineColorAndroid={'transparent'} />

                <TextInput style={styles.textinput} placeholder="LAST NAME" underlineColorAndroid={'transparent'} />
                
                <TextInput style={styles.textinput} secureTextEntry={true} placeholder="PASSWORD" underlineColorAndroid={'transparent'} />

                <TextInput style={styles.textinput} secureTextEntry={true} placeholder="VERIFY PASSWORD" underlineColorAndroid={'transparent'} />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btntext}>Add your ID</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btntext}>Log In Here</Text>
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

export default Register