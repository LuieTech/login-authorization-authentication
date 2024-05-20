const createError = require("http-errors")
const TaskGroup = require("../models/task-group.model")
const Task = require("../models/task.model");

module.exports.list = (req, res, next) => {

  //todo filters

  Task.find()
  .populate("group")
    .then(tasks => {

      if(tasks.length === 0) res.status(404).json( "No tasks found" )
      
      else res.json(tasks)

    })
    .catch(error => next(error))

}

module.exports.detail = (req, res, next) => {

  Task.findById(req.params.id)
    .then(task => {
      if(!task) {
        next(createError(404, "Task not found"));
      }
      res.status(200).json(task);
    })
    .catch(error => next(error))
}

module.exports.create = (req, res, next) => {

 // /task-groups/:groupId/tasks

  TaskGroup.findById(req.body.group)
    .then((group) => {
      if(!group) {
        next(createError(404, "Task group not found"))
        return;
      } else {
        // task = {... req.body, group: group.id} => option 2
        // req.body.group = group.id => when groupId comes in req.params
        //but now we are receiving the groupId alredy in the body "req.body.group"
        return Task.create(req.body)
      }
    })
    .then((task) => res.status(201).json(task)) //always return the task created for inmediate further moves
    .catch(error => {
      console.log(error)
      next(error)
    })
    

}

module.exports.update = (req, res, next) => {
  //don't use findByIdAndUpdate for updating Users because of the password 
  Task.findByIdAndUpdate(req.params.id, req.body,
    { runValidators: true, 
      new: true 
    }) //runValidators to execute mongoose validators & new:true to return the updated document
    .then(task => {
      if(task){
        res.json(task);
      } else {
        next(createError(404, "Cannot edit non-existance Task"))
      }
    })
    .catch(error => next(error))

}

module.exports.delete = (req, res, next) => {

  Task.findByIdAndDelete(req.params.id)
    .then((task) => {
      if(!task) next(createError(404, "Task not found"))
      res.status(204).send();
    })
    .catch(error => next(error))

}

