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

import AddScreen from './AddScreen'


const Stack = createStackNavigator();

export default function AddScreenStack() {
  return (
    <Stack.Navigator
     screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: COLORS.primary },
      }}

    >
      <Stack.Screen
        name="Add Bike"
        component={AddScreen}
     
      />

    </Stack.Navigator>
  );
}
