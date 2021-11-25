import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import login from "./login";
import principalEmpleado from './principalEmpleado';
import ingresarProductos from './ingresarProductos';

const Stack = createNativeStackNavigator();
export default function menu() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PrincipalEmpleado" component={principalEmpleado} />
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="IngresarProductos" component={ingresarProductos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
