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
router.post("/update/:id",async(req,res)=>{
  const task = new Task(req.body);
  console.log(task);
  task.update()
  .then((res)=>{
    console.log('exito',res);
  })
  // const {id,title,description}=req.params;
  // console.log(id,title,description);
  // await Task.update({
  //   title,
  //   description
  // });
  // await task.save();
  // res.redirect('/');
  res.send('ok')
})
module.exports = router;
