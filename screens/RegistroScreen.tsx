import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

//FIREBASE
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';
import { ref, set } from "firebase/database";
import { db } from '../config/Config';


export default function RegistroScreen({ navigation }: any) {
  const [correo, setcorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')
  const [nick, setnick] = useState('')
  const [edad, setedad] = useState('')

  const [userID, setuserID] = useState('')


  function registro() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;

        navigation.navigate('Drawer_Welcome')

        //console.log('Registro exitoso')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode)
        if (errorCode === 'auth/email-already-in-use') {
          Alert.alert('Error', 'El correo ingresado ya esta en uso')
        }

      });
  }

  function guardar(id: string, nick: string, correo: string, edad: string) {
    set(ref(db, 'jugadores/' + id), {
      nick: nick,
      email: correo,
      edad: edad
    });
  }

  function compuesta() {
    registro();
    guardar(userID, nick, correo, edad)
  }

  return (
    <View>
      <Text>RegistroScreen</Text>
      <TextInput
        placeholder='ingrese email'
        onChangeText={(texto) => setcorreo(texto)}
      />

      <TextInput
        placeholder='ingrese contrasenia'
        onChangeText={(texto) => setContrasenia(texto)}
      />

      <TextInput
        placeholder="Ingrese un nick"
        onChangeText={(texto) => setnick(texto)}
      />
      <TextInput
        placeholder="Edad"
        onChangeText={(texto) => setedad(texto)}
      />

      <Button title='registrarse' onPress={() => compuesta()} />

    </View>
  )
}

const styles = StyleSheet.create({})