import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import NfcManager, {NfcTech, NfcEvents} from 'react-native-nfc-manager';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import Verification from './Verification';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
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
  }

  componentDidMount() {
    this._loadInitialState().done();
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.warn('tag', tag);
      NfcManager.setAlertMessageIOS('I got your tag!');
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
  }

  componentWillUnmount() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  _loadInitialState = async () => {
    this.navigation = this.props.navigation;
    try {
      const data = await AsyncStorage.getItem('studentData');
      this.setState({studentData: JSON.parse(data)});
    } catch (err) {
      console.log('Error retrieving data' + err);
    }
  };

  render() {
    return (
      <View styles={styles.container}>
        {this.renderButton('Bottom half modal', () =>
          this.setState({visibleModal: true}),
        )}
        <Text>Your Balance:</Text>
        <Text>{this.state.studentData.balance}</Text>
        <TouchableOpacity onPress={this._test}>
          <Text>TEST HERE BOIIIIIIIIIIIIIIIIIIIIIIIIIIII</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.visibleModal} style={styles.bottomModal}>
          {this.renderModalContent()}
        </Modal>
      </View>
    );
  }

  _cancel = () => {
    NfcManager.unregisterTagEvent().catch(() => 0);
  };

  _test = async () => {
    try {
      console.log('here');
      await NfcManager.registerTagEvent();
      console.log('done');
    } catch (ex) {
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };

  toggleVerification = () => {
    this.setState({launchVerification: true});
    console.log(this.state.launchVerification);
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

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Are you sure you want to conduct this transaction !</Text>
      {this.renderButton('Close', () => {
        this.setState({visibleModal: null});
      })}
    </View>
  );

  renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

module.exports = Payment;
