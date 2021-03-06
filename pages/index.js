import Head from "next/head";
import Link from "next/link";

import { useState } from "react";

import { getStores } from "./../util/updatePrices";

import Store from "./components/store";
import Header from "./components/header";
import Footer from "./components/footer";

export default function Home({ first, last }) {
	const [results, setResults] = useState();

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
									<h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-6">
										Halvimmat banaanit
									</h1>
									{first.map((store, i) => (
										<Store store={store} key={i} />
									))}
								</div>
							</div>

							<div className="p-4 w-full lg:w-1/2">
								<div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-8 pb-10 rounded-lg overflow-hidden text-center relative">
									<h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-6">
										Kalleimmat banaanit
									</h1>
									{last.map((store, i) => (
										<Store store={store} key={i} />
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="text-gray-600 body-font">
					<div className="container px-5 py-4 lg:py-6 mx-auto">
						<div className="flex justify-center -m-4 content-start">
							<div className="p-4 w-full lg:w-1/2">
								<div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-8 pb-10 rounded-lg overflow-hidden text-center relative">
									<h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-6">
										Etsi kauppoja
									</h1>
									<input
										type="text"
										className="bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none shadow-md mb-2"
										placeholder="Search"
										onChange={async (e) => {
											const { value } = e.currentTarget;
											setResults(
												await (
													await fetch("api/prices/search?q=" + value)
												).json()
											);
										}}
									/>
									{results != null &&
										results.map((store, i) => (
											<Store store={store.item} key={i} />
										))}

									<div className="flex justify-center">
										<Link href="/list">
											<a className="pt-6 mx-auto text-xl text-yellow-500 font-semibold">
												Katso kaikki kaupat t??st??!
											</a>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="text-gray-600 body-font bg-gray-100 mt-10 pt-8 pb-12">
					<div className="container px-5 py-4 mx-auto">
						<div className="flex flex-wrap -m-4 content-start">
							<div className="p-4 w-full lg:w-1/2">
								<div className="h-full bg-white bg-opacity-75 px-8 pt-8 pb-10 rounded-lg overflow-hidden text-center relative">
									<h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-6">
										Miksi teemme t??t???
									</h1>
									<p className="font-medium">
										Banaani on yksi merkitt??vimmist?? hedelmist?? opiskelijan
										ravinnon kannalta. Se sis??lt???? paljon elimist??lle t??rkeit??
										aineita kuten kuitua, B- ja C-vitamiinia, kaliumia ja
										mangaania. Banaani on my??s eritt??in monipuolinen hedelm??:
										siit?? voi tehd?? esimerkiksi lettuja, muffinseja, leip???? tai
										smoothieita.
										<br />
										<br />
										Vaikka banaani onkin monia muita hedelmi?? halvempi, hinnat
										vaihtelevat reilusti kaupasta toiseen. Banaanin hinta voi
										olla jopa 50% korkeampi kuin saman ketjun toisessa
										liikkeess??. Sivumme <b>reaaliaikaisen</b> tiedon ansiosta
										opiskelijat pystyv??t l??yt??m????n mahdollisimman halpoja
										banaaneja.
									</p>
								</div>
							</div>

							<div className="p-4 w-full lg:w-1/2">
								<div className="h-full bg-white bg-opacity-75 px-8 pt-8 pb-10 rounded-lg overflow-hidden text-center relative">
									<h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-6">
										Miss?? kauppa _____?
									</h1>
									<p className="font-medium">
										Kesko ei ole viel?? ymm??rt??nyt banaanien merkityst??
										opiskelijan ravitsemukselle. K-ryhm??n banaanifoobisten
										mielipiteiden takia Kiituribot ei valitettavasti p????ase
										k??siksi reaaliaikaiseen dataan, vaan data pit???? hakea
										manuaalisesti tietyn ajan v??lein.
										<br />
										<br />
										S-ryhm??n kaupat ovat t??ll?? hetkell?? siirtym??ss?? vanhasta{" "}
										<a href="https://foodie.fi">foodie.fi</a>-alustasta uuteen{" "}
										<a href="https://s-kaupat.fi">s-kaupat.fi</a>-alustaan.
										Kiituribot skannaa dataa vain uuden alustan kaupoista, mutta
										m????r?? kasvaa joka p??iv??.
										<br />
										<br />
										Valitettavasti Alepat eiv??t tarjoa noutopalvelua, vaan
										listassa n??kyy pelk??st????n Alepan keskusvarasto.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<Footer />
			</body>
		</>
	);
}

export async function getServerSideProps() {
	const stores = getStores();
	const first = stores.slice(0, 5);
	const last = stores.slice(stores.length - 5, stores.length).reverse();
	return {
		props: {
			first,
			last,
		},
	};
}
