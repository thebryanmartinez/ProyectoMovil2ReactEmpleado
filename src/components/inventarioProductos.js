import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { globalFooter } from "../styles/footer";
import { globalBotones } from "../styles/botones";
import { globalEntradas } from "../styles/entradas";

export default function App({ navigation }) {
  const [info, setinfo] = useState([]);
  const [ejecucion, setEjecucion] = useState(null);
  const [search, setSearch] = useState("");
  const [cantidadProducto, setCantidad_Producto] = useState(null);

  function modificarInventario(id) {
    fetch(
      "http://192.168.1.165:3001/api/productos/modificarCantidad?idproductos=" +
        id,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cantidad_producto: cantidadProducto }),
      }
    )
      .then((res) => res.text())
      .then((res) => console.log(res));
    Alert.alert("Prometheus", "La cantidad ha sido actualizada con exito");
  }

  if (ejecucion == null) {
    try {
      const response = fetch("http://192.168.1.165:3001/api/productos/listar2")
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
          "http://192.168.1.165:3001/api/productos/listar2"
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
            color="#ed7731"
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
              numColumns={1}
              style={styles.productos}
              data={info}
              keyExtractor={(item) => item.idproductos}
              renderItem={({ item }) => {
                return (
                  <Pressable style={styles.contenedorFuera}>
                    <View style={styles.contenedorDentro}>
                      <View style={styles.contenedorInfo}>
                        <View>
                          <Text style={styles.productoNombre}>
                            {item.nombre_producto}
                          </Text>
                          <Text style={styles.productoMarca}>
                            {item.marca_producto}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.productoNombre}>
                            Inventario: {item.cantidad_producto}
                          </Text>
                        </View>
                        <View>
                          <TextInput
                            keyboardType="number-pad"
                            placeholder="#"
                            onChangeText={setCantidad_Producto}
                            style={globalEntradas.entradaTexto}
                            placeholderTextColor="#ced4da"
                          />
                        </View>
                      </View>
                      <Pressable
                        onPress={() => modificarInventario(item.idproductos)}
                      >
                        <LinearGradient
                          style={globalBotones.boton}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 0, y: 1 }}
                          colors={["#E43E31", "#F4AA31"]}
                        >
                          <Text style={globalBotones.tituloBoton}>
                            Modificar
                          </Text>
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
    width: "100%",
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
    width: "100%",
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
  contenedorInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
