import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

//FIREBASE
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../config/Config';
import { ref, onValue } from "firebase/database";
import { db } from '../config/Config';



export default function WelcomeScreen({ navigation }: any) {

  const [id, setid] = useState('')
  const [usuario, setusuario] = useState({})


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("Este es el UID: ", uid);
        setid(uid);
  
        const starCountRef = ref(db, 'jugadores/' + uid);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          setusuario(data);
          console.log("Datos del usuario:", data);
        });
      } else {
        // User is signed out
        console.log("Usuario desconectado");
      }
    });
  
    return () => {
      // Desuscribe la función cuando el componente se desmonta
      unsubscribe();
    };
  }, []); 
  /*
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
    */


  function logout() {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigation.goBack();
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <View>
      <Text>WelcomeScreen</Text>
      <Text>{usuario.nick}</Text>
      <Text>{usuario.email}</Text>
      <Text>{usuario.edad}</Text>
      <Button title='Logout' onPress={() => logout()} />
    </View>
  )
}

const styles = StyleSheet.create({})