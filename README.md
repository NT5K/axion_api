
# <a href="https://axion.network">axion.network</a>
git clone
`https://github.com/NT5K/axion_api.git` <br>
## dependencies 
node <br>
express<br>
web3<bf>



## endpoints
### html endpoint
<a href="https://axion-circulating-supply-api.herokuapp.com/circulating" target='_blank'>`/circulating`</a><br>
### json endpoint
<a href="https://axion-circulating-supply-api.herokuapp.com/circulating/json" target='_blank'>`/circulating/json`</a>


## circulating supply web3 call
```
router.get('/circulating/json', (__, res) => {
    contract.methods.totalSupply().call((__, totalSupply) => {
        contract.methods.balanceOf(devWallet).call((__, devBalance) => {
            res.send({
                circulatingSupply: (totalSupply - devBalance) / decimals
            })
        })
    })
})
```
