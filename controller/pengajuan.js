//definisikan sequelize untuk mengakses index dari models
const { sequelize } = require("../models");
const pengajuan = require("../models/pengajuan");
const Op = sequelize.Sequelize.Op
//definisikan init models
var initModels = require("../models/init-models")
// initModels.initModels(sequelize);
var models =  initModels(sequelize);

var Pengajuan = models.pengajuan;
// var Agenda = require('../models/agenda')(sequelize, DataTypes);
var path = require('path');
var nodemailer = require('nodemailer')
var dotenv = require('dotenv')
//get config vars
dotenv.config();

//pagination default
const getPagination = (page, size) => {
    const limit = size ? +size: 3
    const offset = page ? page*limit: 0

    return { limit, offset }
}

//pagination at the response
const getpagingData = (data, page, limit) => {
    //buku masih belum nampil
    const { count: totalItems, rows: pengajuan } = data
    const currentPage = page ? +page: 0
    const totalPages = Math.ceil(totalItems / limit)

    return { totalItems, pengajuan, totalPages, currentPage }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
})

class PengajuanController {
    static async findAll(req, res){
        let namaPengajuan = req.query.nama
        
        var condition = namaPengajuan ? { nama: { [Op.like]: `%${namaPengajuan}%`} } : null

        let pengajuan = await Pengajuan.findAll({
            where: condition
        })
        if(pengajuan.length !== 0){
            res.status(200).json({status: 'ok', data: pengajuan})
        }else{
            res.status(200).json({status: 'ok', message: "Data masih kosong", data: {}})
        }
    }

