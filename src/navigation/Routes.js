import { View, Text } from "react-native";
import React, { useEffect } from "react";
import HomePage from "../screens/HomePage";
import AppStack from "./AppStack";
import AdminStack from "./AdminStack";
import { useSelector } from "react-redux";

const Routes = () => {
  const gotoAdminState = useSelector((state) => state.appState.goingAdmin);
  useEffect(() => {
    console.log(
      "🚀 ~ file: Routes.js:13 ~ useEffect ~ gotoAdminState",
      gotoAdminState
    );
  }, [gotoAdminState]);

  if (false) {
    return <AdminStack />;
  } else {
    return <AppStack />;
  }
};

export default Routes;
