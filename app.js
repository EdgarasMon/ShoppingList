var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
const { error } = require('console');

const {MongoClient} = require('mongodb');
/**
* Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
* See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
*/
async function main(){
/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const uri = "mongodb+srv://Edga:a123456@cluster0.ffj8h.mongodb.net/";


const client = new MongoClient(uri);

try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await  listDatabases(client);

} catch (e) {
    console.error(e);
} finally {
    await client.close();
}
}

main().catch(console.error);

async function listDatabases(client){
databasesList = await client.db().admin().listDatabases();

console.log("Databases:");
databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


router.post('/insert', function(req, res, next) {
var item = {
    first: req.body.first,
    second: req.body.second
};
mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('List').insertOne(item, function(err, result) {
        assert.equal(null, error);
        console.log("Item inserted");
        db.close();
    })
});
res.redirect("/");
});

var item = {
    first: "123"
}


MongoClient.connect('mongodb+srv://Edga:a123456@cluster0.ffj8h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function (err, client) {
  if (err) throw err;

  var db = client.db('ShoppingList');

  db.collection('List').insertOne(item, function (findErr, result) {
    if (findErr) throw findErr;
    //console.log(result.name);
    client.close();
  });
}); 