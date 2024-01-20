import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import InputTag from '../components/input';
import LoginButton from '../components/loginbutton';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Login = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "BlackHanSans": require("../assets/BlackHanSans-Regular.ttf")
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleSignIn = async () => {
    try {
      const response = await fetch('https://backend-code-new.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful');
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const handleTextChange = (tagfor, text) => {
    if (tagfor === 'EMAIL') {
      setEmail(text);
    } else if (tagfor === 'PASSWORD') {
      setPassword(text);
    }
  };

  return (
    <ImageBackground source={require('../assets/Background.png')} style={style.backgroundimage}>
      <View style={style.container}>
        <InputTag tagfor="EMAIL" onTextChange={handleTextChange} />
        <InputTag tagfor="PASSWORD" onTextChange={handleTextChange} />
        <View style={style.flex1}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={style.user}>New User?</Text>
          </TouchableOpacity>
        </View>
        <LoginButton handleSignIn={handleSignIn} />
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
    color: "white",
    fontFamily:'BlackHanSans',
    fontSize: 10,
    marginLeft: 200,
    top:-15,
  },
  user: {
    color: "white",
    marginRight:210,
    fontFamily:'BlackHanSans',
    fontSize: 10,
    top: -10,
    marginBottom:10,
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
    fontSize:8,
    fontFamily: "BlackHanSans",
    color: "white",
    top:15,
    marginLeft:21,
  },
  icon: {
    marginTop: 20,
    marginRight: 10,
    marginLeft:10,
  },
  flex: {
    flexDirection: 'row',
    top:10,
  },
  flex1:{
    marginTop:15,
  },
  backgroundimage: {
      flex:1,
      resizeMode: 'stretch',
  },

});
export default Login;