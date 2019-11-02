import React from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import { Icon } from "../components/Icon";
import { constants } from "../constants/constants";

export const Home = () => {
  return (
    <SafeAreaView style={{ paddingTop: constants.androidPadding }}>
      <View style={styles.container}>
        <Icon />
        <Text style={{ color: "red" }}>Generate hash tags</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: constants.containerPadding,
    flex: 1,
    backgroundColor: "#fff"
  }
});
