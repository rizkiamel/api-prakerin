//definisikan sequelize untuk mengakses index dari models
const { sequelize } = require("../models");
const instansi = require("../models/instansi");
const Op = sequelize.Sequelize.Op
//definisikan init models
var initModels = require("../models/init-models")
// initModels.initModels(sequelize);
var models =  initModels(sequelize);

var Instansi = models.instansi;
// var Agenda = require('../models/agenda')(sequelize, DataTypes);

//pagination default
const getPagination = (page, size) => {
    const limit = size ? +size: 3
    const offset = page ? page*limit: 0

    return { limit, offset }
}

//pagination at the response
const getpagingData = (data, page, limit) => {
    //buku masih belum nampil
    const { count: totalItems, rows: instansi } = data
    const currentPage = page ? +page: 0
    const totalPages = Math.ceil(totalItems / limit)

    return { totalItems, instansi, totalPages, currentPage }
}

class InstansiController{
    static async findAll(req, res){
        let namaInstansi = req.query.nama
        
        var condition = namaInstansi ? { nama: { [Op.like]: `%${namaInstansi}%`} } : null
        
        let instansi = await Instansi.findAll({
            where: condition,
        })
        
        if(instansi.length !== 0){
            res.status(200).json({status: 'ok', data: instansi})
        }else{
            res.status(200).json({status: 'ok', message: "Data masih kosong", data: {}})
        }
    }

    static async store(req, res){
        //data dari request
        //id_instansi uuid
        let id_instansi = req.body.id_instansi
        //nama string
        let nama = req.body.nama
        //kode_instansi string
        let kode_instansi = req.body.kode_instansi
        //alamat text
        let alamat = req.body.alamat
        //kode_pos char
        let kode_pos = req.body.kode_pos
        //website text
        let website = req.body.website

        try{
            const newInstansi = await Instansi.create({
                id_instansi,
                nama, 
                kode_instansi, 
                alamat, 
                kode_pos, 
                website
            })

            res.status(201).json({status: 'created', message: "Instansi tersimpan", data: newInstansi})
        }catch(eror){
            res.status(400).json({status: 'bad request', message: eror.message})
            console.log(eror.message)
        }
        //create
        
    }

    static async show(req, res){
        //id dari parameter
        let id = req.params.id
        //tampilkan
        let instansi = await Instansi.findByPk(id)
        if(instansi !== null){
            res.status(200).json({status: 'ok', data: instansi})
        }else{
            res.status(404).json({status: 'not found', message: "Instansi tidak ditemukan"})
        }
    }

    static async update(req, res){
        //data dari request
        //nama string
        let nama = req.body.nama
        //kode_instansi string
        let kode_instansi = req.body.kode_instansi
        //alamat text
        let alamat = req.body.alamat
        //kode_pos char
        let kode_pos = req.body.kode_pos
        //website text
        let website = req.body.website

        try{
            let query = await Instansi.update({
                nama, 
                kode_instansi, 
                alamat, 
                kode_pos, 
                website
            }, {
                where:{
                    id_instansi:req.params.id
                }
            })
    
            res.status(200).json({status: 'ok', message: 'Instansi berhasil diupdate', data: query})
        }catch(eror){
            res.status(400).json({status: 'bad request', message: eror.message})
            console.log(eror.message)
        }
        
    }

    static async destroy(req, res){
        try{
            let deleteInstansi = await Instansi.destroy({
                where: {
                    id_instansi: req.params.id
                }
            })
            if(deleteInstansi !==0){
                res.status(200).json({status: 'ok', message: "Instansi berhasil dihapus"})
            }else{
                res.status(404).json({status: 'not found', message: "Instansi tidak ditemukan"})
            }
        }catch(eror){
            console.log(eror.message)
        }

    }

    static async paging(req, res){
        //dapetin data dari query
       const { page, size, nama } = req.query
       //untuk penulis
       var condition = nama ? { nama: { [Op.like]: `%${nama}%` } } : null

       const { limit, offset } = getPagination(page, size)
       
       try{
        let data = await Instansi.findAndCountAll({
            where: condition,
            limit,
            offset
        })
    
        const response = getpagingData(data, page, limit)
        res.status(200).json({status: 'ok', data: response})
       }catch(err){
        res.status(400).json({status: 'bad request', message: err.message || "Some error occured while retrieving Instansi"})
       }
    }
}

module.exports = InstansiController