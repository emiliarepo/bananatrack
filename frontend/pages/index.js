import Head from 'next/head'
import postcss from 'postcss'
import Store from './components/store'

export default function Home({stores}) {
  return (
    <>
      <Head>
        <title>Bananatrack</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body class="h-full bg-white">

        <div class="">
          <div class="container mx-auto flex flex-col items-center py-12">
            <h1 class="text-5xl lg:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
              <span class="text-yellow-500">Banana</span>Track
            </h1>
            <p class="mt-5 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">Eeppinen slogan tähän</p>
          </div>
        </div>

        <section class="text-gray-600 body-font">
          <div class="container px-5 py-4 mx-auto">
            <div class="flex flex-wrap -m-4 content-start">

              <div class="p-4 w-full lg:w-1/2">
                <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-8 pb-10 rounded-lg overflow-hidden text-center relative">
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-6">Halvimmat banaanit</h1>
                  {stores.reverse().slice(0, 5).map(store => (
                    <Store store={store} />
                  ))}
                </div>
              </div>

              <div class="p-4 w-full lg:w-1/2">
                <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-8 pb-10 rounded-lg overflow-hidden text-center relative">
                  <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-6">Kalleimmat banaanit</h1>
                  {stores.slice(-5).reverse().map(store => (
                    <Store store={store} />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
 
      </body>
    </>
  )
}

export async function getStaticProps() {

  const res = await fetch('http://localhost:3008/api/prices')
  const stores = await res.json()

  return {
    props: {
      stores,
    },
  }
}
