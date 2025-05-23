import '../styles/globals.css'
import '../styles/mobile-fixes.css'
import Layout from '../components/Layout'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence mode="wait">
      <Layout>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </AnimatePresence>
  )
}

export default MyApp
