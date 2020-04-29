const express =require("express")
const {MongoClient,ObjectID} = require("mongodb")
const assert= require("assert")
const app=express()
app.use(express.json())

const mongoURI="mongodb+srv://nour:nour198800@cluster0-8bamv.mongodb.net/test?retryWrites=true&w=majority"
 const database="contact-list"



 MongoClient.connect(mongoURI,{ useUnifiedTopology: true },(err,client)=>{
  assert.equal(err,null,'database connect failed')
  const db=client.db(database)
//addcontact
app.post('/add_contact',(req,res)=>{
    let newContact=req.body
    db.collection("contacts").insertOne(newContact,(err,data)=>{
        if(err) res.send("can't add contacts")
        else res.send("contact added")
    }) 
    })
    //geting contact
    app.get('/contacts',(req,res)=>{
        db.collection('contacts').find().toArray((err,data)=>{
            if (err) res.send("can't fetch contacts")
              else res.send(data)   
        })
    })
    //delete contact
    app.delete('/delete/:id',(req,res)=>{
        let del= ObjectID(req.params.id)
        db.collection("contacts").findOneAndDelete({_id:del},(err,data)=>{
            if(err) res.send("can't delete contacts")
            else res.send("contact was deleted")
        })
    })
    //modifier contact
    app.put('/modify/:id',(req,res)=>{
        let modifier= ObjectID(req.params.id)
        
        db.collection('contacts').findOneAndUpdate({_id:modifier},{$set:{...req.body}},(err,data)=>{
            if (err) res.send("can't modify contact")
            else res.send(data) 
        })
    })
 })



const port=process.env.Port||5000
app.listen(port,(err)=>{
    err?console.log("cannot connect"):console.log(`server is running on port ${port}`);
    
    
})