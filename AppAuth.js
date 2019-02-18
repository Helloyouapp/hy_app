import React from 'react';
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, SafeAreaView, ScrollView, Icon } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './views/Home';
import ProfileScreen from './views/Profile';
import CreatePageScreen from './views/CreatePage';
import ListPageScreen from './views/ListPage';
import TabMenuScreen from './views/TabMenu';
import Auth from '@aws-amplify/auth';

class AppAuth extends React.Component {

  constructor(...props) {
    super(...props);
  }

  componentWillMount(){
  }

  render() {
    
    return (
        <MyDrawer/>
    );
  }
}

const CustomdrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 50}}>
      <Text></Text>
    </View>
      <Text style={styles.text}>Logo</Text>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
    <TouchableOpacity {...props} onPress={() => {

    const {navigate} = props.navigation;
      Auth.signOut()
  .then((data) => {
    console.log(data);
    navigate('App', {number: Math.random()});
    }
  )
  .catch(err => console.log(err));
    }}>
            <View style={styles.button}>
           
              <Text style={styles.buttonText}>Logout</Text>
            </View>
          </TouchableOpacity>
  </SafeAreaView>
  );


const MyDrawerNavigator = createDrawerNavigator({
  'Home': TabMenuScreen,
  'Profile': ProfileScreen,
  //'Journal': ListPageScreen,
  //'Create Page': CreatePageScreen
}, 
{
  headerMode: 'none',
  drawerPosition: 'right',
  drawerWidth: 200,
  contentComponent: CustomdrawerComponent
}, 
{
  navigationOptions: {
    headerMode: 'none',
  },
});

const MyDrawer = createAppContainer(MyDrawerNavigator);

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
  alignItems: 'center',
  justifyContent: 'center',
    },
  buttonText: {
    color: 'white'
  },
  text: {
  alignItems: 'center',
  justifyContent: 'center',
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

export default MyDrawer;
