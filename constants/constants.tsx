import { Platform } from "react-native";

export const constants = {
  containerPadding: 22,
  androidPadding: Platform.OS === "android" ? 40 : 0
};
