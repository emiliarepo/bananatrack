import { getStores } from "./../../../util/updatePrices";

export default function handler(req, res) {
	res.status(200).json(getStores().length);
}
