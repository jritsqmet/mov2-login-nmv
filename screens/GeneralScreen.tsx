import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'

import * as ImagePicker from 'expo-image-picker';

//FIREBASE
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../config/Config';


export default function GeneralScreen() {

  const [imagen, setImagen] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1656px-User_icon-cp.svg.png')

  // ABRIR LA CAMARA
  const seleccionarImagen = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  ///SUBIR LA IMAGEN
  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, 'usuarios/' + nombre);

    try {
        const response = await fetch(imagen);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob, {
            contentType: 'image/jpg'
        });

        console.log('La imagen se subió con éxito');
        Alert.alert('Mensaje', 'Imagen subida con exito')

        // Obtiene la URL de la imagen
        const imageURL = await getDownloadURL(storageRef);
        console.log('URL de desacarga de la imagen', imageURL);

    } catch (error) {
        console.error(error);
    }
}


  return (
    <View style={styles.container}>
      <Text>SUBIR IMAGEN DESDE LA CAMARA</Text>
      <Button title='abrir camara' onPress={ ()=> seleccionarImagen()}/>
      <Image source ={{ uri: imagen}} style={styles.img}/>

      <TouchableOpacity style={styles.btn} onPress={()=> subirImagen('avatar2')}>
        <Text style={{fontSize:20}}>SUBIR IMAGEN A FIREBASE</Text>
        <Image source={ require('../assets/images/subir.webp')} style={styles.img2}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  img:{
    width:400,
    height:300,
    resizeMode: 'contain'
  },
  btn:{
    width:'70%',
    height:80,
    backgroundColor:'#C0E8D5',
    borderRadius:50,
    alignItems:'center',
    padding:10
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  img2:{
    width:40,
    height:40
  }
})