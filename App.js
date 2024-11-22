import { Audio } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AudioScreen from "./components/Audio";
import Login from "./components/Login";
import Register from "./components/Register";
import Feedback from "./components/Feedback";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen
          name="AudioScreen"
          component={AudioScreen}
          options={{ title: "welcome" }}
          initialParams={{ email: ""}}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name= "Feedback" component={Feedback} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  container: {
    backgroundColor: "#fff",
    height: "100%",
    marginTop: 50,
  },
  contentContainer: {
    flex: 1,
  },
  column: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "green",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  list: {
    marginTop: 20,
    flex: 1,
    flexDirection: "column",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    width: 100,
    height: 40,
  },
  recordingName: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  playButton: {
    backgroundColor: "gray",
    borderRadius: 50,
    padding: 10,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
