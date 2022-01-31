import Fuse from 'fuse.js'

export default async function handler(req, res) {
    const stores = await (await fetch('http://localhost:3008/api/prices')).json()
    const fuse = new Fuse(stores, {
        keys: [{name: 'spotName', weight: 0.5}, 'address', 'brand', {name: 'name', weight: 2}],
    })
    console.log(req.query.q.toString())
    res.status(200).json(fuse.search(req.query.q).slice(0, 5))
}