    static async store(req, res){
        // console.log(req.files['dokumen_validasi'][0].path)
        // console.log(req.files['curriculum_vitae'][0].path)
        //data dari request
        //nama string
        let nama = req.body.nama
        //tgl_lahir date
        let tgl_lahir = req.body.tgl_lahir
        //jenis_kelamin char
        let jenis_kelamin = req.body.jenis_kelamin
        //tingkat_pendidikan int
        let tingkat_pendidikan = req.body.tingkat_pendidikan
        //email string
        let email = req.body.email
        //no_telp string
        let no_telp = req.body.no_telp
        //soft_delete int default
        let soft_delete = req.body.soft_delete
        //referral_id uuid
        let referral_id = req.body.referral_id
        //jenis_tingkat_pendidikan int
        let jenis_tingkat_pendidikan = req.body.jenis_tingkat_pendidikan
        //status_approval int default
        let status_approval = req.body.status_approval
        //approved_by uuid
        let approved_by = req.body.approved_by
        //target_jobdesk uuid
        let target_jobdesk = req.body.target_jobdesk
        //nomor_induk_instansi string
        let nomor_induk_instansi = req.body.nomor_induk_instansi

        if(!req.files['dokumen_validasi']){
            return res.status(400).json({status: 'bad request', message: 'dokumen_validasi tidak boleh kosong dan berupa file pdf'})
        }
        //dokumen_validasi text
        let dokumen_validasi = req.files['dokumen_validasi'][0].filename
        //let dokumen_validasi = req.body.dokumen_validasi
        //nama_pembimbing string
        let nama_pembimbing = req.body.nama_pembimbing
        //nip_pembimbing char
        let nip_pembimbing = req.body.nip_pembimbing
        //kontak_pembimbing char
        let kontak_pembimbing = req.body.kontak_pembimbing
        //nama_instansi string
        let nama_instansi = req.body.nama_instansi
        if(!req.files['curriculum_vitae']){
            return res.status(400).json({status: 'bad request', message: 'curriculum_vitae tidak boleh kosong dan berupa file pdf'})
        }
        //curriculum_vitae text
        let curriculum_vitae = req.files['curriculum_vitae'][0].filename
        //let curriculum_vitae = req.body.curriculum_vitae

        try{
            const newPengajuan = await Pengajuan.create({
                nama, 
                tgl_lahir, 
                jenis_kelamin, 
                tingkat_pendidikan, 
                email,
                no_telp,
                soft_delete,
                referral_id,
                jenis_tingkat_pendidikan,
                status_approval,
                approved_by,
                target_jobdesk,
                nomor_induk_instansi,
                dokumen_validasi,
                nama_pembimbing,
                nip_pembimbing,
                kontak_pembimbing,
                nama_instansi,
                curriculum_vitae    
            })

            res.status(201).json({status: 'created', message: "Pengajuan tersimpan", data: newPengajuan})
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
        let pengajuan = await Pengajuan.findByPk(id)
        if(pengajuan !== null){
            console.log(pengajuan.dokumen_validasi)
            res.status(200).json({status: 'ok', data: pengajuan})
        }else{
            res.status(404).json({status: 'not found', message: "Pengajuan tidak ditemukan"})
        }
    }

    static async update(req, res){
        // console.log(req.files['dokumen_validasi'][0].path)
        // console.log(req.files['curriculum_vitae'][0].path)
        //data dari request
        //nama string
        let nama = req.body.nama
        //tgl_lahir date
        let tgl_lahir = req.body.tgl_lahir
        //jenis_kelamin char
        let jenis_kelamin = req.body.jenis_kelamin
        //tingkat_pendidikan int
        let tingkat_pendidikan = req.body.tingkat_pendidikan
        //email string
        let email = req.body.email
        //no_telp string
        let no_telp = req.body.no_telp
        //soft_delete int default
        let soft_delete = req.body.soft_delete
        //referral_id uuid
        let referral_id = req.body.referral_id
        //jenis_tingkat_pendidikan int
        let jenis_tingkat_pendidikan = req.body.jenis_tingkat_pendidikan
        //status_approval int default
        let status_approval = req.body.status_approval
        //approved_by uuid
        let approved_by = req.body.approved_by
        //target_jobdesk uuid
        let target_jobdesk = req.body.target_jobdesk
        //nomor_induk_instansi string
        let nomor_induk_instansi = req.body.nomor_induk_instansi
        
        let dokumen_validasi = req.body.dokumen_validasi
        //dokumen_validasi text
        //let dokumen_validasi = req.files['dokumen_validasi'][0].filename
        //nama_pembimbing string
        let nama_pembimbing = req.body.nama_pembimbing
        //nip_pembimbing char
        let nip_pembimbing = req.body.nip_pembimbing
        //kontak_pembimbing char
        let kontak_pembimbing = req.body.kontak_pembimbing
        //nama_instansi string
        let nama_instansi = req.body.nama_instansi
        //curriculum_vitae text
        let curriculum_vitae = req.body.curriculum_vitae
        //let curriculum_vitae = req.files['curriculum_vitae'][0].filename

        try{
            let query = await Pengajuan.update({
                nama, 
                tgl_lahir, 
                jenis_kelamin, 
                tingkat_pendidikan, 
                email,
                no_telp,
                target_jobdesk,
                nomor_induk_instansi,
                dokumen_validasi,
                nama_pembimbing,
                nip_pembimbing,
                kontak_pembimbing,
                nama_instansi,
                curriculum_vitae,
                soft_delete,
                referral_id,
                jenis_tingkat_pendidikan,
                status_approval,
                approved_by,  
            }, {
                where:{
                    id_pengajuan:req.params.id
                }
            })
    
            res.status(200).json({status: 'ok', message: 'Pengajuan berhasil diupdate', data: query})
        }catch(eror){
            res.status(400).json({status: 'bad request', message: eror.message})
            console.log(eror.message)
        }
        
    }

    static async destroy(req, res){
        try{
            let deletePengajuan = await Pengajuan.destroy({
                where: {
                    id_pengajuan: req.params.id
                }
            })
            if(deletePengajuan !==0){
                res.status(200).json({status: 'ok', message: "Pengajuan berhasil dihapus"})
            }else{
                res.status(404).json({status: 'not found', message: "Pengajuan tidak ditemukan"})
            }
        }catch(eror){
            console.log(eror.message)
        }

    }

    static async paging(req, res){
        //dapetin data dari query
       const { page, size, jenis_kelamin } = req.query
       //untuk penulis
       var condition = jenis_kelamin ? { jenis_kelamin: { [Op.like]: `%${jenis_kelamin}%` } } : null

       const { limit, offset } = getPagination(page, size)
       
       try{
        let data = await Pengajuan.findAndCountAll({
            where: condition,
            limit,
            offset
        })
    
        const response = getpagingData(data, page, limit)
        res.status(200).json({status: 'ok', data: response})
       }catch(err){
        res.status(400).json({status: 'bad request', message: err.message || "Some error occured while retrieving Pengajuan"})
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

module.exports = PengajuanController