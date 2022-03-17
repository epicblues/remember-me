import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export const mainStyle: StyleProp<ViewStyle> = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: 20,
  height: '80%',
};

export const inputStyle: StyleProp<TextStyle> = { borderWidth: 1 };

export const titleStyle: StyleProp<TextStyle> = { fontSize: 40 };

export const memoStyle: StyleProp<TextStyle> = { fontSize: 30, minHeight: 80 };
