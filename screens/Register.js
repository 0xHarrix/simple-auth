import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import InputTag from '../components/input';
import RegisterButton from '../components/registerbutton';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Register = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "BlackHanSans": require("../assets/BlackHanSans-Regular.ttf")
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const handleSignUp = async () => {
    try {
      // Check if passwords match
      if (password !== retypePassword) {
        console.error("Passwords do not match");
        return;
      }
  
      const response = await fetch('https://backend-code-new.vercel.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data.message);
      } else {
        // If the server returns an error status code, handle it here
        const errorData = await response.json();
        console.error('Registration faileds:', errorData.message);
      }
    } catch (error) {
      // Handle network errors or unexpected exceptions
      console.error('Registration failed:', error.message);
    }
  };
  

  const handleTextChange = (tagfor, text) => {
    if (tagfor === 'EMAIL') {
      setEmail(text);
    } else if (tagfor === 'PASSWORD') {
      setPassword(text);
    } else if (tagfor === 'RETYPE PASSWORD') {
      setRetypePassword(text);
    }
  };

  return (
    <ImageBackground source={require('../assets/Background.png')} style={style.backgroundimage}>
      <View style={style.container}>
        <InputTag tagfor="EMAIL" onTextChange={handleTextChange} />
        <InputTag tagfor="PASSWORD" onTextChange={handleTextChange} />
        <InputTag tagfor="RETYPE PASSWORD" onTextChange={handleTextChange} />
        <View style={style.flex1}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={style.user}>Already have an account?</Text>
          </TouchableOpacity>
        </View>
        <RegisterButton handleSignUp={handleSignUp} />
      </View>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    color: 'white',
    fontFamily: 'BlackHanSans',
    fontSize: 10,
    marginRight: 130,
    marginTop: 15,
    top: -15,
  },
  line1: {
    height: 1,
    left: 100,
    backgroundColor: 'white',
    top: 20,
    width: 111,
  },
  line2: {
    height: 1,
    left: -100,
    backgroundColor: 'white',
    top: 10,
    width: 111,
  },
  loginusing: {
    fontSize: 8,
    fontFamily: "BlackHanSans",
    color: "white",
    top: 15,
    marginLeft: 13.5,
  },
  icon: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  flex: {
    flexDirection: 'row',
    top: 10,
  },
  flex1: {
    marginTop: 15,
  },
  backgroundimage: {
    flex:1,
    resizeMode: 'stretch',
},
});

export default Register;
