import { StatusBar } from "expo-status-bar";
import React from "react";
import axios from "axios";
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  Input,
  View,
  Badge,
  Button,
} from "native-base";
import { COLORS, SIZES, URL } from "../../constants";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function EditBikeScreen({ route, navigation }) {
  const link = route.params.link;

  const [company, setCompany] = React.useState([]);
  const [modals, setModals] = React.useState([]);
  const [rudBike, setRudBike] = React.useState([]);
  const [superAdminCity,setSuperAdminCity]=React.useState([])

  React.useEffect(() => {
    console.log(link)
    async function getCompany() {

      await axios
        .get(`${URL}/superadmin/bikecompany/`)
        .then((res) => {
          setCompany(res.data);
          console.log(company);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function getModel() {
      await axios
        .get(`${URL}/superadmin/bikemodels/`)
        .then((res) => {
          setModals(res.data);
          console.log(modals);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    async function rudBikeDetais() {
      await axios
        .get(`${link}`)
        .then((res) => {
          console.log(res.data);
          setABS(res.data.ABS);
          setCompanyName(res.data.bike_company);
          setBikeModel(res.data.bike_model_name);
          setRegistrationNo(res.data.bike_registraton_number);
          setColor(res.data.color);
          setDateOfRegistration(res.data.date_of_registration);
          setEngineCC(res.data.engine_cc);
          setInsuranceValidity(res.data.insurance_validity);
          setInsuranceDoc(res.data.insurance_validity_document);
          setLuggageCarrier(res.data.luggage_carrier);

          setMobileHolder(res.data.mobiler_holder_and_charger);
          setPollutionVlidity(res.data.pollution_validity);
          setPollutionDoc(res.data.pollution_validity_document);
          setRegistrationValidity(res.data.registration_validity);
          setRegistrationDoc(res.data.registration_validity_document);
          setRentPerDay(res.data.rent_per_day);
          setRentForGroup(res.data.rent_per_day_for_group);
          setRentForMoreDays(res.data.rent_per_day_for_more_than_6_days);
          setRoadTaxDoc(res.data.road_tax_document);
          setRoadTaxValidity(res.data.road_tax_validity);
          setTubeless(res.data.tubeless_tyre);
          setYearOfRegistration(res.data.year_of_registration);
        })
        .catch((err) => console.log("something went wrong"));
    }

         async function getCity() {
      await axios
        .get(`${URL}/superadmin/city/`)
        .then((res) => {
          setSuperAdminCity(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCity()

    rudBikeDetais();
    getCompany();
    getModel();
  }, []);



  const [registrationNo, setRegistrationNo] = React.useState("");
  const [yearOfRegistration, setYearOfRegistration] = React.useState("");
  const [EngineCC, setEngineCC] = React.useState("");
  const [dateOfRegistraion, setDateOfRegistration] = React.useState("");

  const [ABS, setABS] = React.useState(null);
  const [tubeless, setTubeless] = React.useState(null);
  const [luggageCarrier, setLuggageCarrier] = React.useState(null);
  const [mobileHolder, setMobileHolder] = React.useState(null);

  const [color, setColor] = React.useState("");
  const [roadTaxValidity, setRoadTaxValidity] = React.useState("");
  const [pollutionValidity, setPollutionVlidity] = React.useState("");
  const [InsuranceVali, setInsuranceValidity] = React.useState("");
  const [registrationValidity, setRegistrationValidity] = React.useState("");

  const [rentPerDay, setRentPerDay] = React.useState(0);
  const [rentForMoreDays, setRentForMoreDays] = React.useState(0);
  const [rentForGroup, setRentForGroup] = React.useState(0);

  const [roadTaxDoc, setRoadTaxDoc] = React.useState(null);
  const [pollutionDoc, setPollutionDoc] = React.useState(null);
  const [insuranceDoc, setInsuranceDoc] = React.useState(null);
  const [registrationDoc, setRegistrationDoc] = React.useState(null);

  const [companyName, setCompanyName] = React.useState(null);
  const [bikeModel, setBikeModel] = React.useState(null);
  const [city,setCity]=React.useState(null)



   const InsuranceDocHandler = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [4, 3],
        // quality: 1,


      });
      if (!result.cancelled) {
        
        setInsuranceDoc(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  };

    const PolDocHandler = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [4, 3],
        // quality: 1,
      });
      if (!result.cancelled) {
        setPollutionDoc(result.uri) ;
      }
    } catch (E) {
      console.log(E);
    }
  };

  const roadTaxDocHandler = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [4, 3],
        // quality: 1,
      });
      if (!result.cancelled) {
        setRoadTaxDoc(result.uri) ;
      }
    } catch (E) {
      console.log(E);
    }
  };

  const registrationDocHandler = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [4, 3],
        // quality: 1,
      });
      if (!result.cancelled) {
        setRegistrationDoc(result.uri) ;
      }
    } catch (E) {
      console.log(E);
    }
  };



