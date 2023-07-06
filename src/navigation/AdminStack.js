import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AdminHomePage from "../screens/AdminHomePage";
import AddQuestionScreen from "../screens/AddQuestionScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const AdminStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminHomePage"
          component={AdminHomePage}
          options={{ title: "Admin Dashboard", headerShown: false }}
        />

        <Stack.Screen
          name="AddQuestionScreen"
          component={AddQuestionScreen}
          options={{ title: "Add Survey Question" }}
          initialParams={{ question: null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AdminStack;
