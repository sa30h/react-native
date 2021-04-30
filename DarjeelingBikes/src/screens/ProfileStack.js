import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
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
  createStackNavigator
  
} from "@react-navigation/stack";
import axios from 'axios'

import Profile from './Profile';
import ProfileCard from '../components/ProfileCard';
import {ProfileContext} from './context'
import AsyncStorage from "@react-native-async-storage/async-storage";




const Stack = createStackNavigator();

export default function ProfileStack() {





   const [state, dispatch] = React.useReducer(

    (prevState, action) => {
      switch (action.type) {
        case 'PROFILE_AVAILABLE':
          return {
            ...prevState,
            profileAvailable: true,
            isLoading: false
          };
      }
    },
    {
      isLoading: true,
      profileAvailable:false     
    }
  );


 const profileContext = React.useMemo(
    () => ({
      
        profileAvailable:()=>{
        dispatch({type:'PROFILE_AVAILABLE'})
      }
    }),
    []
  );



  React.useEffect(() => {
    async function getProfile() {
      const token = await AsyncStorage.getItem("Token");

      await axios
        .get(`${URL}/vendor/profile`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          
          console.log("profile")
        })
        .catch((err) => {
         
          console.log("CAnt get User Profile");
        });


     
    }

  
    getProfile();
  }, []);



  return (
    <ProfileContext.Provider value={profileContext} >
    <Stack.Navigator
     screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: COLORS.primary }
      }}

    >
     {state.profileAvailable == true ? (
          <Stack.Screen name="Profile" component={ProfileCard} />
        ) : (
          <Stack.Screen name="CreateProfile" component={Profile}   options={{
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }} />
        )}
     
     
    </Stack.Navigator>
    </ProfileContext.Provider>
  )
}