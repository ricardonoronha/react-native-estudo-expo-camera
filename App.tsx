import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar, Alert } from 'react-native';
import { Camera, CameraType, CameraCapturedPicture } from "expo-camera"
import * as MediaLibrary from "expo-media-library"
import { useEffect, useRef, useState } from 'react';
import * as Permissions from "expo-permissions"

export default function App() {


  const [tipoCamera, setTipoCamera] = useState<CameraType>(CameraType.back);
  const [temPermissao, setTemPermissao] = useState<boolean | null>(null);
  const [foto, setFoto] = useState<CameraCapturedPicture | null>(null)
  const cameraRef = useRef<Camera>(null);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log("status", status);
      setTemPermissao(status === "granted");
    })();

    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      console.log("status", status);
      setTemPermissao(status === "granted");
    })();

  }, [temPermissao])

  if (temPermissao === null) {
    return <View style={estilos.container}>
      <Text>Permissão não definida</Text>
    </View>
  }

  if (temPermissao === false) {
    return <View style={estilos.container}>
      <Text>Você não tem permissão!</Text>
    </View>
  }

  async function obterFoto() {
    if (cameraRef) {
      const foto = await cameraRef.current?.takePictureAsync();
      if (foto) {
        setFoto(foto);
      }
    }
  }

  async function salvarFoto() {
    if (foto) {
      await MediaLibrary.createAssetAsync(foto?.uri);
      Alert.alert("Salvo com sucesso!");
    }
  }

  async function voltar() {
    setFoto(null);
  }


  let resultado: any;

  if (foto) {
    console.log(foto);


    resultado = <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <Text style={estilos.tituloFoto}>Foto</Text>
      <Image source={foto} style={estilos.fotoPreview} />
      <TouchableOpacity onPress={voltar} style={estilos.voltar}>
        <Text style={{ color: "white", padding: 10, textAlign: "center", fontSize: 19 }}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={salvarFoto} style={estilos.voltar}>
        <Text style={{ color: "white", padding: 10, textAlign: "center", fontSize: 19 }}>Salvar</Text>
      </TouchableOpacity>
    </View>
  }
  else {
    resultado = <Camera type={tipoCamera} style={estilos.camera} ref={cameraRef} >
      <TouchableOpacity style={estilos.obterFoto} onPress={obterFoto}>
        <View />
      </TouchableOpacity>
    </Camera>;
  }

  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar />
      {resultado}

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
