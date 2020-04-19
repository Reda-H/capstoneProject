/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import Profile from './src/components/Profile/Profile';

class App extends React.Component {
  componentDidMount() {
    this.navigation = this.props.navigation;
    // alert(this.navigation);
  }

  constructor(props) {
    super(props);
    this.state = {
      auiID: '',
      password: '',
    };
    this.login = this.login.bind(this);
  }

  render() {
    return (
      <>
        <StatusBar barStyle="black" />
        <SafeAreaView>
          <ScrollView>
            <View>
              <Text>Login here !</Text>

              <View>
                <TextInput
                  underlineColorAndroid="transparent"
                  onChangeText={auiID => this.setState({auiID})}
                  value={this.state.auiID}
                  placeholder="Your AUI ID"
                />

                <TextInput
                  secureTextEntry={true}
                  underlineColorAndroid="transparent"
                  onChangeText={password => this.setState({password})}
                  value={this.state.password}
                  placeholder="Your Password"
                />
              </View>
              <TouchableOpacity onPress={this.login}>
                <Text>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }

  login = async () => {
    await fetch('http://192.168.43.13:3000/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auiID: this.state.auiID,
        password: this.state.password,
      }),
    })
      .then(response => response.json())
      .then(res => {
        if (res.success === true) {
          var studentData = {
            auiID: res.auiID,
            studentID: res.studentID,
            firstName: res.firstName,
            lastName: res.lastName,
            balance: res.balance,
          };
          try {
            AsyncStorage.setItem('studentData', JSON.stringify(studentData));
            this.navigation.navigate('Profile', {screen: 'Profile'});
          } catch (error) {
            console.log(error);
          }
        } else {
          // eslint-disable-next-line no-alert
          // Alert.alert(':/');
        }
      })
      .then()
      .done();
    // this.navigation.navigate('Profile', {name: 'Jane'})
  };
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
