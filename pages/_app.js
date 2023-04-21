import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Head from 'next/head'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
        <Head><title>NextJS Ecommerce - Admin Panel</title></Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}