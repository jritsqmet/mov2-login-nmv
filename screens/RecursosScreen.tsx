import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

//IMAGE
import * as ImagePicker from 'expo-image-picker';

//FIREBASE
import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../config/Config';


export default function RecursosScreen() {

  const [imagen, setImagen] = useState(' ')

  //CARGAR IMAGEN
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
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

  ///SUBIR IMAGEN
  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, 'usuarios/' + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpg'
      });

      console.log('La imagen se subió con éxito');

      // Obtiene la URL de la imagen
      //const imageURL = await getDownloadURL(storageRef);
      //console.log('URL de desacarga de la imagen', imageURL);
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <View>
      <Text>SUBIR UNA IMAGEN DESDE LA GALERIA</Text>
      <Button title='Abrir galeria' onPress={() => pickImage()} />
      <Image source={{ uri: imagen }} style={styles.img} />
      <Button title='subir imagen' onPress={ () => subirImagen('avatar1')} />
    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 400,
    height: 300,
    resizeMode: 'contain'
  }
})