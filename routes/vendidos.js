const {Router} = require("express");
const {check} = require("express-validator");
const { obtenerVendidos, obtenerVendido, vendidosPost, actualizarVendido, borrarVendido } = require("../controllers/vendidos");
const { validarCampos } = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-jwt");
const esAdminRole = require("../middlewares/validar-role");
const { vendidoExiste } = require("../helpers/db-validators");



const router = Router()

router.get("/",obtenerVendidos)

router.get("/:id",[
        check("id","El id no es valido").isMongoId(),
        check("id").custom(vendidoExiste),
        validarCampos
],obtenerVendido)

router.post("/",[
    validarJWT,
    esAdminRole,
    check("nombre","El nombre es obligatorio").notEmpty(),
    check("categoria","La categoria es obligatoria").notEmpty(),
    validarCampos
],vendidosPost)

router.put("/:id",[
    validarJWT,
    esAdminRole,
    check("id","El id no es valido").isMongoId(),
        check("id").custom(vendidoExiste),
        validarCampos,
],actualizarVendido)

router.delete("/:id",[
    validarJWT,
    esAdminRole,
    check("id","El id no es valido").isMongoId(),
        check("id").custom(vendidoExiste),
        validarCampos,
],borrarVendido)

module.exports = router;
