import { View, Text } from "react-native";
import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import Routes from "./Routes";
import Store from "../redux/store";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#ED820E",
    accent: "#ED820E",
  },
};
const Providers = () => {
  return (
    <Provider store={Store}>
      <PaperProvider theme={theme}>
        <Routes />
      </PaperProvider>
    </Provider>
  );
};

export default Providers;
