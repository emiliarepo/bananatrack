import Head from 'next/head'
import Link from 'next/link'

import Store from './components/store'
import Header from './components/header'
import Footer from './components/footer'

export default function Home({stores}) {
  return (
    <>
      <Head>
        <title>Bananatrack</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="h-full bg-white">

        <Header />

        <section className="text-gray-600 body-font">
          <div className="container px-5 py-4 mx-auto">
            <div className="flex flex-wrap -m-4 content-start">

              <div className="p-4 w-full lg:w-1/2">
                <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-8 pb-10 rounded-lg overflow-hidden text-center relative">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-6">Halvimmat banaanit</h1>
                  {stores.slice(0, 5).map((store, i) => (
                    <Store store={store} key={i}/>
                  ))}
                </div>
              </div>

              <div className="p-4 w-full lg:w-1/2">
                <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-8 pb-10 rounded-lg overflow-hidden text-center relative">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-6">Kalleimmat banaanit</h1>
                  {stores.slice(-5).reverse().map((store, i) => (
                    <Store store={store} key={i}/>
                  ))}
                </div>
              </div>
              
              <Link href="/list">
                <a className="p-4 mx-auto text-xl text-yellow-500 font-semibold">Katso kaikki kaupat tästä!</a>
              </Link>  

            </div>
          </div>
        </section>


        <section className="text-gray-600 body-font bg-gray-100 mt-10 pt-8 pb-12">
          <div className="container px-5 py-4 mx-auto">
            <div className="flex flex-wrap -m-4 content-start">

              <div className="p-4 w-full lg:w-1/2">
                <div className="h-full bg-white bg-opacity-75 px-8 pt-8 pb-10 rounded-lg overflow-hidden text-center relative">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-6">Miksi teemme tätä?</h1>
                  <p className="font-medium">
                    Banaani on yksi merkittävimmistä hedelmistä opiskelijan ravinnon kannalta. Se sisältää paljon elimistölle tärkeitä
                    aineita kuten kuitua, B- ja C-vitamiinia, kaliumia ja mangaania. Banaani on myös erittäin monipuolinen hedelmä: siitä 
                    voi tehdä esimerkiksi lettuja, muffinseja, leipää tai smoothieita.<br/>
                    <br/>
                    Vaikka banaani onkin monia muita hedelmiä halvempi, hinnat vaihtelevat reilusti kaupasta toiseen. Banaanin hinta voi 
                    olla jopa 50% korkeampi kuin saman ketjun toisessa liikkeessä. Sivumme <b>reaaliaikaisen</b> tiedon ansiosta opiskelijat
                    pystyvät löytämään mahdollisimman halpoja banaaneja.
                  </p>
                </div>
              </div>

              <div className="p-4 w-full lg:w-1/2">
                <div className="h-full bg-white bg-opacity-75 px-8 pt-8 pb-10 rounded-lg overflow-hidden text-center relative">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-6">Missä kauppa _____?</h1>
                  <p className="font-medium">
                    Kesko ei ole vielä ymmärtänyt banaanien merkitystä opiskelijan ravitsemukselle. K-ryhmän banaanifoobisten mielipiteiden
                    takia Kiituribot ei valitettavasti pääase käsiksi reaaliaikaiseen dataan, vaan data pitää hakea manuaalisesti tietyn 
                    ajan välein.<br/>
                    <br/>
                    S-ryhmän kaupat ovat tällä hetkellä siirtymässä vanhasta <a href="https://foodie.fi">foodie.fi</a>-alustasta 
                    uuteen <a href="https://s-kaupat.fi">s-kaupat.fi</a>-alustaan. Kiituribot skannaa dataa vain uuden alustan 
                    kaupoista, mutta määrä kasvaa joka päivä.<br/>
                    <br />
                    Valitettavasti Alepat eivät tarjoa noutopalvelua, vaan listassa näkyy pelkästään Alepan keskusvarasto.
                  </p>
                </div>
              </div>

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
  const stores = await res.json()

  return {
    props: {
      stores,
    },
  }
}
