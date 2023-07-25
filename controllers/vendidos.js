const { request, response } = require("express");
const Vendidos = require("../models/vendidos");

//traer todos los productos paginados
const obtenerVendidos = async (req=request,res=response)=>{
    const {limite = 6, desde = 0} =req.query;
    const query ={estado:true}

    const [total ,vendidos] = await Promise.all([
        Vendidos.countDocuments(query),
        Vendidos.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .populate("categoria","nombre")
        .populate("usuario","nombre")

    ])
    res.json({
        total,
        vendidos
})

}
//traer Vendidos por id

const  obtenerVendido = async (req=request,res=response)=>{
        const {id} = req.params;

        const vendido = await Vendidos.findById(id)
        .populate("categoria","nombre")
        .populate("usuario","nombre")

        res.json({
            vendido
        })
        
}


//crear producto

const vendidosPost= async (req=request,res=response)=>{
    const {precio,categoria,descripcion,disponible,img} = req.body;
    const nombre = req.body.nombre.toUpperCase();

    const vendidosDB = await Vendidos.findOne({nombre});


    if(vendidosDB){
        return res.status(400).json({
            msg:`El producto de mas vendidos : ${vendidosDB.nombre} ya existe`
        })
    }
    //generar la data
    const data = {
        nombre,
        categoria,
        precio,
        descripcion,
        disponible,
        img,
        usuario:req.usuario._id
    };
    const vendido = new Vendidos(data)

    //guardar en base de datos
    await vendido.save()

    res.status(201).json({
        msg:"producto de mas vendidos agregado",
        vendido
    })

}

//actualizar producto
const actualizarVendido= async (req=request,res=response)=>{
    const {id} = req.params;
    const {precio,categoria,descripcion,disponible,img} = req.body;
    const usuario = req.usuario._id;

    const data ={
        precio,
        categoria,
        descripcion,
        disponible,
        img,
        usuario
    };

    if(req.body.nombre){
        data.nombre =req.body.nombre.toUpperCase();
    }

    const vendido = await Vendidos.findByIdAndUpdate(id,data,{new:true});

    res.status(200).json({
        msg:"producto de mas vendidos actualizado correctamente",
        vendido


    })


}

//inactivar producto
const borrarVendido= async (req=request,res=response)=>{
    const {id} = req.params;

    const vendidoBorrado = await Vendidos.findByIdAndDelete(id)

res.json({
    msg:"producto de mas vendidos borrado correctamente",
    vendidoBorrado
})
}

module.exports ={
    obtenerVendidos,
    obtenerVendido ,
    vendidosPost,
    actualizarVendido,
    borrarVendido
    

}