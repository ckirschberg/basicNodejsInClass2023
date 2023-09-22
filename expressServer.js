const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));


let uri = 'mongodb://127.0.0.1:27017';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);
const db = client.db("destinations2"); // Change this to match your database name
const tdCollection = db.collection("destinations") // change this to match your collection name

app.get('/destinations/:destinationId', async (req, res) => {
    console.log(req.params.destinationId);
    
    res.status(200).send('Hello World! We learn Express')
})  

app.get('/destinations', async (req, res) => {
    const result = await tdCollection.find().toArray();
    console.log(result);
    res.status(200).json(result);
})

// this is for creating new destinations.
app.post('/destinations', (req, res) => {
    console.log(req.body);
    res.status(201).send("Created a destination");
})

app.put('/destinations/:id', (req, res) => {
    console.log(req.params.id);
    res.status(200).send("Updated destination")
})

app.delete('/destinations/:id', (req, res) => {
    console.log(req.params.id);
    res.status(204).end();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})