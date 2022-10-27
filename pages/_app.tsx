import '../styles/globals.css'
import { SWRConfig } from 'swr'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import fetchJson from "../lib/fetchJson"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
      }}>
      < Layout >
        <Component {...pageProps} />
      </Layout >
    </SWRConfig>
  )
}

export default MyApp
