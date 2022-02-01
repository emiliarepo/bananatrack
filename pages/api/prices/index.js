import { getStores } from "./../../../util/updatePrices";

export default function handler(req, res) {
	const theStores = getStores();

	const offset = parseInt(req.query.offset);
	if (offset != NaN && offset >= 0 && offset <= theStores.length) {
		res.status(200).json(theStores.slice(offset, offset + 20));
	} else {
		res.status(200).json(theStores);
	}
}
