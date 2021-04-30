import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./Home";
import MyBikesScreen from "./MyBikesScreen";
import HomeStack from "./HomeStack";
import ProfileStack from './ProfileStack';
import AddScreenStack from './AddScreenStack';


import { COLORS } from "../../constants";
import AddScreen from "./AddScreen";
import Login from "./Login";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




const Tab = createBottomTabNavigator();

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {

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
  }, [isLogin]);

  return (
   
   
    <View style={styles.container}>
     
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home";
              } else if (route.name === "Add") {
                iconName = focused ? "plus" : "plus";
              } else if (route.name === "Profile") {
                iconName = focused ? "face" : "face";
              }
// <AntDesign name={iconName} size={30} color={color} />
              // You can return any component that you like here!
              return <MaterialCommunityIcons name={iconName} size={30} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: COLORS.primary,
            inactiveTintColor: COLORS.darjeelingBlue,
          }}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Add" component={AddScreenStack} />
          <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>

    </View>
    
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
