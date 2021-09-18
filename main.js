const {BlockChain,transaction} = require('./blockchain')
// testing block chain
let jeetycoin = new BlockChain;
jeetycoin.createTransaction(new transaction('address 1', 'address 2', 100))
jeetycoin.createTransaction(new transaction('address 2', 'address 1', 10))

console.log('starting miner')
jeetycoin.minePendingtransactions('my address')
console.log(jeetycoin.getBalance('address 2'))
console.log(jeetycoin.getBalance('address 1'))
console.log(jeetycoin.getBalance('my address'))

//console.log('starting miner')
//jeetycoin.minePendingtransactions('my address')
//console.log(jeetycoin.getBalance('address 2'))