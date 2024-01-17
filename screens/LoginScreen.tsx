import { Alert, Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

//FIREBASE
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';


export default function LoginScreen({navigation}: any) {

const [correo, setCorreo] = useState('')
const [contrasenia, setContrasenia] = useState('')

function login(){
  signInWithEmailAndPassword(auth, correo, contrasenia)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigation.navigate('Drawer_Welcome')


    //console.log(user);

    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage)

    if ( errorCode === 'auth/invalid-credential'){
      Alert.alert('Error', 'Las credenciales son incorrectas')
    }else if ( errorCode === 'auth/missing-password'){
      Alert.alert('Error', 'La contrasenia no se ha enviado')
    }else{
      Alert.alert(errorCode, errorMessage)
    }

  });
}

  return (
    <ImageBackground style={styles.container} source={require('../assets/images/ima.jpg')}>
    
      <Text style={{fontSize:30}}>Login</Text>
      <TextInput 
        placeholder='Ingrese correo'
        onChangeText={ (texto)=> setCorreo(texto)}
        keyboardType='email-address'
        autoCapitalize='none'
        style={styles.input}
        placeholderTextColor={'white'}
      />

      <TextInput 
        placeholder='Ingresar contraseña'
        onChangeText={ (texto)=> setContrasenia(texto)}
        style={styles.input}
        placeholderTextColor={'white'}
      
      />

     
      <Button title='Ingresar' onPress={()=> login()}/>

      <Text onPress={()=> navigation.navigate('Registro')} style={{color:'white', fontSize:20}}> 👉 Regístrate aquí 👈</Text>
    
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },

  input:{
    width:'80%',
    borderWidth:1,
    height:45,
    marginBottom:10,
    borderRadius:10,
    backgroundColor:'#5E8AB4',
    paddingHorizontal:20,
    color:'#B8DDE1'
  }
})