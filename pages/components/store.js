export default function Store({store}) {
    if (store == null) return <></>
    return (
        <>
            <a className="p-3 my-4 max-w-l mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}`} target="_blank">
                <div key="a" className="shrink-0">
                    <img className="h-12 w-12" src={`/logos/${store.brand}.png`}/>
                </div>
                <div className="text-left">
                    <div className="text-xl font-medium text-black">{store.name}</div>
                    <p className="text-slate-600 font-medium">{store.bananaPrice}e/kg</p>
                    <p className="text-slate-500 font-light">{store.spotName}</p>
                </div>
            </a>
        </>
    )
}
