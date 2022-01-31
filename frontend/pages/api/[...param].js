export default async function handler(req, res) {
    res.status(200).json(await (await fetch('http://localhost:3008' + req.url)).json())
}