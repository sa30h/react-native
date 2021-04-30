import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import * as Permissions from "expo-permissions";
import ProfileCard from "../components/ProfileCard";

// Immediately reload the React Native Bundle

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
} from "native-base";
import { COLORS, FONTS, SIZES, URL } from "../../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext,ProfileContext} from './context'


export default function Profile() {
    const { signOut } = React.useContext(AuthContext);
    const { profileAvailable } = React.useContext(ProfileContext);

  React.useEffect(() => {

    async function getCity() {
      await axios
        .get(`${URL}/superadmin/city/`)
        .then((res) => {
          setCity(res.data);
          console.log(city);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    async function getState() {
      await axios
        .get(`${URL}/superadmin/states/`)
        .then((res) => {
          setState(res.data);
          console.log(state);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function getProfile() {
      const token = await AsyncStorage.getItem("Token");

      await axios
        .get(`${URL}/vendor/profile`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          profileAvailable()
          console.log("profile")
        })
        .catch((err) => {
         
          console.log("CAnt get User Profile");
        });


     
    }

  
   
 

    getState();
    getCity();
    getProfile();
  }, [0]);


  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [4, 3],
        // quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  };

  const ProfileUploadHandler = async () => {
    const token = await AsyncStorage.getItem("Token");
    const id = await AsyncStorage.getItem("id");

    let photo = {
      uri: image,
      name: "profile3.jpg",
      type: "image/jpg",
    };

    let newData = new FormData();

    newData.append("name", name);
    newData.append("mobile", mobile);
    newData.append("whatsapp_number", wattsapp);
    newData.append("email", email);
    newData.append("photo", photo);
    newData.append("bank_name", bankName);
    newData.append("bank_account_number", accountNo);
    newData.append("ifsc_code", ifsc);
    newData.append("branch", branch);
    newData.append("city", Number(selectCity));
    newData.append("state", Number(selectState));
    newData.append("user", Number(id));

    console.log(newData);

    let response = await fetch('http://darjeeling.herokuapp.com/vendor/create/', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },

      body: newData,
    });

    console.log(response.data);
  };

  // this.props.navigation.navigate('Products')

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
  const [city, setCity] = React.useState([]);
  const [state, setState] = React.useState([]);
  const [selectCity, setSelectCity] = React.useState(null);
  const [selectState, setSelectState] = React.useState(null);

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
  };

  return (
    <Container>
      <Content style={{ padding: 5 }}>
        <Card>
          <CardItem header>
            <TouchableOpacity onPress={() => pickImage()}>
              <Thumbnail
                large
                source={{
                  uri: image
                    ? image
                    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
                }}
                style={{
                  padding: 5,
                  borderWidth: 3,
                  borderColor: COLORS.black2,
                }}
              />
            </TouchableOpacity>
            <View style={{ padding: 10 }}>
              <Input
                placeholder="Vendor Name"
                style={{ fontWeight: "bold" }}
                onChangeText={(text) => {
                  setName(text);
                }}
              />
            </View>
          </CardItem>
          <CardItem>
            <Body>
              <Input
                placeholder="Mobile No"
                style={{ fontWeight: "bold" }}
                onChangeText={(text) => {
                  setMobile(text);
                }}
              />
              <Input
                placeholder="Wattsapp No"
                style={{ fontWeight: "bold" }}
                onChangeText={(text) => {
                  setWattsapp(text);
                }}
              />
              <Input
                placeholder="Email"
                style={{ fontWeight: "bold" }}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
              <Input
                placeholder="Bank Name"
                style={{ fontWeight: "bold" }}
                onChangeText={(text) => {
                  setBankName(text);
                }}
              />
              <Input
                placeholder="Account No"
                style={{ fontWeight: "bold" }}
                onChangeText={(text) => {
                  setAccountNo(text);
                }}
              />
              <Input
                placeholder="IFSC No"
                style={{ fontWeight: "bold" }}
                onChangeText={(text) => {
                  setIfsc(text);
                }}
              />
              <Input
                placeholder="Branch"
                style={{ fontWeight: "bold" }}
                onChangeText={(text) => {
                  setBranch(text);
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 5,
                  borderColor: "#009090",
                }}
              >
                <Input
                  placeholder="City"
                  style={{ fontWeight: "bold" }}
                  disabled
                />

                <View
                  style={{
                    flexDirection: "row",
                    width: 200,
                    borderTopRightRadius: SIZES.radius,
                  }}
                >
                  <ScrollView horizontal>
                    {city.map((item) => {
                      return (
                        <TouchableOpacity
                          style={{
                            paddingHorizontal: 5,
                            paddingVertical: 15,
                            marginHorizontal: 4,
                            borderWidth: 1,
                            borderRadius: SIZES.radius,
                            marginVertical: 5,
                            marginHorizontal: 5,
                            borderColor: "dodgerblue",
                          }}
                          key={item.id}
                          onPress={() => setSelectCity(Number(item.id))}
                        >
                          <Text style={{ fontWeight: "bold" }}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 5,
                  borderColor: "#009090",
                }}
              >
                <Input
                  placeholder="State"
                  style={{ fontWeight: "bold" }}
                  disabled
                />

                <View
                  style={{
                    flexDirection: "row",
                    width: 200,
                    borderTopRightRadius: SIZES.radius,
                  }}
                >
                  <ScrollView horizontal>
                    {state.map((item) => {
                      return (
                        <TouchableOpacity
                          style={{
                            paddingHorizontal: 5,
                            paddingVertical: 15,
                            marginHorizontal: 4,
                            borderWidth: 1,
                            borderRadius: SIZES.radius,
                            marginVertical: 5,
                            marginHorizontal: 5,
                            borderColor: "dodgerblue",
                          }}
                          key={item.id}
                          onPress={() => setSelectState(Number(item.id))}
                        >
                          <Text style={{ fontWeight: "bold" }}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            </Body>
          </CardItem>
          <CardItem
            footer
            style={{ padding: 5, justifyContent: "space-around" }}
          >
            <TouchableOpacity onPress={() => signOut()}>
              <Text style={{ fontWeight: "bold" }}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => ProfileUploadHandler()}>
              <Text style={{ fontWeight: "bold" }}>Create Profile</Text>
            </TouchableOpacity>
          </CardItem>
        </Card>
      </Content>
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
