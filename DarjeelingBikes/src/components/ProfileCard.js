import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import {AuthContext} from '../screens/context'

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Thumbnail,
  Input,
  ListItem,
  Left,
  Right,
  List,
  Icon
} from "native-base";
import { COLORS, FONTS, SIZES, URL,darjeelingIcon } from "../../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationRouteContext } from "@react-navigation/core";

import {ProfileContext} from '../screens/context'

export default function ProfileCard({ navigation }) {
  const [superAdminState, setSuperAdminState] = React.useState();
  const [superAdminCity, setSuperAdminCity] = React.useState();


    const storeVendorId = async (value) => {
      try {
        await AsyncStorage.setItem("vendorId", value);
        console.log("VendorId Saved",value);
      } catch (e) {
        console.log("can not save VendorId");
      }
    };

  const { profileAvailable } = React.useContext(ProfileContext);
  const { signOut } = React.useContext(AuthContext);

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
          console.log("dd",res.data.id)
          setVendorId(Number(res.data.id))
          storeVendorId((res.data.id).toString())
          profileAvailable()
          setIsLoading(false);
          setName(res.data.name);
          setMobile(res.data.mobile);
          setWattsapp(res.data.whatsapp_number);
          setEmail(res.data.email);
          setImage(res.data.photo);
          setBankName(res.data.bank_name);
          setAccountNo(res.data.bank_account_number);
          setIfsc(res.data.ifsc_code);
          setBranch(res.data.branch);
          setCity(res.data.city);
          setState(res.data.state);
          console.log("profile Available")
        })
        .catch((err) => {
          
          console.log("somthing went wrong");
        });

    }

  async function getCity() {
      await axios
        .get(`${URL}/superadmin/city/`)
        .then((res) => {
          setSuperAdminCity(res.data);
          console.log("city",superAdminCity);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    async function getState() {
      await axios
        .get(`${URL}/superadmin/states/`)
        .then((res) => {
          setSuperAdminState(res.data);
          console.log("state",superAdminState);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCity()
    getState()
    getProfile();
  }, []);

  const [isLoading, setIsLoading] = React.useState(true);

  const [data, setData] = React.useState(null);
  const [isProfile, setIsProfile] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [wattsapp, setWattsapp] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [bankName, setBankName] = React.useState("");
  const [accountNo, setAccountNo] = React.useState("");
  const [ifsc, setIfsc] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const [city, setCity] = React.useState();
  const [state, setState] = React.useState();
  const [vendorId,setVendorId]=React.useState(null)
  

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("url", value);
      console.log("url saved");
    } catch (e) {
      console.log("can not save url");
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("Token");
      console.log(" token removed");
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  const logout = async () => {
    removeValue();
    navigation.navigate("Create Profile")
  };

 


  return (
    <Container>
      {isLoading ? (
        <View style={{ alignItems: "center", marginTop: "30%" }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <Content style={{ padding: 5 }}>
          <Card>
            <CardItem header>
              <Thumbnail
                large
                source={darjeelingIcon}
                style={{
                  padding: 5,
                  borderWidth:2,
                  borderColor: COLORS.black2,
                }}
              />
              <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: "bold",fontSize:20}}>{name}</Text>
              </View>
            </CardItem>
                <List>
            <ListItem>
            <Text style={{ fontWeight: "bold",color:COLORS.black ,fontSize:15}} >Mobile : {mobile}</Text>
            </ListItem>
            <ListItem>
            <Text style={{ fontWeight: "bold",color:COLORS.black ,fontSize:15}} >Wattsapp : {wattsapp}</Text>
            </ListItem>
            <ListItem>
            <Text style={{ fontWeight: "bold",color:COLORS.black ,fontSize:15}} >Emai : {email}</Text>
            </ListItem>
               <ListItem>
            <Text style={{ fontWeight: "bold",color:COLORS.black ,fontSize:15}} >Bank : {bankName}</Text>
            </ListItem>
               <ListItem>
            <Text style={{ fontWeight: "bold",color:COLORS.black ,fontSize:15}} >Account No : {accountNo}</Text>
            </ListItem>
               <ListItem>
            <Text style={{ fontWeight: "bold",color:COLORS.black ,fontSize:15}} >IFSC : {ifsc}</Text>
            </ListItem>
               <ListItem>
            <Text style={{ fontWeight: "bold",color:COLORS.black ,fontSize:15}} >Branch : {branch}</Text>
            </ListItem>
            {/*    <ListItem>
            <Text style={{ fontWeight: "bold",color:COLORS.black ,fontSize:15}} >City : {superAdminCity[{city}]}</Text>
            </ListItem>
                 <ListItem>
            <Text style={{ fontWeight: "bold",color:COLORS.black ,fontSize:15}} >State : {state}</Text>
            </ListItem>
            */} 
         
          </List>
          
          </Card>
        
            

            
                <TouchableOpacity onPress={() => signOut()} style={{backgroundColor:COLORS.red2,
                   width:"100%",padding:15,borderRadius:5,marginTop: 10}}>
                   <Text style={{fontWeight:"bold",color:"#fff",marginLeft:"40%"}}>LogOut</Text>
                   </TouchableOpacity>
        
        </Content>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
