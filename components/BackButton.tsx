import * as React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props {
  onPress: (GestureResponderEvent) => void;
}

export const BackButton = ({ onPress }: Props) => (
  <TouchableOpacity onPress={onPress} style={styles.backButtonContainer}>
    <Svg width="13" height="24" viewBox="0 0 13 24" fill="none">
      <Path d="M11 23L2 12.5L11 1" stroke="#FF0000" strokeWidth="3" />
    </Svg>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backButtonContainer: {
    width: 24,
    height: 24,
    position: "absolute",
    zIndex: 10000,
    alignItems: "center"
  }
});
