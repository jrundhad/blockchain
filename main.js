const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previoushash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data)+ this.nonce).toString();
    }
    
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
            this.nonce = this.nonce + 1;
            this.hash = this.calculateHash();
        }
        console.log("Block has been mined the hash is:" +  this.hash)
    }

}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()] ;
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0, "13/9/21", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock( newBlock){
        newBlock.previoushash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    verifyChain(){
        for (let i=1 ; i<this.chain.length ; i++){
            const currentBlock = this.chain[i];
            const prevBlock =  this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previoushash !== prevBlock.hash){
                return false;
            }
        }
        return true;
    }
}
// testing block chain
let jeetycoin = new BlockChain;
console.log("mining block 1")
jeetycoin.addBlock(new Block(1,"13/9/21",{amount: 400}));
console.log("mining block 2 ")
jeetycoin.addBlock(new Block(2,"14/9/21",{amount: 40}));

// printing block chain
//console.log("Is Block Chain Valid: "+jeetycoin.verifyChain());
//console.log(JSON.stringify(jeetycoin, null, 4));

//tampering block chanin and checking validity 
//jeetycoin.chain[1].data = {amount:40};
//jeetycoin.chain[1].hash = jeetycoin.chain[1].calculateHash;
console.log("Is Block Chain Valid: "+jeetycoin.verifyChain());