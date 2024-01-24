require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.13lfhki.mongodb.net/?retryWrites=true&w=majority`;
// mongoose.connect(uri,{
//   useNewUrlParser: true
// }).then(()=>{
//   console.log("Connected to database");
// }).catch((error)=>{
//   console.log(error);
// })

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
    // await client.connect();
    const userCollection = client.db("houseHunterDB").collection("users");
    const houseCollection = client.db("houseHunterDB").collection("house");
    const bookingCollection = client.db("houseHunterDB").collection("bookings");

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
    app.get('/house/:id', async(req, res)=>{
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const result = await houseCollection.findOne(filter)
      res.send(result)
    })
    
    app.post('/house', async(req, res)=>{
      const house = req.body
      const result = await houseCollection.insertOne(house)
      res.send(result)
    })

    app.patch('/house/:id', async(req, res) =>{
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true}
      const updatedProducts = req.body
      const updateDoc = {
          $set:{

            name:updatedProducts.name, 
            description:updatedProducts.description,
            city:updatedProducts.city, 
            image:updatedProducts.image, 
            bedrooms:updatedProducts.bedrooms, 
            bathroom:updatedProducts.bathroom,
            size:updatedProducts.size,
            rent:updatedProducts.rent,
            phoneNumber:updatedProducts.phoneNumber,
            date:updatedProducts.date,
            email:updatedProducts.email,
          }
      } 
      const result = await houseCollection.updateOne(filter, updateDoc, options)
      res.send(result)

    })

    app.delete('/house/:id', async(req, res)=>{
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const result = await houseCollection.deleteOne(filter)
      res.send(result)
    })
    

    // user
    app.get('/users/:email', async(req, res)=>{
      const email = req.params.email
      const filter = {email: email}
      const result = await userCollection.findOne(filter)
      res.send(result)
    })

    app.post('/users', async(req, res)=>{
      const user = req.body
      const query = {email: user.email}
      const existingUser = await userCollection.findOne(query)
      if(existingUser){
        return res.send({error: 'user already exists'})
      }
      
      const result = await userCollection.insertOne(user)
      res.send(result)
    })
    
    app.get('/users/owner/:email', verifyToken, async(req, res)=>{
      const email = req.params.email
      if(email !== req.decoded.email){
        return res.status(403).send({message: 'Unauthorized'})
      }
      const query = {email: email}
      const user = await userCollection.findOne(query)
      let owner = false
      if(user){
        owner = user?.role === 'owner'
      }
      res.send({owner});
    })

    app.get('/users/renter/:email', verifyToken, async(req, res)=>{
      const email = req.params.email
      if(email !== req.decoded.email){
        return res.status(403).send({message: 'Unauthorized'})
      }
      const query = {email: email}
      const user = await userCollection.findOne(query)
      let renter = false
      if(user){
        renter = user?.role === 'renter'
      }
      res.send({renter});
    })

    // Bookings
    app.get('/bookings', async(req, res)=>{
      const result = await bookingCollection.find().toArray()
      res.send(result)
    })
    app.post('/bookings', async(req, res)=>{
      const house = req.body
      const result = await bookingCollection.insertOne(house)
      res.send(result)
    })
    app.delete('/bookings/:id', async(req, res)=>{
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const result = await bookingCollection.deleteOne(filter)
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




