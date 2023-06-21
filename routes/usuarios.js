const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-jwt");
const esAdminRole = require("../middlewares/validar-role");
const {
  usuariosGet,
  usuarioPost,
  usuarioDelete,
  usuarioPut,
} = require("../controllers/usuarios");
const { esRoleValido, emailExiste, idExiste } = require("../helpers/db-validators");

const router = Router();

router.get("/",[
  validarJWT,
  esAdminRole,
 
], usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("password", "la contraseña debe tener minimo 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "El correo no es valido").isEmail(),
    check("email").custom(emailExiste),
    check("role").custom(esRoleValido), 

    validarCampos
  ],
  usuarioPost
);

router.put("/:id",[
  validarJWT,
  check("id","No es un id de mongo valido").isMongoId(),
  check("id").custom(idExiste),
  validarCampos
], usuarioPut);

router.delete("/:id",[
  validarJWT,
  esAdminRole,
  check("id","No es un id de mongo valido").isMongoId(),
  check("id").custom(idExiste),
  validarCampos,
], usuarioDelete);


module.exports = router;
