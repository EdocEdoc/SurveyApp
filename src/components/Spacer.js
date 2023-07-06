import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Spacer = ({ small }) => {
  if (small) {
    return <View style={{ marginTop: 10 }}></View>;
  } else {
    return <Text>{"     "}</Text>;
  }
};

export default Spacer;

const styles = StyleSheet.create({});
