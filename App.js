import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsconfig from './aws-exports';
import Auth from '@aws-amplify/auth';

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);

export default class App extends React.Component {
  state = {
    email: '',
    password: ''
  };

  render() {
    return (
<View style={styles.container}>
  <Text style={styles.label} h4>Email</Text>
  <TextInput 
    label="Password" 
    secureTextEntry={false} 
    style={styles.input} 
    value={this.state.password}
    onChangeText={email => this.setState({ email })}/>

    <Text style={styles.label} h4>Password</Text>
  <TextInput 
    label="Password" 
    secureTextEntry={true} 
    style={styles.input} 
    value={this.state.password}
    onChangeText={password => this.setState({ password })}/>

      </View>
    );
  }
}

function test(){
	alert("ok");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#fff',
  },
  label: {
    backgroundColor: '#f0f',
  },
});
