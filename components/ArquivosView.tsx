import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar, Alert, FlatList, ListRenderItem } from 'react-native';
import { Camera, CameraType, CameraCapturedPicture } from "expo-camera"
import * as MediaLibrary from "expo-media-library"
import { useEffect, useRef, useState } from 'react';
import * as Permissions from "expo-permissions"
import * as ExpoFs from "expo-file-system"


export default function ArquivosView() {

    const dirTrimap = ExpoFs.documentDirectory + "trimap_imagens/";

    const [arquivos, setArquivos] = useState<string[]>([]);

    useEffect(() => {

        (async () => {
            await atualizarArquivos();
        })();



    }, [])

    async function atualizarArquivos() {
        const files = await ExpoFs.readDirectoryAsync(dirTrimap);

        const filesUri = new Array<string>();

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileInfo = await ExpoFs.getInfoAsync(dirTrimap + file);
            console.log("uri file", fileInfo.uri);
            filesUri.push(fileInfo.uri);
        }
        setArquivos(filesUri);
    }

    async function excluirImagem(uri: string) {
        await ExpoFs.deleteAsync(uri);
        await atualizarArquivos();

    }

    function renderItem({ item }: { item: string }) {
        const nome = item.split("/").pop();
        return <View style={{ margin: 5, padding: 5, flexDirection: "row", alignItems: "center", backgroundColor: "#EEEEEE", borderRadius: 5, justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={{ uri: item }} width={200} height={200} style={estilos.imagemItem} />
                <Text style={estilos.imagemItemNome}>{nome}</Text>
            </View>

            <TouchableOpacity style={{ backgroundColor: "red", width: 60, height: 60, borderRadius: 60 / 2, marginRight: 25 }} onPress={() => excluirImagem(item)}>
                <Text style={{ fontSize: 28, color: "white", fontWeight: "bold", textAlign: "center", padding: 10 }}>X</Text>
            </TouchableOpacity>
        </View>
    }

    return <>

        <FlatList ListHeaderComponent={() => <Text>Arquivos View</Text>} data={arquivos} renderItem={renderItem} />
    </>

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
    },
    imagemItem: {
        width: 80,
        height: 80,
        borderRadius: 5
    },
    imagemItemNome: {
        marginLeft: 10,
        fontSize: 19,
        fontWeight: "bold"
    }

});
