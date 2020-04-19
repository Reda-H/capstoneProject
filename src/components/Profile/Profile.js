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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentData: {
        studentID: '',
        firstName: '',
        lastName: '',
        auiID: '',
        balance: '',
      },
    };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
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
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.push('Payment', {screen: 'Payment'});
          }}>
          <Text>Payment</Text>
        </TouchableOpacity>
        {/* <table className="table col-md-6 mx-auto">
          <tbody>
            <tr>
              <td> */}
        <Text>First Name</Text>
        {/* </td>
              <td> */}
        <Text>{this.state.studentData.firstName}</Text>
        {/* </td>
              <tr>
                <td> */}
        <Text>Last Name</Text>
        {/* </td>
                <td> */}
        <Text>{this.state.studentData.lastName}</Text>
        {/* </td>
              </tr>
              <tr>
                <td> */}
        <Text>AUI ID</Text>
        {/* </td>
                <td> */}
        <Text>{this.state.studentData.auiID}</Text>
        {/* </td>
              </tr>
              <tr>
                <td> */}
        <Text>Balance: </Text>
        {/* </td>
                <td> */}
        <Text>{this.state.studentData.balance}</Text>
        {/* </td>
              </tr>
            </tr>
          </tbody>
        </table> */}
      </View>
    );
  }
}

module.exports = Profile;
