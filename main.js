const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previoushash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data)).toString();
    }


}

class BlockChain{
    constructor(){
        this.chain = [this.crateGenesisBlock()] ;
    }

    crateGenesisBlock(){
        return new Block(0, "13/9/21", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock( newBlock){
        newBlock.previoushash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
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

let jeetycoin = new BlockChain;
jeetycoin.addBlock(new Block(1,"13/9/21",{amount: 4}));
jeetycoin.addBlock(new Block(2,"14/9/21",{amount: 40}));

console.log("Is Block Chain Valid: "+jeetycoin.verifyChain());
console.log(JSON.stringify(jeetycoin, null, 4));