const BikeEditHandler = async () => {


    const token = await AsyncStorage.getItem("Token");

    const id = await AsyncStorage.getItem("id");
    const vendorId = await AsyncStorage.getItem("vendorId");


    let insurancePhoto = {
      uri: insuranceDoc,
      name: "insuranceDoc.jpg",
      type: "image/jpg",
    };

    let roadPhoto = {
      uri: roadTaxDoc,
      name: "roadPhoto.jpg",
      type: "image/jpg",
    };

    let registrationPhoto = {
      uri: registrationDoc,
      name: "registrationDoc.jpg",
      type: "image/jpg",
    };
    let 
    pollutionPhoto = {
      uri: pollutionDoc,
      name: "pollutionDoc.jpg",
      type: "image/jpg",
    };


    let bodyFormData = new FormData();

    bodyFormData.append("bike_registraton_number", registrationNo);
    bodyFormData.append("year_of_registration", yearOfRegistration);

    var datestring =`${yearOfRegistration}-${dateOfRegistraion}`
    
    bodyFormData.append("date_of_registration", "1000-02-22");
    bodyFormData.append("engine_cc", EngineCC);
    bodyFormData.append("ABS", ABS);
    bodyFormData.append("tubeless_tyre", tubeless);
    bodyFormData.append("luggage_carrier", luggageCarrier);
    bodyFormData.append("mobiler_holder_and_charger", mobileHolder);
    bodyFormData.append("color", color);

    bodyFormData.append("road_tax_validity", roadTaxValidity);
    bodyFormData.append("road_tax_document", roadPhoto);
    bodyFormData.append("pollution_validity", pollutionValidity);
    bodyFormData.append("pollution_validity_document", pollutionPhoto);
    bodyFormData.append("insurance_validity", InsuranceVali);
    bodyFormData.append("insurance_validity_document", insurancePhoto);
    bodyFormData.append("registration_validity", registrationValidity);
    bodyFormData.append("registration_validity_document", registrationPhoto);

    bodyFormData.append("rent_per_day", rentPerDay);
    bodyFormData.append("rent_per_day_for_more_than_6_days", rentForMoreDays);
    bodyFormData.append("rent_per_day_for_group", rentForGroup);

    // bodyFormData.append("approved", true);
    // bodyFormData.append("ready", true);
    // bodyFormData.append("already_booked", false);

    bodyFormData.append("place_where_want_to_enlist_bike",Number(city))

    bodyFormData.append("bike_company", companyName);
    bodyFormData.append("bike_model_name", bikeModel);
    bodyFormData.append("vendor",Number(vendorId))

    console.log("edit details",bodyFormData);
    console.log("link",link)

    await fetch(`${link}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
        "Authorization":token
       
      },

      body: bodyFormData,
    }).then(res=>{console.log(res)
      Alert.alert("Bike Edited ")
    }).then(data=>{console.log(data)
      Alert.alert("Something went wrong")

    })

    
  };

  async function DelBike() {
    const token = await AsyncStorage.getItem("Token");

    await axios
      .delete(`${link}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        Alert.alert("Bike deleted");
      })
      .catch((err) =>
        Alert.alert("Something went wrong during Deleteing Bike")
      );
  }

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      return data;
    } else {
      Alert.alert("you need to give up permission");
    }
  };

  return (
    <Container>
      <Content style={{ padding: 5 }}>
        <Card style={{ padding: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Thumbnail
              square
              large
              source={{
                uri:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
              }}
              style={{ padding: 0, borderWidth: 3 }}
            />
            <TouchableOpacity>
              <Badge
                primary
                style={{
                  marginTop: 20,
                  marginLeft: -20,
                  borderWidth: 1,
                  backgroundColor: "#fff",
                }}
              >
                <Icon
                  name="add"
                  style={{ fontSize: 13, color: COLORS.black2, lineHeight: 20 }}
                />
              </Badge>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",

              marginTop: 5,
            }}
          >
            <Input
              placeholder="Registration No"
              style={{ fontWeight: "bold" }}
              onChangeText={(text) => setRegistrationNo(text)}
            />
            <View style={{  paddingVertical: 15,padding:5 }}>
              <Text style={{fontWeight:"bold"}}>{registrationNo}</Text>
            </View>

            <Icon
              name="add"
              style={{
                color: COLORS.primary,
                fontSize: 30,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",

              marginTop: 5,
            }}
          >
            <Input
              placeholder="Year of Registration"
              style={{ fontWeight: "bold" }}
              onChangeText={(text) => setYearOfRegistration(text)}
            />
             <View style={{  paddingVertical: 15,padding:5 }}>
              <Text style={{fontWeight:"bold"}}>{yearOfRegistration}</Text>
            </View>

            <Icon
              name="add"
              style={{
                color: COLORS.primary,
                fontSize: 30,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
              padding: 0,
            }}
          >
            <Input
              placeholder="Date of Registration"
              style={{ fontWeight: "bold" }}
              disabled
            />
             <View style={{  paddingVertical: 15,padding:5 }}>
              <Text style={{fontWeight:"bold"}}>{dateOfRegistraion}</Text>
            </View>
            <TouchableOpacity >
              <Icon
                name="add"
                style={{
                  color: COLORS.primary,
                  fontSize: 30,
                  fontWeight: "bold",
                  marginVertical: 10,
                }}
              />
         
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <Input placeholder="Engine cc" style={{ fontWeight: "bold" }} />
            <View style={{  paddingVertical: 15,padding:5 }}>
              <Text style={{fontWeight:"bold"}}>{EngineCC}</Text>
            </View>

            <Icon
              name="add"
              style={{
                color: COLORS.primary,
                fontSize: 30,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              justifyContent: "space-between",
              padding: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>ABS</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>YES</Text>

              <RadioButton
                value="yes"
                status={ABS === "yes" ? "checked" : "unchecked"}
                onPress={() => setABS("yes")}
              />
              <Text style={{ fontWeight: "bold" }}>NO</Text>
              <RadioButton
                value="no"
                status={ABS === "no" ? "checked" : "unchecked"}
                onPress={() => setABS("no")}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              justifyContent: "space-between",
              padding: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Tubeless</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>YES</Text>

              <RadioButton
                value="yes"
                status={tubeless === "yes" ? "checked" : "unchecked"}
                onPress={() => setTubeless("true")}
              />
              <Text style={{ fontWeight: "bold" }}>NO</Text>
              <RadioButton
                value="no"
                status={tubeless === "no" ? "checked" : "unchecked"}
                onPress={() => setTubeless("false")}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              justifyContent: "space-between",
              padding: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Luggage Carrier</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>YES</Text>

              <RadioButton
                value="yes"
                status={luggageCarrier === "yes" ? "checked" : "unchecked"}
                onPress={() => setLuggageCarrier("yes")}
              />
              <Text style={{ fontWeight: "bold" }}>NO</Text>
              <RadioButton
                value="no"
                status={luggageCarrier === "no" ? "checked" : "unchecked"}
                onPress={() => setLuggageCarrier("no")}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              justifyContent: "space-between",
              padding: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Mobile Holder</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>YES</Text>

              <RadioButton
                value="yes"
                status={mobileHolder === "yes" ? "checked" : "unchecked"}
                onPress={() => setMobileHolder("true")}
              />
              <Text style={{ fontWeight: "bold" }}>NO</Text>
              <RadioButton
                value="no"
                status={mobileHolder === "no" ? "checked" : "unchecked"}
                onPress={() => setMobileHolder("no")}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <Input
              placeholder="Color"
              style={{ fontWeight: "bold" }}
              onChangeText={(text) => setColor(text)}
            />
             <View style={{  paddingVertical: 15,padding:5 }}>
              <Text style={{fontWeight:"bold"}}>{color}</Text>
            </View>

            <Icon
              name="add"
              style={{
                color: COLORS.primary,
                fontSize: 30,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <Input
              placeholder="Tax-Validity"
              style={{ fontWeight: "bold" }}
              onChangeText={(text) => setRoadTaxValidity(text)}
            />

<View style={{  paddingVertical: 15,padding:5 }}>
              <Text style={{fontWeight:"bold"}}>{roadTaxValidity}</Text>
            </View>

            <Icon
              name="add"
              style={{
                color: COLORS.primary,
                fontSize: 30,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <Input
              placeholder="Tax Document"
              style={{ fontWeight: "bold" }}
              disabled
            />
            <TouchableOpacity
              onPress={() => {
                roadTaxDocHandler();
              }}
            >
              <Icon
                name="cloud-circle"
                style={{
                  color: COLORS.primary,
                  fontSize: 30,
                  fontWeight: "bold",
                  marginVertical: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <Input
              placeholder="Pollution validity"
              style={{ fontWeight: "bold" }}
              onChangeText={(text) => setPollutionVlidity(text)}
            />
             <View style={{  paddingVertical: 15,padding:5 }}>
              <Text style={{fontWeight:"bold"}}>{pollutionValidity}</Text>
            </View>

            <Icon
              name="add"
              style={{
                color: COLORS.primary,
                fontSize: 30,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <Input
              placeholder="Pollution document"
              style={{ fontWeight: "bold" }}
              disabled
            />

            <TouchableOpacity
              onPress={() => {
                PolDocHandler()
              }}
            >
              <Icon
                name="cloud-circle"
                style={{
                  color: COLORS.primary,
                  fontSize: 30,
                  fontWeight: "bold",
                  marginVertical: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <Input
              placeholder="Insurance Validity"
              style={{ fontWeight: "bold" }}
              onChangeText={(text) => setInsuranceValidity(text)}
            />

<View style={{  paddingVertical: 15,padding:5 }}>
              <Text style={{fontWeight:"bold"}}>{InsuranceVali}</Text>
            </View>


            <Icon
              name="add"
              style={{
                color: COLORS.primary,
                fontSize: 30,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <Input
              placeholder="Insurance document"
              style={{ fontWeight: "bold" }}
              disabled
            />

            <TouchableOpacity
              onPress={() => {
                InsuranceDocHandler()
              }}
            >
              <Icon
                name="cloud-circle"
                style={{
                  color: COLORS.primary,
                  fontSize: 30,
                  fontWeight: "bold",
                  marginVertical: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <Input
              placeholder="Registration Validity"
              style={{ fontWeight: "bold" }}
              onChangeText={(text) => setRegistrationValidity(text)}
            />
             <View style={{  paddingVertical: 15,padding:5 }}>
              <Text style={{fontWeight:"bold"}}>{registrationValidity}</Text>
            </View>

            <Icon
              name="add"
              style={{
                color: COLORS.primary,
                fontSize: 30,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <Input
              placeholder="Registration document"
              style={{ fontWeight: "bold" }}
              disabled
            />

            <TouchableOpacity
              onPress={() => {
                registrationDocHandler()
              }}
            >
              <Icon
                name="cloud-circle"
                style={{
                  color: COLORS.primary,
                  fontSize: 30,
                  fontWeight: "bold",
                  marginVertical: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <Input
              placeholder="Rent per day"
              style={{ fontWeight: "bold" }}
              keyboardType={"numeric"}
              onChangeText={(text) => setRentPerDay(Number(text))}
            />
             <View style={{  paddingVertical: 15,padding:5 }}>
              <Text style={{fontWeight:"bold"}}>{rentPerDay}</Text>
            </View>

            <Icon
              name="add"
              style={{
                color: COLORS.primary,
                fontSize: 30,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <Input
              placeholder="Rent per day for more than 6 days"
              style={{ fontWeight: "bold" }}
              keyboardType={"numeric"}
              onChangeText={(text) => setRentForMoreDays(Number(text))}
            />
             <View style={{  paddingVertical: 15,padding:5 }}>
              <Text style={{fontWeight:"bold"}}>{rentForMoreDays}</Text>
            </View>

            <Icon
              name="add"
              style={{
                color: COLORS.primary,
                fontSize: 30,
                fontWeight: "bold",
                marginVertical: 10,

              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <Input
              placeholder="Rent per day for group"
              style={{ fontWeight: "bold" }}
              keyboardType={"numeric"}
              onChangeText={(text) => setRentForGroup(Number(text))}
            />
             <View style={{  paddingVertical: 15,padding:5 }}>
              <Text style={{fontWeight:"bold"}}>{rentForGroup}</Text>
            </View>

            <Icon
              name="add"
              style={{
                color: COLORS.primary,
                fontSize: 30,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              borderColor: "#009090",
            }}
          >
            <Input
              placeholder="Bike Company"
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
                {company.map((item) => {
                  return (
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 5,
                        paddingVertical: 15,
                        marginHorizontal: 4,
                        
                        borderRadius: SIZES.radius,
                        marginVertical: 5,
                        marginHorizontal: 5,
                        backgroundColor: COLORS.primary
                      }}
                      key={item.id}
                      onPress={() => setCompanyName(Number(item.id))}
                    >
                      <Text style={{ fontWeight: "bold" ,color:COLORS.white}}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderColor: "#009090",
              marginVertical: 5,
            }}
          >
            <Input
              placeholder="Bike Model"
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
                {modals.map((item) => {
                  return (
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 5,
                        paddingVertical: 15,
                        marginHorizontal: 4,
    
                        borderRadius: SIZES.radius,
                        marginVertical: 5,
                        marginHorizontal: 5,
                       backgroundColor: COLORS.primary
                      }}
                      key={item.id}
                      onPress={() => setBikeModel(Number(item.id))}
                    >
                      <Text style={{ fontWeight: "bold" ,color:COLORS.white}}>{item.name}</Text>
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
                {superAdminCity.map((item) => {
                  return (
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 5,
                        paddingVertical: 15,
                        marginHorizontal: 4,
                       
                        borderRadius: SIZES.radius,
                        marginVertical: 5,
                        marginHorizontal: 5,
                        
                        backgroundColor: COLORS.primary
                      }}
                      key={item.id}
                      onPress={() => setCity(Number(item.id))}
                    >
                      <Text style={{ fontWeight: "bold",color:COLORS.white }}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Card>
          <TouchableOpacity onPress={() => BikeEditHandler()} style={{backgroundColor:COLORS.primary,
                   width:"100%",padding:15,borderRadius:5,marginBottom:10,marginTop:10}}>
                   <Text style={{fontWeight:"bold",color:"#fff",marginLeft:"40%"}}>Edit</Text>
                   </TouchableOpacity>
         <TouchableOpacity onPress={() => DelBike()} style={{backgroundColor:COLORS.red2,
                   width:"100%",padding:15,borderRadius:5,marginBottom:20}}>
                   <Text style={{fontWeight:"bold",color:"#fff",marginLeft:"40%"}}>Delete</Text>
                   </TouchableOpacity>
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
