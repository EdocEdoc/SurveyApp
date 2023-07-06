import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import Providers from "./src/navigation";
import { colors } from "./src/common/colors";

export default function App() {
  return (
    <>
      <StatusBar animated={true} backgroundColor={colors.SAFFRONYELLOWDARK} />
      <Providers />
    </>
  );
}
