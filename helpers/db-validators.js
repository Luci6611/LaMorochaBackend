const Categoria = require("../models/categoria");
const Producto = require("../models/Producto");
const Role = require("../models/role");

const Usuario = require("../models/usuario");
const Vendidos = require("../models/vendidos");


//  validando si ROLE existe en la base de datos

const esRoleValido = async (role = "") => {
    const existeRole = await Role.findOne({ role });

    if (!existeRole) {
      throw new Error(`El rol ${role} no existe en la BD`);
    }
  }
 

 //validar si email existe
 
 const emailExiste =async(email)=>{
    
    const existeEmail = await Usuario.findOne({email});
    if (existeEmail) {
        throw new Error(`El correo ${email} ya existe en la BD`);
    };
    }


    // validar ruta put :id existe en la base de datos 
const idExiste =async(id)=>{
    
    const existeId = await Usuario.findOne({_id:id});
    if (!existeId) {
        throw new Error(`El id ${id} no existe en la Base de Datos`);
    };
    }


    // validar categoria por id
    const categoriaExiste =async(_id)=>{
    
        const existeCategoria = await Categoria.findById({_id});
        if (!existeCategoria ) {
            throw new Error(`El id ${id} no existe en la Base de Datos`);
        };
        }

        //verificar si producto existe
        const productoExiste =  async (id)=>{
            const existeProducto = await Producto.findById(id);
                if(!existeProducto){
                    throw new Error(`El producto con el id ${id} no existe en la Base de Datos`);
                }
        }

            //verificar si producto mas vendido existe
            const vendidoExiste =  async (id)=>{
                const existeVendido = await Vendidos.findById(id);
                    if(!existeVendido){
                        throw new Error(`El producto MAS VENDIDO con el id ${id} no existe en la Base de Datos`);
                    }
            }
        
    

    module.exports = {
        esRoleValido,
        emailExiste,
        idExiste,
        categoriaExiste ,
        productoExiste,
        vendidoExiste
    }