import Fuse from "fuse.js";
import { getStores } from "./../../../util/updatePrices";

export default async function handler(req, res) {
	const fuse = new Fuse(getStores(), {
		keys: [
			{ name: "spotName", weight: 0.5 },
			"address",
			"brand",
			{ name: "name", weight: 2 },
		],
	});
	res.status(200).json(fuse.search(req.query.q.slice(0, 30)).slice(0, 5));
}
