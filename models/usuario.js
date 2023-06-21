const {Schema,  model} = require("mongoose");

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required:[true,"el nombre es obligatorio"]
    },
    email:{
        type: String,
        required:[true,"el correo es obligatorio"],
        unique: true
    },
    password:{
        type: String,
        required:[true,"la contraseña es obligatoria"]
    },
   
   role: {
            type: String,
            enum: ["ADMIN_ROLE", "USER_ROLE"], 
            default: "USER_ROLE",
          },

    estado:{
        type:Boolean,
        default:true
    }
});

UsuarioSchema.methods.toJSON = function(){
    const {__v,password,_id,...usuario} = this.toObject();
    usuario.userId =_id;
    return usuario;
}

module.exports = model("Usuario",UsuarioSchema);
