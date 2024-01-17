import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

//FIREBASE
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/Config';
import { ref, onValue } from "firebase/database";
import { db } from '../config/Config';


export default function WelcomeScreen() {

  const [id, setid] = useState('')
  const [usuario, setusuario] = useState({})

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log("Este es el UID: ", uid);
      setid(uid)

    } else {
      // User is signed out
      // ...
    }
  });

  useEffect(() => {
    function leer (){
      const starCountRef = ref(db, 'jugadores/' + id );
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        setusuario(data)
        console.log(usuario)
      });
    }
    leer()

  }, [])
  return (
    <View>
      <Text>WelcomeScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})