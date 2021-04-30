import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  HeaderBackground,
} from "@react-navigation/stack";

import { NavigationContainer } from '@react-navigation/native';

import {URL} from './constants/index'
import TabScreen from "./src/screens/TabScreen";
import Login from "./src/screens/Login";
import HomeStack from "./src/screens/HomeStack";

import AsyncStorage from "@react-native-async-storage/async-storage";

// auth flow 
import axios from 'axios'
import {AuthContext} from './src/screens/context.js'


const Stack=createStackNavigator()

export default function App({navigation}) {


  const [token, setToken] = React.useState(null);
  const [isLogin, setIsLogin] = React.useState(false);
  const [alreadyLogin,setAlreadyLogin]=React.useState(false)
  const [isLoading,setIsLoading]=React.useState(true)
  const [isRequestSend,setIsRequestSend]=React.useState(false)

    const login1 = async(mobileNo) => {
   
      setIsLoading(true)
      setIsRequestSend(true)


        const bodyParameters = {
          mobile: mobileNo,
        };
    
        await axios
          .post(`${URL}/auth/login/`, bodyParameters)
          .then((res) => {
            
            setIsLoading(false)
            setIsRequestSend(false)

            storeData("Token "+res.data.token)
            console.log(res.data.id)
            const userId=res.data.id;
            storeId(userId.toString())
            
            // showToastWithGravity()
            // navigation.goBack()
          })
          .catch((err) => {
           setIsRequestSend(false)
            // showToastWithGravityAndOffset()
          });
      };

   const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            profileAvailable:false
          };
   
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

     React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await  AsyncStorage.getItem("Token");
      } catch (e) {
        // Restoring token failed
        console.log("cant fetch token to device")
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

         const storeData = async (value) => {
      try {
        await AsyncStorage.setItem("Token", value);
        console.log("token saved",value);
      } catch (e) {
        console.log("can not save token");
      }
    };

    const storeId = async (value) => {
      try {
        await AsyncStorage.setItem("id", value);
        console.log("token saved",value);
      } catch (e) {
        console.log("can not save token");
      }
    };

     const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('Token')
      await AsyncStorage.removeItem('id')
      console.log(" token removed ,id Removed")
    } catch(e) {
      // remove error
      console.log('cannot remove token id')
    }
  
    console.log('Done.')
  }


  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
    
    // login1(data)
     setIsLoading(true)
      setIsRequestSend(true)


        const bodyParameters = {
          mobile: data,
        };
    
        await axios
          .post(`${URL}/auth/login/`, bodyParameters)
          .then((res) => {
            
            setIsLoading(false)
            setIsRequestSend(false)

            storeData("Token "+res.data.token)
            console.log(res.data.id)
            const userId=res.data.id;
            storeId(userId.toString())
            const xx=res.data.token
             dispatch({ type: 'SIGN_IN', token: xx })
            // showToastWithGravity()
            // navigation.goBack()
          })
          .catch((err) => {
           setIsRequestSend(false)
            // showToastWithGravityAndOffset()
          });
    // dispatch({ type: 'SIGN_IN', token: token });


         

        // dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () =>{ 
        removeValue()
        dispatch({ type: 'SIGN_OUT' })},
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
  

        dispatch({ type: 'SIGN_IdN', token: 'dummy-auth-token' });
      },
      profileAvailable:()=>{
        dispatch({type:'PROFILE_AVAILABLE'})
      }
    }),
    []
  );


  return (
     <AuthContext.Provider value={authContext}>
     <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
    headerShown: false
  }} 
      >
        {state.userToken == null ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <Stack.Screen name="TabScreen" component={TabScreen} />
        )}
      </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
    )

    
   



    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
