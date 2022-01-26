export default function Store(props) {
    if (!("store" in props)) return <></>
    return (
        <>
            <a class="p-3 my-4 max-w-l mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(props.store.address)}`} target="_blank">
                <div class="shrink-0">
                    <img class="h-12 w-12" src={`/logos/${props.store.brand}.png`}/>
                    </div>
                    <div class="text-left">
                    <div class="text-xl font-medium text-black">{props.store.name}</div>
                    <p class="text-slate-500">{props.store.bananaPrice}e/kg</p>
                </div>
            </a>
        </>
    )
}
