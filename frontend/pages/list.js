import Head from 'next/head'
import Store from './components/store'
import Header from './components/header'
import Footer from './components/footer'

export default function List({stores}) {
  return (
    <>
      <Head>
        <title>Bananatrack</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body class="h-full bg-white">

        <Header />

        <section class="text-gray-600 body-font mb-6">
          <div class="container px-5 py-4 mx-auto">
            <div class="flex flex-wrap -m-4 content-start">

              <a href="/" class="p-4 mx-auto text-xl text-yellow-500 font-semibold">← Etusivulle</a>

              <div class="p-4 w-full lg:px-20">
                <div class="h-full bg-gray-100 bg-opacity-75 px-8 lg:mx-12 pt-8 pb-10 rounded-lg overflow-hidden text-center relative">
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-6">Kaikki banaanikaupat</h1>
                  {stores
                    .sort((a, b) => {return a.name.toLowerCase().localeCompare(b.name.toLowerCase())})
                    .map(store => (<Store store={store} />))
                  }
                </div>
              </div>

              <a href="/" class="p-4 mx-auto text-xl text-yellow-500 font-semibold">← Etusivulle</a>

            </div>
          </div>
        </section>

        <Footer />
 
      </body>
    </>
  )
}

export async function getStaticProps() {

  const res = await fetch('http://localhost:3008/api/prices')
  let stores = await res.json()
  stores = stores.sort((a, b) => {a.name.toLowerCase().localeCompare(b.name.toLowerCase())})

  return {
    props: {
      stores,
    },
  }
}
