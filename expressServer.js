const express = require('express')
const mongoose = require('mongoose')
const { ObjectId } = require("mongodb");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const app = express()
const port = 3000
dotenv.config();


console.log(process.env.jwt_secret);

app.use(express.json());
app.use(express.urlencoded({extended: true}));


let uri = 'mongodb://127.0.0.1:27017/destinations';
mongoose.connect(uri).catch(err => console.log(err));

const Destination = require('./schemas/destination')
const User = require('./schemas/user')

app.get('/destinations/:destinationId', async (req, res) => {
    console.log(req.params.destinationId);
    
    res.status(200).send('Hello World! We learn Express')
})  

app.get('/destinations', async (req, res) => {
    Destination.find({}).then(result => {
        console.log(result);
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });


    // const result = await tdCollection.find().toArray();
    // console.log(result);
    // res.status(200).json(result);
})
 // change
// this is for creating new destinations.
app.post('/destinations', (req, res) => {
    const insertedDestination = new Destination({
        country: req.body.country,
        title: req.body.title
    })
    
    insertedDestination.save().then(result => {
        console.log(result);
        res.status(201).json(insertedDestination)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });


    // res.status(201).send("Created a destination");
})

app.put('/destinations/:id', async (req, res) => {
    console.log(req.params.id);

    await Destination.updateOne({_id: new ObjectId(req.params.id)}, req.body).then(result => {
        console.log(result);
        if (result.modifiedCount === 1) {
            res.status(200).json({message: 'Success'});
        } else {
            res.status(500).json({message: 'Error'})
        }
    })
})

app.delete('/destinations/:id', (req, res) => {
    Destination.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({message: 'Success'});
    })
    
})

app.post('/auth/signup', (req, res) => {
    const insertedUser = new User({
        email: req.body.email,
        password: req.body.password
    })
    
    // Never save passwords as clear text.
    insertedUser.save().then(result => {
        console.log(result);
        res.status(201).json(insertedUser) // Remove encoded password before sending it back.
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

app.post('/auth/login', (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if (user.password === req.body.password) { // Comparing clear text passwords, for now. DONT DO THIS!!!
            const generatedToken = jwt.sign({_id: user._id}, process.env.jwt_secret);
            res.status(200).json({token: generatedToken})
        }
        res.status(401).json({message: 'Invalid login'}); // email match, but password does not!
        return;
    }).catch(error => {
        res.status(401).json({message: 'Invalid login'}); // email does not match.
    })
    
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})