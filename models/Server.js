const express = require("express");
const cors = require('cors')
const {dbConnection} = require ("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.port =process.env.PORT
    this.usuariosPath ="/api/usuarios"
    this.authPath ="/api/auth"
    this.categoriasPath ="/api/categorias"
    this.productosPath ="/api/productos"
    this.vendidosPath ="/api/masvendidos"
    //conectar db
    this.conectarDb();
    
    // middlewares
    this.middleware();

     // rutas
     this.routes();
    }
    //conectar bd
   async conectarDb(){
      await dbConnection();
    }
  
  middleware() {
    //cors
    this.app.use(cors())
    // leer el body
    this.app.use(express.json());
  }
  routes() {
this.app.use(this.usuariosPath, require("../routes/usuarios"))
this.app.use(this.authPath, require("../routes/auth"))
this.app.use(this.categoriasPath, require("../routes/categorias"))
this.app.use(this.productosPath, require("../routes/productos"))
this.app.use(this.vendidosPath, require("../routes/vendidos"))
  
    

  }
  listen(){
    this.app.listen(this.port,()=>{
        console.log("Servidor online en puerto", this.port)
    })
  }
}

module.exports = Server;
