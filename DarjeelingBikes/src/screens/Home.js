import React from "react";
import {Image,TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
  Header,
  Title,
  Left,
  Body,
  Item,
  Text,
  ListItem,
  Thumbnail,
  Button,
  Icon,
  Right,
  Input,
  Badge,
  View,
  Card,
  CardItem,
 
} from "native-base";
import { COLORS, SIZES ,darjeelingIcon} from "../../constants";
import MyBikesScreen from './MyBikesScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Home = ({navigation}) => {
  


  return (
    <Container >
     
      <Content>
      <View style={{ flexDirection: "row",marginTop: 20}}>
            <Thumbnail
              square
              large
              source={darjeelingIcon}
              style={{ marginHorizontal: SIZES.width/5, borderWidth: 3,width: 200,height:250 }}
            />
        
          </View>
         
        <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:"10%"}}>
          <TouchableOpacity onPress={()=>navigation.navigate("MyBikes")}>
        <Card style={{width:SIZES.width/2.5,height:SIZES.width/2.5,backgroundColor: COLORS.primary}}>
            <CardItem header>
              <Text style={{fontWeight:'bold',color:COLORS.black2}}>My BIKES</Text>
            </CardItem>
            <Body>
              <MaterialCommunityIcons name='face' size={50} color={COLORS.white} />
            </Body>
         
         </Card>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>navigation.navigate("ReadyBikes")}>
         <Card style={{width:SIZES.width/2.5,height:SIZES.width/2.5,backgroundColor: COLORS.primary}}>
            <CardItem header>
              <Text style={{fontWeight:'bold',color:COLORS.black2}}>Ready BIKES</Text>
            </CardItem>
            <Body>
              <MaterialCommunityIcons name='bicycle' size={50} color={COLORS.white} />
            </Body>
         </Card>
         </TouchableOpacity>
         
        </View>
        {/*
        <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:"10%"}}>
          <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
        <Card style={{width:SIZES.width/2.5,height:SIZES.width/2.5,backgroundColor: COLORS.primary}}>
            <CardItem header>
              <Text style={{fontWeight:'bold',color:COLORS.black2}}>Log In</Text>
            </CardItem>
            <Body>
              <Icon  name="person" style={{color:COLORS.white,fontSize:50}}/>
            </Body>
         
         </Card>
         </TouchableOpacity>
         
        </View>
        */}
        
      </Content>
    </Container>
  );
};

export default Home;
