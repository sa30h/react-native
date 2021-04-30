import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View ,Button} from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Thumbnail,
  List,
  ListItem,
  Left,
  Right,
  Icon,

} from "native-base";
import { COLORS, FONTS, SIZES } from "../../constants";
import {
  createStackNavigator,
  HeaderBackground,
} from "@react-navigation/stack";


import Home from "./Home";
import MyBikesScreen from "./MyBikesScreen";
import ReadyBikesScreen from "./ReadyBikesScreen";
import Login from './Login';
import ProfileCard from '../components/ProfileCard'
import EditBikeScreen from './EditBikeScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Stack = createStackNavigator();

export default function HomeStack() {


     const[isLogin,setIsLogin]=React.useState(false)


  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('Token')
        if(value !== null) {
          console.log("something went wrong",value)
          setIsLogin(true)


        }
      } catch(e) {
        console.log("cannot get token")
        setIsLogin(false)
      }
    }
    getData()
  }, []);




  return (
    
    <Stack.Navigator 
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: COLORS.primary }
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MyBikes" component={MyBikesScreen} options={{ headerTitleStyle: {fontWeight: "bold",}, }} />
      <Stack.Screen name="ReadyBikes" component={ReadyBikesScreen}
        options={{
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
       <Stack.Screen name="EditScreen" component={EditBikeScreen}
        options={{
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    
     

     
    

    </Stack.Navigator>

  );
}
