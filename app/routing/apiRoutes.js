
const express = require('express');
const router = express.Router();
const Web3 = require("web3")
const axios = require("axios")
require('dotenv').config()


// hardcoded infura url but you can easily add the api key to the .env file like below
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/1209a87da88d49e4b201ed55bc6761f6'))
// const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/" + process.env.INFURA_KEY))

// import abi from separate file
const { abi } = require('./../public/javascript/abi');

// main contract address
const address = "0x7D85e23014F84E6E21d5663aCD8751bEF3562352" 

const contract = new web3.eth.Contract(abi, address)

// dev wallet address
const devWallet = "0xe8b283b606a212d82036f74f88177375125440f6"

// 18 decimal places
const decimals = 1e18

const priceURL = 'https://api.coingecko.com/api/v3/simple/price?ids=axion&vs_currencies=usd';


// web3 call to axion contract for total supply and dev wallet balance and calculated circulating supply
// front end display request in index.html
router.get('/circulating/json', (__, res) => {
    contract.methods.totalSupply().call((__, totalSupply) => {
        contract.methods.balanceOf(devWallet).call((__, devBalance) => {
            res.send({
                circulatingSupply: (totalSupply - devBalance) / decimals
            })
        })
    })
})

router.get('/price', (__, res) => {
    axios.get(priceURL).then(function (response) {
        const { usd } = response.data.axion
        console.log(response)
        res.send({
            currentPrice: usd
        })
    })
});

router.get('/marketcap', (__, res) => {
    contract.methods.totalSupply().call((__, totalSupply) => {
        contract.methods.balanceOf(devWallet).call((__, devBalance) => {
            axios.get(priceURL).then(function (response) {
                const { usd } = response.data.axion
                const circ = (totalSupply - devBalance) / decimals
                console.log(typeof(circ))
                res.send({
                    circulatingSupply: circ,
                    price: usd,
                    marketCap: circ * usd
                })
            })
        })
    })
});

module.exports = router;