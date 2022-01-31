const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');

const app = express();
const port = 3008;

let stores = JSON.parse(fs.readFileSync('../k-ruoka.json')).filter(a => a.bananaPrice != 0)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/prices', (req, res) => {
    res.json(stores.sort((a, b) => a.bananaPrice > b.bananaPrice ? 1 : -1))
});

app.listen(port);

/*
 * Banana price fetching
 */

async function sendReq(url) {
    return axios.get(url, {headers: {'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1'}})
        .then((resp) => {
            return resp.data
        })
        .catch((err) => {
            console.log(err.message)
            return -1
        })
}


async function updatePrices() {
    console.log("Refreshing prices...")

    // S-kaupat
    const sReq = await sendReq('https://cfapi.voikukka.fi/graphql?operationName=GetDeliveryAreas&variables=%7B%22brand%22%3A%22%22%2C%22onlySKaupat%22%3Atrue%2C%22postalCode%22%3A%22%22%2C%22deliveryMethod%22%3A%22PICKUP%22%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22d901eeec9cb926c461b1afa57f297ed6634eaa871750822b0d4617ed347929f6%22%7D%7D')
    if (sReq == -1|| !("data" in sReq)) return

    for (const store of sReq['data']['deliveryAreas']) {
        const bReq = await sendReq(`https://cfapi.voikukka.fi/graphql?operationName=GetProductInfoById&variables=%7B%22storeId%22%3A%22${store.storeId}%22%2C%22id%22%3A%222000503600002%22%2C%22includeAgeLimitedByAlcohol%22%3Atrue%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%226ef4387222b1a3834e3353edfec45aaa1a48f05c5fa01e4b3ea0bea211870a95%22%7D%7D`)
        if (bReq == -1 || !("data" in bReq)) continue

        const index = stores.findIndex(s => s.spotName == store.name)
        if (index >= 0) stores = stores.splice(index, 1)

        stores.push({
            "spotName": store.name,
            "name": store.store.name,
            "address": `${store.address.street}, ${store.address.postalCode} ${store.address.city}`,
            "brand": store.store.brand,
            "bananaPrice": bReq.data.product.comparisonPrice
        })
    }


    console.log("Refreshed!")
}
setInterval(updatePrices, 30*60*1000)
updatePrices()