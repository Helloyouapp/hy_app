import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, InputText, Dimensions, Image } from 'react-native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import Storage from '@aws-amplify/storage';
import { createStackNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { Constants } from 'expo';

class CreatePage extends Component {

  state = {
    list: [...Array(20)].map((d, index) => ({
      key: `item-${index}`,
      label: index,
      backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index * 5}, ${132})`,
    })),
    isMoving: false,
  }
  
  constructor(...args) {
    super(...args);

    this.props.navigation.addListener('didFocus', () => {
      console.log('time to launch!');
      //From listPage
      if(this.props.navigation.state.params.fromKey!=null && this.props.navigation.state.params.fromKey!=''){
        console.log("constructor ! : "+this.props.navigation.state.params.fromKey);
        this.setState({'fromKey' : this.props.navigation.state.params.fromKey});
        this.launch();
      }else 
      //From roll photo
      if(this.props.navigation.state.params.image!=null && this.props.navigation.state.params.image!=''){
        console.log('Get image :'+JSON.stringify(this.props.navigation.state.params.image));
        this.AddElement('image', this.props.navigation.state.params.image);
      }
    });

    this.props.navigation.addListener('didBlur', () => {
      console.log('time to sav!');
      //TODO
      //this.SavMyData(false);
    });

  }

  componentWillMount(){
    
  }



  launch(){
    console.log("launch ! : "+this.props.navigation.state.params.fromKey);
    var key = this.props.navigation.state.params.fromKey;
    Storage.get(key+'.json', {level: 'private'})
      .then(result => {
        fetch(result)
          .then(response => response.json())
            .then(data => {
              //console.log("data :" + JSON.stringify(data));
              this.state.data=data;
              var tmp = this.state.data.list.map((d, index) => ({
                                key: `item-${index}`,
                                type: d.type,
                                text: d.text,
                                uri: d.uri,
                                width: d.width,
                                height: d.height,
                              }));
              this.setState({'list': tmp});
              this.forceUpdate(); 
              this.state.isSav=true;
            })
            .catch(error => {console.log(error);});
      })
      .catch(err => console.log(err));
  }

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    //console.log("item : " +item);
    console.log("item : " +item.text);
    switch(item.type) {
      case 'note':
        return (
          <TouchableOpacity
            style={this.state.isMoving ? styles.MovingBlock : styles.nothing}
            onLongPress={()=>{console.log("onLongPress!"); move();}}
            onPressOut={()=>{console.log("onPressOut!");moveEnd();}}
          >
            <Text 
              style={this.state.isMoving ? styles.nothing : styles.MovingBlock}
              key={Math.random()} 
            >
              {item.text}{this.state.isMoving?"true":"false"}
            </Text>

          </TouchableOpacity>
        );
        break;

      case 'text':
        return (
          <TouchableOpacity
            style={this.state.isMoving ? styles.MovingBlock : styles.nothing}
            onLongPress={()=>{console.log("onLongPress!"); move();}}
            onPressOut={()=>{console.log("onPressOut!");moveEnd();}}
          >
            <Text 
              style={this.state.isMoving ? styles.nothing : styles.MovingBlock}
              key={Math.random()} 
            >
              {item.text}{this.state.isMoving?"true":"false"}
            </Text>

          </TouchableOpacity>
        );
        break;

      case 'image':
        return (
          <TouchableOpacity
            //style={} 
            style={this.state.isMoving ? styles.MovingBlock : styles.nothing}
            onLongPress={()=>{console.log("onLongPress!"); move();}}
            onPressOut={()=>{console.log("onPressOut!");moveEnd();}}
          >
            <Image 
            style={this.state.isMoving ? styles.nothing : {width: Dimensions.get('window').width, height: Math.min((item.height * Dimensions.get('window').width / item.width), item.height) || 100}}
            //style={this.state.isMoving ? styles.nothing : styles.nothing}
              key={Math.random()} 
              source={{uri: item.uri}} 
            />

          </TouchableOpacity>
        );
        break;

        default:
          console.log('Sorry, we are out of ' + item.type + '.');
  }
  }

  render() {
    return (
      <View style={styles.container}>

        <DraggableFlatList
          data={this.state.list}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          scrollPercent={5}
          onMoveEnd={({ data }) => this.setState({ 'list': data})}
        />
        <TouchableOpacity key={Math.random()} onPress={() => {console.log("onPressButton");this.setState({'isMoving':true});}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Start move</Text>
            </View>
          </TouchableOpacity>

                  <TouchableOpacity key={Math.random()} onPress={() => {console.log("onPressButton");this.setState({'isMoving':false});}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>End move</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity key={Math.random()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{this.state.isMoving?"true":"false"}</Text>
            </View>
          </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    paddingTop: Constants.statusBarHeight,
  },
  nothing: {

  },
  MovingBlock: {
    padding:5,
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1, 
    borderColor: '#555' 
  },
  note: {
    padding:5,
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1, 
    borderColor: '#555' 
  },
  text: {
    padding:5,
    height: 150,
    backgroundColor: '#fff',
    borderWidth: 1, 
    borderColor: '#555' 
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

export default CreatePage