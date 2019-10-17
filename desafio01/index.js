const express = require('express');
const server = express();
server.use(express.json());

server.use(mdlLog);
//{ id: "1", title: 'Novo projeto', tasks: [] };
var projects = [];


const reqLog = new Map(); 
                              
              

//Return -1 if not exist
function exist(id) {

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    if (project.id === id) {

      return i;
    }
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


//Middleware LOG - Store the KEY ( METHOD:${req.method} ->  URL:${req.url} )  
//and VALUE () on MAPTABLE
function mdlLog(req, res, next) {
  var start = Date.now();
  
  let keyLog = `METHOD:${req.method} ->  URL:${req.url}`

  next();
  
  var time = Date.now() - start;

  let objLog = reqLog.get(keyLog);
  if (objLog){
    objLog.count++;
    objLog.timeAverage =  (objLog.timeAverage + time)/objLog.count;  
  }else{
    //IF FIRST TIME
    reqLog.set(keyLog,{"count": 1, "timeAverage": time});
  }
  
}



//GET logs 
server.get('/logs', (req, res) => {
  return res.json(Array.from(reqLog));
});



//ADD project
server.post('/projects', (req, res) => {
  let { id, title } = req.body;

  if (exist(id) !== -1) {
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
server.get('/projects/:id', mdlCheckProject, (req, res) => {
  if (!req.project) {
    return res.status(404).json({ error: '404 - Project Not founded!' });
  }

  return res.json(projects[req.index]);
});

//Delete project
server.delete('/projects/:id', mdlCheckProject, (req, res) => {
  if (!req.project) {
    return res.status(404).json({ error: '404 - Project Not founded!' });
  } else {
    projects.splice(req.index, 1);
    return res.status(200).json({ message: '200 - OK Project removed!' });
  }

});



//ADD Task to a project
server.post('/projects/:id/tasks', mdlCheckProject, (req, res) => {
  if (!req.project) {
    return res.status(404).json({ error: '404 - Project Not founded!' });
  }

  let project = projects[req.index]; 
  project.tasks.push (req.body.task);
  return res.json(project);

});

server.listen(3001);