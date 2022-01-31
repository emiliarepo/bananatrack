import Head from 'next/head'
import Link from 'next/link'

import InfiniteScroll from 'react-infinite-scroll-component'
import {useState} from 'react'
import dynamic from 'next/dynamic'
const Store = dynamic(() => import('./components/store'))

import Header from './components/header'
import Footer from './components/footer'

export default function List({ data, length }) {

  const [stores, setStores] = useState(data.slice(0, 50))

  const getMore = async () => {
    const newStores = data.slice(stores.length, stores.length+20)
    setStores((stores) => [...stores, ...newStores])
  }


  return (
    <>
      <Head>
        <title>Bananatrack</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="h-full bg-white">

        <Header />

        <section className="text-gray-600 body-font mb-6 min-h-screen">
          <div className="container px-5 py-4 mx-auto">
            <div className="flex flex-wrap -m-4 content-start">

              <Link href="/">
                <a className="p-4 mx-auto text-xl text-yellow-500 font-semibold">← Etusivulle</a>
              </Link>

              <div className="p-4 w-full lg:px-20">
                <div className="h-full bg-gray-100 bg-opacity-75 px-8 lg:mx-12 pt-8 pb-10 rounded-lg overflow-hidden text-center relative">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-6">Kaikki banaanikaupat</h1>
                  <InfiniteScroll
                    dataLength={stores.length}
                    next={getMore}
                    hasMore={stores.length < length}
                    loader={<h4>Ladataan...</h4>}
                    endMessage={
                      <p style={{ textAlign: 'center' }}>
                        <b>Selasit listan loppuun!</b>
                      </p>
                    }
                  >
                    {stores.map((store, i) => (<Store store={store} key={i} />))}
                  </InfiniteScroll>
                </div>
              </div>

              <Link href="/">
                <a className="p-4 mx-auto text-xl text-yellow-500 font-semibold">← Etusivulle</a>
              </Link>

            </div>
          </div>
        </section>

        <Footer />
 
      </body>
    </>
  )
}

export async function getServerSideProps() {

  const res = await fetch('http://localhost:3008/api/prices')
  let data = await res.json()

  const length = await (await fetch('http://localhost:3008/api/prices/length')).json()

  return {
    props: {
      data,
      length
    },
  }
}
