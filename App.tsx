import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar, Alert } from 'react-native';
import { Camera, CameraType, CameraCapturedPicture } from "expo-camera"
import * as MediaLibrary from "expo-media-library"
import { useEffect, useRef, useState } from 'react';
import * as Permissions from "expo-permissions"
import * as ExpoFs from "expo-file-system"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraView from './components/CameraView';
import ArquivosView from './components/ArquivosView';

export default function App() {


  const Tab = createBottomTabNavigator();

  // <NavigationContainer>
  //       <Tab.Screen name="Camera" component={CameraView} />
  //       <Tab.Screen name="Arquivos" component={ArquivosView} />

  //     </NavigationContainer>

  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar />
      <ArquivosView />

    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center'
  },
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  obterFoto: {
    backgroundColor: "transparent",
    height: 75,
    width: 75,
    borderRadius: 75 / 2,
    marginBottom: 70,
    borderWidth: 5,
    borderColor: "red"
  },
  voltar: {
    backgroundColor: "blue",
    padding: 5,
    margin: 10,
    borderRadius: 10,
    textAlign: "center",
    borderWidth: 5,
    borderColor: "blue",
    flex: 1
  },
  foto: {
    flex: 1,
    width: null,
    height: null
  },
  fotoPreview: {
    margin: 10,
    flex: 9,
    width: null,
    height: null
  },
  tituloFoto: {
    margin: 15,
    fontSize: 24,
    lineHeight: 34,
    fontWeight: "bold",
    textAlign: "center"
  }

});
