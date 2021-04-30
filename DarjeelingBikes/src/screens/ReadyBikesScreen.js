import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator
} from "react-native";
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
  Button,
} from "native-base";
import { COLORS, FONTS, SIZES ,URL} from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { Colors } from "react-native-paper";

export default function ReadyBikesScreen({ navigation }) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function readyBikes() {

           const token = await AsyncStorage.getItem("Token");

      // const config = {
      //   headers: { Authorization: `${token}` },
      // };


        await axios
        .get(`${URL}/vendor/my-ready-bikes/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setReadyBikes(res.data);
          setLoading(false);
          
        })
        .catch((err) => console.log("something went wrong/Not recieved ready Bikes"));
    }
    readyBikes();
  }, [0]);

  const [readyBikes, setReadyBikes] = React.useState([]);

  return (
    <>
      {loading ? (
           <View style={{ alignItems: "center", marginTop: SIZES.height/2.5}}>
       
        <ActivityIndicator  size="large" color={COLORS.darjeelingBlue}/>
      
    </View>
      ) : (
        <View style={{ flex: 1, paddingHorizontal: 5 }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            
          
            data={readyBikes}
            renderItem={({ item }) => {
              return (
                      <TouchableOpacity
                      
                          onPress={() =>
                            navigation.navigate("EditScreen", {
                              link: item.rud,

                              
                            })
                          }

                        >               
                   <Card  >
                  <CardItem style={{justifyContent:  'space-around' }}>
                    <Left>
                     
                      <Body>
                        <Text
                          style={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.bike_company.name}
                        </Text>
                        <Text
                          note
                          style={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.bike_model_name.name}
                        </Text>
                      </Body>
                    </Left>
                         <Body>
                        <Text
                          style={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          Reg.No
                        </Text>
                        <Text
                          note
                          style={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.bike_registraton_number}
                        </Text>
                   
                    </Body>
                    <Right>
                      <Text
                        style={{
                          fontWeight: "bold",
                          textTransform: "capitalize",
                        }}
                      >
                        Vendor
                      </Text>
                           <Text
                          note
                          style={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            marginRight: 20   
                          }}
                        >
                          {item.vendor}
                        </Text>

                    </Right>


                  </CardItem>
                  <CardItem>
                    <Left>
                     
                      <Body>
                        <Text
                          style={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          Engine CC
                        </Text>
                        <Text
                          note
                          style={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                         {item.engine_cc}
                        </Text>
                      </Body>
                    </Left>
                         <Body>
                        <Text
                          style={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                         Date of Registraion
                        </Text>
                        <Text
                          note
                          style={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                        {item.date_of_registration}
                        </Text>
                   
                    </Body>
                    <Right>
                      <Text
                        style={{
                          fontWeight: "bold",
                          textTransform: "capitalize",
                          marginLeft: 30
                        }}
                      >
                         Already Booked
                      </Text>
                           <Text
                          note
                          style={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            marginRight: 10
                              
                          }}
                        >
                          {item.already_booked ? (
                          <Text note>Yes</Text>
                        ) : (
                          <Text note>No</Text>
                        )}
                        </Text>

                    </Right>
                    

                  </CardItem>
             
                
          
                </Card>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </>
  );
}
