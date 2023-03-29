const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require("./models/User")

app.use(express.json())


mongoose.connect("mongodb+srv://stoicastefan14:123@cluster0.zg3vc9x.mongodb.net/istqb_platform?retryWrites=true&w=majority").then(console.log("connected"))


app.get('/users', async (req, res) => {
    users = await User.find({})
    res.json(users)
})

app.post('/users', async (req, res) => {
  const user = await User.findOne({name: req.body.name})
  console.log(user)
  if (user === null) {
    try{
      const user = await User.findOne({email: req.body.email})
      if (user === null) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const new_user = new User({name: req.body.name, email: req.body.email, password: hashedPassword})
        new_user.save() 
        res.status(201).send()
      } else {
        return res.status(400).send('Email already used')
      }
    } catch {
        res.status(500).send()
    }
    
  } else {
    return res.status(400).send('User already exists')
  }
    
})

app.post('/users/login', async (req, res) => {
    const user = await User.findOne({name: req.body.name})
    console.log(user)

    if (user == null) {
      return res.status(400).send('Cannot find user')
    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        res.send('Success')
      } else {
        res.send('Not Allowed')
      }
    } catch {
      res.status(500).send()
    }
})



app.listen(3000)