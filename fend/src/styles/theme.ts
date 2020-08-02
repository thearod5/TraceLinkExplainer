import { createMuiTheme } from "@material-ui/core";

export const primaryColor = "#FFE4E1"; //Misty Rose
export const secondaryColor = "#CD5C5C"; //Indian Red
export const thirdaryColor = "#6DD3CE";
export const fourthColor = "#C8E9A0";
export const fitfthColor = "#351E29";

export default createMuiTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        "&$completed": {
          color: secondaryColor,
        },
        "&$active": {
          color: fourthColor,
        },
      },
      active: {},
      completed: {},
    },
  },
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
});
