import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
import { createStackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';

class CreatePageScreen extends React.Component {


  constructor(...args) {
    super(...args);
    this.state = {data:'', isSav:true, fromKey:''};

    this.props.navigation.addListener('didFocus', () => {
      if(!this.state.isSav){
      Alert.alert(
        'Alert Title',
        'Une page est en cours de création. Voulez-vous abandonner ?',
        [
          {text: 'Sauvegarder et continuer', onPress: () => {console.log('Sauvegarder et continuer'); this.SavMyData();} },
          {text: 'Retour au brouillon', onPress: () => console.log('Retour au brouillon')},
        ],
        {cancelable: false},
      );
    }
     this.launch();
    });
  }

  launch = () => {

    console.log(this.state.isSav);
    if(this.state.isSav){
      const uuidv4 = require('uuid/v4');
      let myTmp = {"id":uuidv4(),"list":[]};
      this.state.data = myTmp;
      this.state.fromKey = this.props.navigation.state.params.myKey;
      //console.log('create page : ' + this.state.fromKey);
      Storage.get(this.state.fromKey, {level: 'private'})
        .then(result => {console.log(result);
          fetch(result)
            .then(response => response.json() )
            .then(data => {console.log(data); this.state.data = data; this.forceUpdate();} )
            .catch(error => console.log(error));
        })
        .catch(err => console.log(err));

    }else{
      // Works on both iOS and Android

    }
  }

  Story(props) {
    
    var returnValue = [];
    var key=0;
    if(props.list){
    props.list.forEach(item => {
    
      if(item.type=='TextInput'){
        //console.log(item.type);
        //Fixer la clef
        let myKey = item.sort;
        returnValue.push(<TextInput style={styles.input} key={key} onChangeText={(text) => {this.HandleChange(text, myKey); this.value=text;}} >{this.state.data.list[myKey].text}</TextInput>);
      }
      key++;
    });
  }
    return returnValue;
  }

  SavMyData = () => {
    Storage.put(this.state.data.id+".json", JSON.stringify(this.state.data), {
      level: 'private',
      contentType: 'text/plain'
    })
    .then (result => {console.log(result); this.setState({isSav:true});})
    .catch(err => console.log(err));
  }

  AddElement = () => {
    this.state.data.list.push({"type":"TextInput", "text":'', "sort":this.state.data.list.length});
    this.setState({isSav:false});
    this.forceUpdate();
  }

  RemoveElement = () => {
    this.state.data.list.splice(this.state.data.list.length-1, 1);
    this.setState({isSav:false});
    this.forceUpdate();
  }

  HandleChange = (e, f) => {
    this.state.data.list[JSON.stringify(f)].text = e;
    this.setState({isSav:false});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          {this.Story(this.state.data)}
        </View>
        <View style={styles.submitButton}>
          
          <TouchableOpacity key={Math.random()} onPress={() => this.SavMyData()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sauvegarde</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity key={Math.random()} onPress={() => this.AddElement()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity key={Math.random()} onPress={() => this.RemoveElement()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Remove</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  
}
}

const styles = StyleSheet.create({
  form: {
    padding: 80, 
    backgroundColor: '#f5fcff',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  label: {
    color: '#000000'
  },
button: {
  padding:5,
  margin:5,
  height: 40,
  backgroundColor: '#2196F3',
      alignItems: 'stretch',
  justifyContent: 'center',
    },
  buttonText: {
    color: 'white'
  },
container: {
    backgroundColor: '#f5fcff',
    flex: 1,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1, 
    borderBottomColor: '#555' 
  },
  submitButton: {
    position: 'absolute',
    bottom:0,
    left:0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default CreatePageScreen;
