import type { AppProps } from 'next/app'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { useState } from 'react'
import Head from 'next/head'
import { StarknetConfig, InjectedConnector } from '@starknet-react/core'
import GlobalStyle from '../components/globalstyles'

const darktheme: DefaultTheme = {
  colors: {
    accentuation: '#6d87fe',
    color1: '#ffffff',
    color2: '#848387',
    color3: '#dddadb',
    bg1: '#080808',
    bg2: '#121418',
    starkenLogo1: '#DC29FF',
    starkenLogo2: '#2AC2FE',
  },
  name: 'dark',
}

export default function App({ Component, pageProps }: AppProps) {
  const [theme, SetTheme] = useState<DefaultTheme>(darktheme);
  const connectors = [
    new InjectedConnector({ options: { id: 'braavos' } }),
    new InjectedConnector({ options: { id: 'argentX' } }),
  ]


  return (
    <>
      <StarknetConfig connectors={connectors}>

        <Head>
          <title>Mirror - Bringing L1 DeFi to Starknet</title >
        </Head >
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} theme={theme} SetTheme={SetTheme} />
        </ThemeProvider>
      </StarknetConfig>
    </>
  )
}