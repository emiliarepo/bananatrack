import updatePrices from "./../../util/updatePrices";
require("dotenv").config();

export default function handler(req, res) {
	try {
		const actionKey = req.headers.authorization.split(" ")[1];
		if (actionKey === process.env.GITHUB_SECRET) {
			updatePrices();
			res.status(200).json({ success: "true" });
		} else {
			res.status(401).json({ success: "false" });
		}
	} catch (err) {
		res.status(500).json({ success: "false" });
	}
}
