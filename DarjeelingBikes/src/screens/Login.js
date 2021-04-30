import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Input,
  Icon,
  Left,
  Right,
  View,
  Thumbnail
 
} from "native-base";
import { SIZES, URL,COLORS,darjeelingIcon } from "../../constants";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert,TouchableOpacity,ActivityIndicator,ToastAndroid,Image} from "react-native";

// const AuthContext = React.createContext();
import {AuthContext} from './context'


export default function Login({navigation}) {


    const { signIn } = React.useContext(AuthContext);


  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'Login succesfully',
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Login Unsuccessfull!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };


    const [mobile,setMobile]=React.useState(null)
    const [isLoading,setIsLoading]=React.useState(true)
    const [isRequestSend,setIsRequestSend]=React.useState(false)
    
   
    // const login1 = async() => {
   
    //   setIsLoading(true)
    //   setIsRequestSend(true)


    //     const bodyParameters = {
    //       mobile: mobile,
    //     };
    
    //     await axios
    //       .post(`${URL}/auth/login/`, bodyParameters)
    //       .then((res) => {
            
    //         setIsLoading(false)
    //         setIsRequestSend(false)

    //         storeData("Token "+res.data.token)
    //         console.log(res.data.id)
    //         const userId=res.data.id;
    //         storeId(userId.toString())
            
    //         showToastWithGravity()
    //         navigation.goBack()
    //       })
    //       .catch((err) => {
    //        setIsRequestSend(false)
    //         showToastWithGravityAndOffset()
    //       });
    //   };
  return (

    <Container style={{padding:5}} >
      
  <Content>
       <View style={{ flexDirection: "row",marginTop: 20}}>
            <Thumbnail
              square
              large
              source={darjeelingIcon}
              style={{ marginHorizontal: SIZES.width/5, borderWidth: 3,width: 200,height:250 }}
            />
        
          </View>

  {isRequestSend ?(    <View style={{ alignItems: "center", marginTop: SIZES.height/2.5}}>
       
        <ActivityIndicator  size="large" color={COLORS.darjeelingBlue}/>
      
    </View>):(
        <Card style={{marginTop:0,}}> 
                 <CardItem>
                   <Body style={{ marginLeft: SIZES.width / 3 }}>
                     <Icon
                       name="person"
                       style={{ fontSize: 50, color:COLORS.primary }}
                     />
                   </Body>
                 </CardItem>
                 <CardItem style={{marginTop:40}}>
                   <Body >
                     
                     <Input
                       placeholder="Mobile Number"
                       style={{ borderBottomWidth: 1,width:SIZES.width-50,
                         borderRadius:5,borderColor:COLORS.primary,
                         color:COLORS.black ,fontWeight:"bold",}}
                       onChangeText={(text)=>{setMobile(text)}}
       
       
                     />
                   </Body>
       
                 </CardItem>
                 <CardItem style={{padding:20,height:150,marginTop:20}}>
       
                  <Body>
       
                   <TouchableOpacity onPress={() => signIn(mobile)} style={{backgroundColor:COLORS.primary,
                   width:"100%",padding:15,borderRadius:5,marginBottom:10}}>
                   <Text style={{fontWeight:"bold",color:"#fff",marginLeft:"40%"}}>LogIn</Text>
                   </TouchableOpacity>
       
                    <TouchableOpacity  style={{backgroundColor:COLORS.darjeelingBlue,
                   width:"100%",padding:15,borderRadius:5}}>
                   <Text style={{fontWeight:"bold",color:"#fff",marginLeft:"40%"}}>Register</Text>
                   </TouchableOpacity>
                   
                 </Body>
                 
                 </CardItem> 
       
       
       
       
       
               </Card>)

      }
      </Content>

    </Container>
  
  );
}
