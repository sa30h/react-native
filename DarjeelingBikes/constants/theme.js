import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
   primary: "#FC6D3F", // orange
  secondary: "#CDCDD2", // gray
  background:"#E3EDF2",
  darjeelingBlue:"#20586e",
  // colors
  black: "#3e3e42",
  white: "#FFFFFF",
  black2:"#223752",
  red2:"#bd1313",
  purple:"#58568c",

  lightGray: "#F5F5F6",
  lightGray2: "#F6F6F7",
  lightGray3: "#EFEFF1",
  lightGray4: "#F8F8F9",
  transparent: "transparent",
  darkgray: "#898C95",
  blue:"#93D8F8"
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: "Roboto-regular",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontSize: SIZES.h1, lineHeight: 36, fontWeight: "bold" }, //fontFamily: "Roboto-Black",
  h2: { fontSize: SIZES.h2, lineHeight: 30, fontWeight: "bold" }, //fontFamily: "Roboto-Bold",
  h3: { fontSize: SIZES.h3, lineHeight: 22, fontWeight: "bold" },
  h4: { fontSize: SIZES.h4, lineHeight: 22 }, //fontFamily: "Roboto-Bold"
  body1: { fontSize: SIZES.body1, lineHeight: 36 }, //fontFamily: "Roboto-Regular",
  body2: {
  //  fontFamily: "Roboto-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
  //  fontFamily: "Roboto-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
  //  fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
   // fontFamily: "Roboto-Regular",
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
