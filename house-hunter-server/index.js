require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.13lfhki.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const userCollection = client.db("houseHunterDB").collection("users");
    const houseCollection = client.db("houseHunterDB").collection("house");

    // middleware
    const verifyToken = (req, res, next) => {
        // console.log('inside verify Token', req.headers.authorization);
        if (!req.headers.authorization) {
          return res.status(401).send({ message: "Unauthorized " });
        }
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
          if (err) {
            return res.status(401).send({ message: "Unauthorized " });
          }
          req.decoded = decoded;
          next();
        });
      };
  
    // jwt
    app.post("/jwt", async (req, res) => {
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1h",
        });
        res.send({ token });
    });

    // house
    app.get('/house', async(req, res)=>{
      const result = await houseCollection.find().toArray()
      res.send(result)
    })
    
    app.post('/house', async(req, res)=>{
      const house = req.body
      const result = await houseCollection.insertOne(house)
      res.send(result)
    })
    

    


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("House Hunter App Running...!");
});
  
app.listen(port, () => {
    console.log(`House Hunter App Running on port ${port}`);
});
