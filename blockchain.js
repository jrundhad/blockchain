const sha256 = require('crypto-js/sha256');
const SHA256 = require('crypto-js/sha256');

class transaction {
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash(){
        return sha256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(sighningkey){
        if(sighningkey).getPublic('hex')!== this.fromAddress){
            throw new console.error('you cannot sign transaction for wallets that are not yours');
        }
        
        const hashTx = this.calculateHash();
        const sig = sighningkey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
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
        this.difficulty = 2;
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
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log("Block has been mined");
        this.chain.push(block);

        this.pendingTransactions =  [ new transaction(null, miningRewardAdrress, this.miningReward)]

    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }
     getBalance(address){
         let balance = 0;

         for(const block of this.chain){
             for(const transaction of block.data){
                 if(transaction.fromAddress === address){
                     balance = balance - transaction.amount;
                 }
                 if(transaction.toAddress === address){
                     balance = balance + transaction.amount;
                 }
             }
         }
         return balance
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

module.exports.BlockChain = BlockChain;
module.exports.transaction = transaction;