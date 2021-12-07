import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Image,
  Pressable,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { globalBotones } from "../styles/botones";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalTyT } from "../styles/textoytitulo";

export default function profileuser({ navigation }) {
  const [cargando, setCargando] = useState(false);
  const [ejecucion, setEjecucion] = useState(null);
  const [idproductos, setIdProductos] = useState(null);
  var [nombre_producto, setnombre_producto] = useState(null);
  var [marca_producto, setmarca_producto] = useState(null);

  const [imagen, setImagen] = useState("");

  const calculosListado = async () => {
    try {
      var datos = JSON.parse(await AsyncStorage.getItem("datos_productos"));
    } catch (error) {
      Alert.alert("Error al leer:" + error);
    }
    setIdProductos(datos.idproductos);
    setnombre_producto(datos.nombre_producto);
    setmarca_producto(datos.marca_producto);
  };
  const abrirGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      var response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.cancelled) {
        setImagen(response.uri);
      }
    }
  };

  const subirImagen = async () => {
    const image = new FormData();
    image.append("img", {
      uri: imagen,
      type: "image/jpg",
      name: "img.jpg",
    });

    image.append("idproductos", idproductos);

    try {
      const response = await fetch(
        "http://192.168.1.165:3001/api/archivos/img",
        {
          method: "POST",
          body: image,
        }
      );
      Alert.alert("Prometheus", "La imagen fue subida con exito");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.fondo}>
      {cargando ? (
        <ActivityIndicator
          visible={cargando}
          size="large"
          textContent={"Espere..."}
          textStyle={styles.activiti}
        />
      ) : (
        <SafeAreaView style={styles.contenedorPantalla}>
          <View style={styles.header}>
            <Text style={globalTyT.titulo}>INGRESAR IMAGEN</Text>
          </View>
          <View style={styles.contenedorImagen}>
            <View>
              <Pressable onPress={abrirGaleria}>
                {imagen ? (
                  <Image
                    source={{ uri: imagen }}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <Text></Text>
                )}
              </Pressable>
            </View>
          </View>
          <View style={styles.contenedorInfo}>
            <Text style={globalTyT.texto}>{nombre_producto}</Text>
            <Text style={globalTyT.texto}>{marca_producto}</Text>
          </View>
          <View style={styles.contenedorBotones}>
            <Pressable onPress={abrirGaleria}>
              <LinearGradient
                style={globalBotones.boton}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#E43E31", "#F4AA31"]}
              >
                <Text style={globalBotones.tituloBoton}>
                  Seleccionar imagen
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
          <View style={styles.contenedorBotones}>
            <Pressable onPress={() => navigation.replace("PrincipalEmpleado")}>
              <LinearGradient
                style={globalBotones.boton}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#E43E31", "#F4AA31"]}
              >
                <Text style={globalBotones.tituloBoton}>Regresar</Text>
              </LinearGradient>
            </Pressable>
            <Pressable onPress={calculosListado}>
              <LinearGradient
                style={globalBotones.boton}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={["#E43E31", "#F4AA31"]}
              >
                <Text style={globalBotones.tituloBoton}>Listar</Text>
              </LinearGradient>
            </Pressable>
          </View>

          {imagen ? (
            <View style={styles.contenedorBotones}>
              <Pressable onPress={subirImagen}>
                <LinearGradient
                  style={globalBotones.boton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={["#E43E31", "#F4AA31"]}
                >
                  <Text style={globalBotones.tituloBoton}>Subir imagen</Text>
                </LinearGradient>
              </Pressable>
            </View>
          ) : null}
        </SafeAreaView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedorImagen: {
    flex: 1,
    height: 300,
    marginBottom: 20,
  },
  header: {
    display: "flex",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "left",
    backgroundColor: "#154472",
  },
  contenedor: {
    flex: 1,
  },
  contenedorBotones: {
    flex: 1,
    padding: 10,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  fondo: {
    backgroundColor: "#072C50",
    flex: 1,
  },
  contenedorInfo: {
    marginHorizontal: 20,
  },
});
