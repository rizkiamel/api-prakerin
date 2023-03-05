//definisikan sequelize untuk mengakses index dari models
const { sequelize } = require("../models");
const jobdesk = require("../models/jobdesk");
const Op = sequelize.Sequelize.Op
//definisikan init models
var initModels = require("../models/init-models")
// initModels.initModels(sequelize);
var models =  initModels(sequelize);

var Jobdesk = models.jobdesk;
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
    const { count: totalItems, rows: jobdesk } = data
    const currentPage = page ? +page: 0
    const totalPages = Math.ceil(totalItems / limit)

    return { totalItems, jobdesk, totalPages, currentPage }
}

class JobdeskController{
    static async findAll(req, res){
        let namaJobdesk = req.query.nama
        
        var condition = namaJobdesk ? { nama_jobdesk: { [Op.like]: `%${namaJobdesk}%`} } : null

        let jobdesk = await Jobdesk.findAll({
            where: condition
        })
        if(jobdesk.length !== 0){
            res.status(200).json({status: 'ok', data: jobdesk})
        }else{
            res.status(200).json({status: 'ok', message: "Data masih kosong", data: {}})
        }
    }

    static async store(req, res){
        //data dari request
        //nama_jobdesk string
        let nama_jobdesk = req.body.nama_jobdesk
        //kuota integer
        let kuota = req.body.kuota
        //soft_delete integer
        let soft_delete = req.body.soft_delete
        //penanggung_jawab string
        let penanggung_jawab = req.body.penanggung_jawab

        try{
            const newJobdesk = await Jobdesk.create({
                nama_jobdesk, 
                kuota, 
                soft_delete,
                penanggung_jawab
            })

            res.status(201).json({status: 'created', message: "Jobdesk tersimpan", data: newJobdesk})
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
        let jobdesk = await Jobdesk.findByPk(id)
        if(jobdesk !== null){
            res.status(200).json({status: 'ok', data: jobdesk})
        }else{
            res.status(404).json({status: 'not found', message: "Jobdesk tidak ditemukan"})
        }
    }

    static async update(req, res){
        //data dari request
        //nama_jobdesk string
        let nama_jobdesk = req.body.nama_jobdesk
        //kuota integer
        let kuota = req.body.kuota
        //soft_delete integer
        let soft_delete = req.body.soft_delete
        //penanggung_jawab string
        let penanggung_jawab = req.body.penanggung_jawab

        try{
            let query = await Jobdesk.update({
                nama_jobdesk, 
                kuota, 
                soft_delete,
                penanggung_jawab
            }, {
                where:{
                    id_jobdesk:req.params.id
                }
            })
    
            res.status(200).json({status: 'ok', message: 'Jobdesk berhasil diupdate', data: query})
        }catch(eror){
            res.status(400).json({status: 'bad request', message: eror.message})
            console.log(eror.message)
        }
        
    }

    static async destroy(req, res){
        try{
            let deleteJobdesk = await Jobdesk.destroy({
                where: {
                    id_jobdesk: req.params.id
                }
            })
            if(deleteJobdesk !==0){
                res.status(200).json({status: 'ok', message: "Jobdesk berhasil dihapus"})
            }else{
                res.status(404).json({status: 'not found', message: "Jobdesk tidak ditemukan"})
            }
        }catch(eror){
            console.log(eror.message)
        }

    }

    static async paging(req, res){
        //dapetin data dari query
       const { page, size, penanggung_jawab } = req.query
       //untuk penulis
       var condition = penanggung_jawab ? { penanggung_jawab: { [Op.like]: `%${penanggung_jawab}%` } } : null

       const { limit, offset } = getPagination(page, size)
       
       try{
        let data = await Jobdesk.findAndCountAll({
            where: condition,
            limit,
            offset
        })
    
        const response = getpagingData(data, page, limit)
        res.status(200).json({status: 'ok', data: response})
       }catch(err){
        res.status(400).json({status: 'bad request', message: err.message || "Some error occured while retrieving Jobdesk"})
       }
       
    //    Buku.findAndCountAll({
    //     where: condition,
    //     limit,
    //     offset
    //    }).then(data => {
    //     const response = getpagingData(data, page, limit)
    //     res.send(response)
    //    }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occured while retrieving Buku"
    //     })
    //    })
    }
}

module.exports = JobdeskController