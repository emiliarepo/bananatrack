import updatePrices from "./../../util/updatePrices";
import { githubSecret } from "./../config";

export default function handler(req, res) {
	try {
		const { ACTION_KEY } = req.headers.authorization.split(" ")[1];
		if (ACTION_KEY === githubSecret) {
			updatePrices();
			res.status(200).json({ success: "true" });
		} else {
			res.status(401).json({ success: "false" });
		}
	} catch (err) {
		res.status(500).json({ success: "false" });
	}
}
