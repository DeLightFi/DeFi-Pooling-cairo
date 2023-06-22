import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Montserrat, Helvetica, sans-serif;

    background-color: ${({ theme }) => theme.colors.bg1};
    color:  ${({ theme }) => theme.colors.color3};
  }


  /* total width */
  body::-webkit-scrollbar {
    background-color: transparent;
    width: 6px;
  }

  /* background of the scrollbar except button or resizer */
  body::-webkit-scrollbar-track {
    background-color: transparent;
  }

  /* scrollbar itself */
  body::-webkit-scrollbar-thumb {
    background-color: rgb(77, 77, 77);
    border-radius: 16px;
    border: 1px solid #11121f;
  }

  /* set button(top and bottom of the scrollbar) */
  body::-webkit-scrollbar-button {
    display: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`

export default GlobalStyle
