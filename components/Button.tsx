import * as React from "react";
import {
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  NativeSyntheticEvent
} from "react-native";

interface Props {
  buttonStyle: StyleProp<ViewStyle>;
  onBlur?: (NativeSyntheticEvent) => void;
  onFocus?: (NativeSyntheticEvent) => void;
  onPress: (GestureResponderEvent) => void;
  text: string;
  textStyle: StyleProp<TextStyle>;
}

export const Button = ({
  buttonStyle,
  onPress,
  text,
  textStyle,
  onFocus,
  onBlur
}: Props) => (
  <TouchableOpacity
    onBlur={onBlur}
    onFocus={onFocus}
    onPress={onPress}
    style={buttonStyle}
  >
    <Text style={textStyle}>{text}</Text>
  </TouchableOpacity>
);
