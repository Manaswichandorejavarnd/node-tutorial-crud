const express = require("express");
require("./db/conn");
const app = express();
const port = process.env.PORT || 3000;
const Tutorial = require("./models/tutorials");

app.use(express.json());

app.post("/tutorials", async(req, res)=>{
    try{
        const user = new Tutorial(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }catch(e){res.status(400).send(e);}
})


app.get("/tutorials",async(req, res)=>{
    try {
       const tutorialDb = await Tutorial.find()
       res.send(tutorialDb); 
    } catch (e) {
        res.send(e);
    }
})

//get tutorial detail seperately
app.get("/tutorials/:id",async(req, res)=>{
    try {
        const _id = req.params.id;
        const tutorialData = await Tutorial.findById(_id);

        if(!tutorialData){
            return res.status(404).send();
        }else{
            res.send(tutorialData);
        }
    } catch (e) {
        res.send(e);
    }
})

// update tutorial 
app.patch("/tutorials/:id", async (req, res)=>{
    try {
        const _id = req.params.id;
        const updateTutorials = await Tutorial.findByIdAndUpdate(_id, req.body ,{ new : true});
        res.send(updateTutorials);
    } catch (e) {
        res.status(400).send(updateTutorials);
    }
})

//delete ttutorial
app.delete("/tutorials/:id", async (req, res) =>{
    try {
        const deleteTutorial = await Tutorial.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteTutorial);
    } catch (e) {
        res.status(500).send(e);
    }
})



app.listen(port,()=>{
    console.log(`connection is setup at ${port}`);
})


        
    