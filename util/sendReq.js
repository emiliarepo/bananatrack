import axios from "axios";

export default async function sendReq(url) {
	return axios
		.get(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1",
			},
		})
		.then((resp) => {
			return resp.data;
		})
		.catch((err) => {
			console.log(err.message);
			return -1;
		});
}
