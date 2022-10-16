const express = require('express')
const app = express();
require('dotenv').config()
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// mongo db uri link 
// const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.9s03guz.mongodb.net/?retryWrites=true&w=majority`;
const uri = "mongodb+srv://admin-doctors-portals:nhXJj9nhAmXylZZ5@cluster0.9s03guz.mongodb.net/?retryWrites=true&w=majority";


// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();
        // console.log("db connected");
        const servicesCollection = client.db('doctors_portals').collection('services');

        app.get('/service', async(req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
    }
    finally{

    }
}



app.get('/', (req, res) => {
  res.send('istiak istiak')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// Call to run mongodb fuction 
run().catch(console.dir);