import axios from 'axios'

export const bitcoinService = {
    getRate,
    getMarketPrices,
    getConfirmedTransactions,
    getTradeVolume
}

async function getRate(coin = 'USD') {
    let rate = JSON.parse(localStorage.getItem('rate'));
    if (!rate) {
        rate = await axios.get(`https://blockchain.info/tobtc?currency=${coin}&value=1`)
        rate = rate.data
        localStorage.setItem('rate', JSON.stringify(rate));

    }
    return rate
}

async function getMarketPrices() {
    let marketPrices = JSON.parse(localStorage.getItem('marketPrices'))
    if (!marketPrices) {
        marketPrices = await axios.get('https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true')
        marketPrices = marketPrices.data
        localStorage.setItem('marketPrices', JSON.stringify(marketPrices));
    }
    return marketPrices
}

async function getConfirmedTransactions() {
    let confirmedTrans = JSON.parse(localStorage.getItem('confirmedTrans'))
    if (!confirmedTrans) {
        confirmedTrans = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=1months&format=json&cors=true')
        confirmedTrans = confirmedTrans.data
        localStorage.setItem('confirmedTrans', JSON.stringify(confirmedTrans));
    }
    return confirmedTrans
}

async function getTradeVolume() {
    let tradeVolume = JSON.parse(localStorage.getItem('tradeVolume'))
    if (!tradeVolume) {
        tradeVolume = await axios.get('https://api.blockchain.info/charts/trade-volume?timespan=1months&format=json&cors=true');
        tradeVolume = tradeVolume.data
        localStorage.setItem("tradeVolume", JSON.stringify(tradeVolume));
    }
    return tradeVolume
}