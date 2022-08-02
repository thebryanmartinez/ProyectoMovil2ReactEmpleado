import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { globalFooter } from "../styles/footer";
import { globalBotones } from "../styles/botones";

export default function App({ navigation }) {
  const [info, setinfo] = useState([]);
  const [ejecucion, setEjecucion] = useState(null);
  const [search, setSearch] = useState("");
  const [idproductos, setidproductos] = useState(null);
  const [nombre_producto, setnombre_producto] = useState(null);
  const [marca_producto, setmarca_producto] = useState(null);
  const [precio_producto, setprecio_producto] = useState(null);

  if (ejecucion == null) {
    try {
      const response = fetch("http://192.168.0.3:3001/api/productos/listar2")
        .then((response) => response.json())
        .then((json) => {
          setinfo(json);
          console.log(json);
        });
      setEjecucion(false);
    } catch (error) {
      setEjecucion(false);
      console.error(error);
    }
  }

  const elegir = async (item) => {
    console.log(item);
    setidproductos(item.idproductos);
    setnombre_producto(item.nombre_producto);
    setmarca_producto(item.marca_producto);
    setprecio_producto(item.precio_producto);
    const datos = {
      idproductos: idproductos,
      nombre_producto: nombre_producto,
      marca_producto: marca_producto,
      precio_producto: precio_producto,
    };
    const datos_productos = JSON.stringify(datos);
    await AsyncStorage.setItem("datos_productos", datos_productos);
  };

  const searchFilter = (text) => {
    if (text) {
      const nuevaInfo = info.filter((item) => {
        const itemData = item.nombre_producto
          ? item.nombre_producto.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setinfo(nuevaInfo);
      setSearch(text);
    } else {
      try {
        const response = fetch(
          "http://192.168.0.3:3001/api/productos/listar2"
        )
          .then((response) => response.json())
          .then((json) => {
            setinfo(json);
            console.log(json);
          });
        setEjecucion(false);
      } catch (error) {
        setEjecucion(false);
        console.error(error);
      }
      setinfo(info);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={styles.fondo}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require("../../assets/img/busqueda.png")} />
          <TextInput
            style={styles.busqueda}
            placeholder="Buscar producto"
            placeholderTextColor="#ed7731"
            value={search}
            underlineColorAndroid="transparent"
            onChangeText={(text) => searchFilter(text)}
          />
        </View>
        <View style={styles.main}>
          <View>
            <FlatList
              numColumns={2}
              style={styles.productos}
              data={info}
              keyExtractor={(item) => item.idproductos}
              renderItem={({ item }) => {
                return (
                  <Pressable
                    style={styles.contenedorFuera}
                    onPress={() => navigation.replace("GuardarImagen")}
                  >
                    <View style={styles.contenedorDentro}>
                      <View style={styles.contenedorImagen}>
                        <Image
                          source={{
                            uri: "http://192.168.0.3:3001/api/imagenes/img-1638840892328-988378123image.jpg",
                          }}
                          style={styles.imagen}
                        ></Image>
                      </View>

                      <View style={styles.contenedorInfo}>
                        <Text style={styles.productoNombre}>
                          {item.nombre_producto}
                        </Text>
                        <Text style={styles.productoMarca}>
                          {item.marca_producto}
                        </Text>
                        <Text style={styles.productoPrecio}>
                          L. {item.costo}
                        </Text>
                      </View>
                      <Pressable onPress={() => elegir(item)}>
                        <LinearGradient
                          style={globalBotones.boton}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 0, y: 1 }}
                          colors={["#E43E31", "#F4AA31"]}
                        >
                          <Text style={globalBotones.tituloBoton}>Elegir</Text>
                        </LinearGradient>
                      </Pressable>
                    </View>
                  </Pressable>
                );
              }}
            />
          </View>
        </View>

        <View>
          <LinearGradient
            style={globalFooter.footer}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#E43E31", "#F4AA31"]}
          >
            <Pressable onPress={() => navigation.replace("PrincipalEmpleado")}>
              <Image source={require("../../assets/img/home.png")} />
            </Pressable>
            <Pressable onPress={() => navigation.replace("IngresarProductos")}>
              <Image source={require("../../assets/img/add.png")} />
            </Pressable>
            <Pressable
              onPress={() => navigation.replace("InventarioProductos")}
            >
              <Image source={require("../../assets/img/storage.png")} />
            </Pressable>
            <Pressable onPress={() => navigation.replace("ListarProductos")}>
              <Image source={require("../../assets/img/image.png")} />
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    backgroundColor: "#072C50",
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#072C50",
  },
  header: {
    display: "flex",
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "left",
    backgroundColor: "#154472",
  },
  main: {
    flex: 1,
  },
  productosTexto: {
    color: "#ed7731",
    fontSize: 18,
  },
  contenedorFuera: {
    width: "50%",
    borderWidth: 1,
    borderColor: "#eee",
  },
  busqueda: {
    fontSize: 18,
    fontFamily: "montserrat-semibold",
    paddingLeft: 5,
    width: "85%",
    marginLeft: 10,
  },
  contenedorDentro: {
    margin: 10,
  },
  contenedorImagen: {
    flex: 1,
  },
  imagen: {
    width: 185,
    height: 150,
  },
  productoNombre: {
    textAlign: "left",
    color: "#ed7731",
    fontSize: 18,
    fontFamily: "montserrat-semibold",
  },
  productoMarca: {
    marginTop: 5,
    textAlign: "left",
    color: "#ed7731",
    fontSize: 18,
    fontFamily: "montserrat-semibold",
  },
  productoPrecio: {
    marginTop: 15,
    textAlign: "left",
    color: "#ed7731",
    fontSize: 20,
    fontFamily: "montserrat-bold",
  },
});
