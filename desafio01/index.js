const express = require('express');
const server = express();
server.use(express.json());

//{ id: "1", title: 'Novo projeto', tasks: [] };
var projects = [];

//Return -1 if not exist
function exist(id){
  let index = -1;
  let ok = false;
  
  //FIXME - Está retornando o index errado quando o array está fora de ordem.
  projects.map((project)=>{
    index++;
    if (project.id === id){
      ok = true;
      return;
    }
  })

  if (ok){
    return index;
  }
  
  return -1;
}

// MIDDLEWARE
function mdlCheckProject(req, res, next) {
  let { id } = req.params;

  req.index = exist(id);
  req.project = projects[req.index];
  
  next();
}




//ADD project
server.post('/projects',  (req, res) => {
  let { id, title } = req.body;
  
  if (exist(id)!==-1){
    return res.status(400).json({ error: '400 - Project Already Exist!' });
  }
  
  let project = { "id": id, "title": title, tasks: [] }
  projects.push(project);

  return res.json(project);
});

//GET ALL projects
server.get('/projects', (req, res) => {
  return res.json(projects);
});

//Update project 
server.put('/projects/:id', mdlCheckProject, (req, res) => {
  
  if (!req.project) {
    return res.status(404).json({ error: '404 - Project Not founded!' });
  }

  projects[req.index].title = req.body.title;
  return res.json(projects[req.index]);
});


//GET project by ID
server.get('/projects/:id',mdlCheckProject, (req, res) => {
  if (!req.project) {
    return res.status(404).json({ error: '404 - Project Not founded!' });
  }

  return res.json(projects[req.index]);
});

//Delete project
server.delete('/projects/:id',mdlCheckProject, (req, res) => {
  if (!req.project) {
    return res.status(404).json({ error: '404 - Project Not founded!' });
  }else {
    projects.splice(req.index,1);
    return res.status(200).json({ message: '200 - OK Project removed!' });
  }
  
});



//ADD Task to a project
server.post('/projects/:id/tasks', (req, res) => {
  //TODO PUT YOUR CODE HERE
  return null;
});

server.listen(3001);