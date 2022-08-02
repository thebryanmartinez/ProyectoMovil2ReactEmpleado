import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import login from "./login";
import principalEmpleado from './principalEmpleado';
import ingresarProductos from './ingresarProductos';
import inventarioProductos from './inventarioProductos';
import guardarImagen from './guardarImagen';
import listarProductos from './listarProductos';

const Stack = createNativeStackNavigator();
export default function menu() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PrincipalEmpleado" component={principalEmpleado} />
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="ListarProductos" component={listarProductos} />
        <Stack.Screen name="InventarioProductos" component={inventarioProductos} />
        <Stack.Screen name="IngresarProductos" component={ingresarProductos} />
        <Stack.Screen name="GuardarImagen" component={guardarImagen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
