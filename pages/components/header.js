import Link from 'next/link'

export default function Header() {
    return (
        <>
            <div className="">
                <div className="container mx-auto flex flex-col items-center pt-12 pb-6">
                    <Link href="/">
                        <a className="text-4xl md:text-5xl lg:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
                            <span className="text-yellow-500">Banana</span>Track
                        </a>
                    </Link>
                    <p className="mt-3 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">
                        Aina paras hinta-laatusuhde
                    </p>
                </div>
            </div>
        </>
    )
}