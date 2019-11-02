import React from "react";
import { SafeAreaView } from "react-native";
import { constants } from "./constants/constants";
import { Home } from "./screens/Home";
import * as Font from "expo-font";

export default class App extends React.Component<{}> {
  state = {
    fontsLoaded: false
  };

  async componentDidMount() {
    console.log("trying to load fonts");
    try {
      await Font.loadAsync({
        // TODO: remove unused fonts from assets/fonts
        Inter: require("./assets/fonts/Inter/Inter-Regular.ttf"),
        InterBold: require("./assets/fonts/Inter/Inter-Bold.ttf"),
        InterBlack: require("./assets/fonts/Inter/Inter-Black.ttf"),
        RobotoMono: require("./assets/fonts/RobotoMono/RobotoMono-Regular.ttf"),
        RobotoMonoBold: require("./assets/fonts/RobotoMono/RobotoMono-Bold.ttf")
      });
    } catch (err) {
      console.log(err);
    }
    console.log("loaded fonts");
    this.setState({ fontsLoaded: true });
  }

  render() {
    if (!this.state.fontsLoaded) {
      return null;
    }
    return (
      <SafeAreaView style={{ paddingTop: constants.androidPadding }}>
        <Home />
      </SafeAreaView>
    );
  }
}
