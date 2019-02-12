import React from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import Auth from '@aws-amplify/auth';

class TestPageScreen extends React.Component {


  constructor() {
    super();
    this.state = {data: '', myRender: ''};
  }

  componentWillMount(){
    const data = {"list":[{"type":"TextInput", "text":"mon texte", "key":"234"}, {"type":"TextInput", "text":"mon TextInput", "key":"99870999"}]};
    this.setState({ data });
  }

  Story(props) {
    
    var returnValue = [];;
    var key=0;

    props.list.forEach(item => {
    
      if(item.type=='TextInput'){
        //console.log(item.type);
        //Fixer la clef
        let myKey = key;
          returnValue.push(<TextInput style={styles.label} key={key} onChangeText={(text) => {this.HandleChange(text, myKey); this.value=text;}} >{this.state.data.list[myKey].text}</TextInput>);
      }
      key++;
    });

    //Add sauvegarde
    returnValue.push(
      <TouchableOpacity key={Math.random()} onPress={() => this.AddTextInput()}>
                      <View style={styles.button}>
              <Text style={styles.buttonText}>Sauvegarde</Text>
            </View>
            </TouchableOpacity>);

    //Add TextInput
    returnValue.push(
      <TouchableOpacity key={Math.random()} onPress={() => console.log('ok')}>
                      <View style={styles.button}>
              <Text style={styles.buttonText}>Sauvegarde</Text>
            </View>
            </TouchableOpacity>);
    return returnValue;
  }

  AddTextInput = () => {
    console.log('AddTextInput function !');
    console.log(this.state.data.list.length);
    this.state.data.list.push({"type":"TextInput", "text":"mon texte", "key":Math.random()});
    console.log(this.state.data.list.length);
    console.log(this.state.data.list[this.state.data.list.length-1]);
    mydata = this.Story(this.state.data);
  }

  HandleChange = (e, f) => {
    console.log("e : " + e);
    console.log("f : " + JSON.stringify(f));
    //console.log(this.state);
    console.log("avant : " + this.state.data.list[JSON.stringify(f)].text);
    this.state.data.list[JSON.stringify(f)].text = e;
    console.log("après : " + this.state.data.list[JSON.stringify(f)].text);
    //this.setState({e: e});
  }

  render() {
    let tmp = this.Story(this.state.data);
    this.setState(myRender: tmp);
    return (
      <View style={styles.form}>{this.state.myRender}</View>
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
    marginTop:10,
    paddingTop:40,
    backgroundColor: '#2196F3',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
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
});

export default TestPageScreen;
