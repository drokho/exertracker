const MongoClient = require('mongodb').MongoClient;
 

const uri = "mongodb://PhaseBattle:zXQag82E9aDOBpAY@cluster0-shard-00-00.wf6lc.gcp.mongodb.net:27017,cluster0-shard-00-01.wf6lc.gcp.mongodb.net:27017,cluster0-shard-00-02.wf6lc.gcp.mongodb.net:27017/test?ssl=true&replicaSet=atlas-105kjf-shard-0&authSource=admin&retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true });


async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);




