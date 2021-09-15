const SHA256 = require('crypto-js/sha256');

class transactions {
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}



class Block{
    constructor(timestamp, transactions, previoushash = ''){
        this.timestamp = timestamp;
        this.data = transactions;
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
        this.pendingTransactions = [];
        this.miningReward = 100;
        }

    createGenesisBlock(){
        return new Block( "13/9/21", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    minePendingtransactions(miningRewardAdrress){
        

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