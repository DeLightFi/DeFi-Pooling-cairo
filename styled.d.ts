import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      accentuation: string
      color1: string
      color2: string
      color3: string
      bg1: string
      bg2: string
      starkenLogo1: string
      starkenLogo2: string
    },
    name: string
  }
}
