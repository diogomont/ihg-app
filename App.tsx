import React from "react";
import { SafeAreaView } from "react-native";
import { constants } from "./constants/constants";
import { Home } from "./screens/Home";

export default function App() {
  return (
    <SafeAreaView style={{ paddingTop: constants.androidPadding }}>
      <Home />
    </SafeAreaView>
  );
}
