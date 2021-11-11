import React from "react";
import { configureFonts, DefaultTheme } from "react-native-paper";
import customFonts from "./Fonts";

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(customFonts),
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: "#dd664a",
    accent: '#66ace2',
    background: '#f8f3e7',
    surface: '#fff',
    text: '#4d4843',
    disabled: '#a29d95',
    placeholder: '#a29d95',
    backdrop: '#4d4843',
    onSurface: '#fff',
    cancelButton: "#a4c639",
    iconColor: "#dd664a",
  },
};

export default theme;