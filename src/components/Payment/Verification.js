/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  Platform,
  Dimensions,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Modal from 'react-native-modal';

class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.isVisible,
    };
  }

  verified = () => {
    this.isVisible = false;
  };

  componentDidMount() {
    console.log(this.state.isVisible);
  }

  render() {
    return this.state.isVisible ? (
      <View style={styles.container}>
        <Modal
          animationIn="slideInDown"
          style={styles.bottomModal}
          isVisible={this.state.isVisible}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}>
            <Text>Model Content</Text>
            <Button
              title="Something"
              onPress={() => {
                this.setState({isVisible: false});
              }}
            />
          </View>
        </Modal>
      </View>
    ) : (
      <View>
        <Text>There was an error !</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = Verification;
