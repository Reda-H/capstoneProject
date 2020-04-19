import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Verification from './Verification';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      launchVerification: false,
      studentData: {
        studentID: '',
        firstName: '',
        lastName: '',
        auiID: '',
        balance: '',
      },
      transactionData: {
        senderID: '',
        verification: '',
        receiverID: '',
        value: '',
        status: '',
        timestamp: '',
      },
    };
    this.history = this.history.bind(this);
    this.toggleVerification = this.toggleVerification.bind(this);
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    this.navigation = this.props.navigation;
    try {
      const data = await AsyncStorage.getItem('studentData');
      this.setState({studentData: JSON.parse(data)});
      console.log(this.state.studentData);
    } catch (err) {
      console.log('Error retrieving data' + err);
    }
  };

  render() {
    return (
      <View>
        <Text>Your Balance:</Text>
        <Text>{this.state.studentData.balance}</Text>
        <TouchableOpacity
          onPress={() => {
            this.toggleVerification();
            // AsyncStorage.setItem(
            //   'studentData',
            //   JSON.stringify(this.state.studentData),
            // );
            // this.history();
          }}>
          <Text>Payment</Text>
        </TouchableOpacity>
        <Verification isVisible={this.state.launchVerification} />
      </View>
    );
  }

  toggleVerification = () => {
    this.setState({launchVerification: true});
  };

  history = async () => {
    await fetch('http://192.168.43.13:3000/users/transfer/history', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderID: this.state.studentData.auiID,
      }),
    })
      .then(response => response.json())
      .then(res => {
        if (res.success === true) {
          this.setState({
            transactionData: {
              senderID: res.senderID,
              verification: res.verification,
              receiverID: res.receiverID,
              value: res.value,
              status: res.status,
              timestamp: res.timestamp,
            },
          });
          try {
            AsyncStorage.setItem(
              'transferData',
              JSON.stringify(this.state.transferData),
            );
          } catch (error) {
            console.log(error);
          }
        } else {
          // eslint-disable-next-line no-alert
          // Alert.alert(':/');
        }
      })
      .then(() => {})
      .done();
  };
}

module.exports = Payment;
