import { createMuiTheme } from '@material-ui/core'

export const primaryColor = '#b71c1c'
export const secondaryColor = '#fbc02d'
export const thirdaryColor = '#6DD3CE'
export const fourthColor = '#C8E9A0'
export const fitfthColor = '#351E29'

export default createMuiTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        '&$completed': {
          color: secondaryColor
        },
        '&$active': {
          color: primaryColor
        }
      },
      active: {},
      completed: {}
    }
  },
  palette: {
    primary: {
      main: primaryColor
    },
    secondary: {
      main: secondaryColor
    }
  }
})
