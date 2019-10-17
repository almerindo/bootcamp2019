const express = require('express');
const routes = require('./routes');

class App {
  constructor() {
    this.server = express();
  }

  middlewares(){

  }

  routes(){
    this.server.use(routes);
  }

}