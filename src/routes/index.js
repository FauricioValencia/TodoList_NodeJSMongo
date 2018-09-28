const express = require("express");
const router = express.Router();

const Task = require("../models/task.js"); //contiene el esquema de los datos

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  // console.log(tasks);
  res.render("index",{
      tasks
  });
});

router.post("/add", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(res => {
      console.log(res);
    })
    .catch(e => {
      console.log("error", e);
    });
  res.redirect("/");
});
router .get('/turn/:id',async(req,res)=>{
    const {id}=req.params;
    const task = await Task.findById(id);
    task.status= !task.status;
    await task.save();
    res.redirect('/');

    console.log(task);
    res.send('recibido');
})
router.get("/delete/:id",async(req,res)=>{
    const {id} =req.params;
    await Task.remove({_id:id})
    res.redirect("/");

})
router.get("/update/:id",async(req,res)=>{

  const {id}=req.params;
  const task = await Task.findById(id);
  
  res.render('edit',{
    task
  })
})


router.post("/update/:id",async(req,res)=>{

  const {id}=req.params;
  await Task.update({_id:id},req.body);
  res.redirect('/');
})
module.exports = router;
