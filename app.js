var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//morgan untuk pencatatan logger selama server berjalan
var logger = require('morgan');
//dotenv, to bring data in env to node js file
var dotenv = require('dotenv')
var cors = require('cors');
var fs = require('fs')
var nodemailer = require('nodemailer')

//routes
var indexRouter = require('./routes/index');
var pengajuanRouter = require('./routes/pengajuan');
var instansiRouter = require('./routes/instansi');
var jobdeskRouter = require('./routes/jobdesk');

//pengajuan
//definisikan sequelize untuk mengakses index dari models
const { sequelize } = require("./models");
//definisikan init models
var initModels = require("./models/init-models")
// initModels.initModels(sequelize);
var models =  initModels(sequelize);
var Pengajuan = models.pengajuan;

var app = express();

//get config vars
dotenv.config();

//cors
app.use(cors())
app.use(function(req, res, next){
    //website allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')

    //request method you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')

    //request header you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    next()
})
//swagger
var bodyParser = require('body-parser')
var swaggerJsDoc = require('swagger-jsdoc')
var swaggerUi = require('swagger-ui-express')
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info:{
            title: "API Prakerin",
            version: "1.0.0",
            description: "Informasi API Prakerin"
        },
        servers: [
            {
                url: "http://localhost:3000/api",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "apiKey",
                    name: "Authorization",
                    in: "header",
                    description: "Masukan token dengan format 'Bearer: <TOKEN>'",
                    schema: "bearer",
                },
            },
        },
    },
    apis: ["routes/*.js","*.js"],
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
/**
 * @swagger
 * components:
 *   securitySchemas:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 */

//morgan
app.use(logger('combined'));
//cookieparser
app.use(cookieParser());
//path 
app.use(express.static(path.join(__dirname, 'public')));
//body-parser
//parsing application/x-www
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.urlencoded({ extended: true }))
//parsing application/json
app.use(express.json())
//app.use(bodyParser.json);


app.use('/', indexRouter);
app.use('/api/pengajuan', pengajuanRouter);
app.use('/api/instansi', instansiRouter);
app.use('/api/jobdesk', jobdeskRouter);
// app.use('/api/auth', authRouter);
app.use(express.static(__dirname));


//
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_MAILER,
        pass: process.env.PASS_MAILER
    }
})



/***
 * @swagger
 * /pengajuan/{id_pengajuan}/download/cv:
 *   get:
 *     tags:
 *       - Pengajuan
 *     description: Mendownload file curriculum vitae
 *     summary: Mendownload file curriculum vitae
 *     produces: application/pdf
 *     parameters:
 *       - in: path
 *         name: id_pengajuan
 *         schema: 
 *           type: string
 *           format: uuid
 *           required: true
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *               type: file
 */
app.get('/api/pengajuan/:id/download/cv', async function(req, res){
    //id dari parameter
    let id = req.params.id
    //tampilkan
    let pengajuan = await Pengajuan.findByPk(id)
    if(pengajuan !== null){
        const alamat = `${__dirname}/public/uploads/curriculum_vitae/`
        console.log(alamat)
        //res.download(alamat+pengajuan.curriculum_vitae)
        fs.readFile(alamat+pengajuan.curriculum_vitae, (err, file) => {
            if(err){
                console.log(err)
                return res.status(500).json({status: 'server error', message: "Error"})
            }
            console.log(alamat+pengajuan.curriculum_vitae)
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', 'inline; filename=cv.pdf')

            res.download(alamat+pengajuan.curriculum_vitae)
        })
    }else{
        res.status(404).json({status: 'not found', message: "Pengajuan cv tidak ditemukan"})
    }
})
/***
 * @swagger
 * /pengajuan/{id_pengajuan}/download/dokumen:
 *   get:
 *     tags:
 *       - Pengajuan
 *     description: Mendownload file dokumen validasi
 *     summary: Mendownload file dokumen validasi
 *     produces: application/pdf
 *     parameters:
 *       - in: path
 *         name: id_pengajuan
 *         schema: 
 *           type: string
 *           format: uuid
 *           required: true
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *               type: file
 */
app.get('/api/pengajuan/:id/download/dokumen', async function(req, res){
    //id dari parameter
    let id = req.params.id
    //tampilkan
    let pengajuan = await Pengajuan.findByPk(id)
    if(pengajuan !== null){
        const alamat = `${__dirname}/public/uploads/dokumen_validasi/`
        console.log(alamat)
        //res.download(alamat+pengajuan.dokumen_validasi)
        fs.readFile(alamat+pengajuan.dokumen_validasi, (err, file) => {
            if(err){
                console.log(err)
                return res.status(500).json({status: 'server error', message: "Error"})
            }
            console.log(alamat+pengajuan.dokumen_validasi)
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', 'inline; filename=dokumen_validasi.pdf')

            res.download(alamat+pengajuan.dokumen_validasi)
        })
    }else{
        res.status(404).json({status: 'not found', message: "Pengajuan dokumen validasi tidak ditemukan"})
    }
})
/***
 * @swagger
 * /pengajuan/{id_pengajuan}/view/cv:
 *   get:
 *     tags:
 *       - Pengajuan
 *     description: Menampilkan file curriculum vitae (Lebih baik menggunakan browser karena di dokumentasi ini respon nya tidak bisa ditampilkan)
 *     summary: Menampilkan file curriculum vitae (Lebih baik menggunakan browser karena di dokumentasi ini respon nya tidak bisa ditampilkan)
 *     parameters:
 *       - in: path
 *         name: id_pengajuan
 *         schema: 
 *           type: string
 *           format: uuid
 *           required: true
 *     responses:
 *       200:
 *         description: ok
 */
app.get('/api/pengajuan/:id/view/cv', async function(req, res){
    //id dari parameter
    let id = req.params.id
    //tampilkan
    let pengajuan = await Pengajuan.findByPk(id)
    if(pengajuan !== null){
        var file = fs.readFileSync(`./public/uploads/curriculum_vitae/${pengajuan.curriculum_vitae}`)
        if(file !== null){
            res.contentType("application/pdf")
            res.send(file)
        }else{
            res.status(404).json({status: 'not found', message: "Pengajuan cv tidak ditemukan"}) 
        }
    }else{
        res.status(404).json({status: 'not found', message: "Pengajuan dokumen validasi tidak ditemukan"})
    }
})
/***
 * @swagger
 * /pengajuan/{id_pengajuan}/view/dokumen:
 *   get:
 *     tags:
 *       - Pengajuan
 *     description: Menampilkan file dokumen validasi (Lebih baik menggunakan browser karena di dokumentasi ini respon nya tidak bisa ditampilkan)
 *     summary: Menampilkan file dokumen validasi (Lebih baik menggunakan browser karena di dokumentasi ini respon nya tidak bisa ditampilkan)
 *     parameters:
 *       - in: path
 *         name: id_pengajuan
 *         schema: 
 *           type: string
 *           format: uuid
 *           required: true
 *     responses:
 *       200:
 *         description: ok
 */
app.get('/api/pengajuan/:id/view/dokumen', async function(req, res){
    //id dari parameter
    let id = req.params.id
    //tampilkan
    let pengajuan = await Pengajuan.findByPk(id)
    if(pengajuan !== null){
        var file = fs.readFileSync(`./public/uploads/dokumen_validasi/${pengajuan.dokumen_validasi}`)
        if(file !== null){
            res.contentType("application/pdf")
            res.send(file)
        }else{
            res.status(404).json({status: 'not found', message: "Pengajuan dokumen validasi tidak ditemukan"}) 
        }
    }else{
        res.status(404).json({status: 'not found', message: "Pengajuan tidak ditemukan"})
    }
})

/***
 * @swagger
 * /pengajuan/{id_pengajuan}/kirimemail:
 *   post:
 *     tags:
 *       - Pengajuan
 *     description: Mengirim email penerimaan pengajuan prakerin berdasarkan id
 *     summary: Mengirim email penerimaan pengajuan prakerin sesuai id
 *     parameters:
 *       - in: path
 *         name: id_pengajuan
 *         schema: 
 *           type: string
 *           format: uuid
 *         required: true
 *     requestBody:
 *       required: true
 *       content: 
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               hari:
 *                 type: string
 *               waktu:
 *                 type: string
 *               ruangan:
 *                 type: string
 *             required:
 *               - hari
 *               - waktu
 *               - ruangan
 *     responses:
 *       200:
 *         description: ok
 *       400:
 *         description: bad request
 *       404:
 *         description: not found
 */
app.post('/api/pengajuan/:id/kirimemail', async function(req, res){
    //id dari parameter
    let id = req.params.id
    let hari = req.body.hari
    let waktu = req.body.waktu
    let ruangan = req.body.ruangan
    //tampilkan
    let pengajuan = await Pengajuan.findByPk(id)
    if(pengajuan !== null){
        let mailOptions = {
            from: '"TIKomDik" <play.tikomdik@gmail.com>',
            to: `${pengajuan.email}`,
            subject: 'Penerimaan Pengajuan Prakerin di UPTD TIKomDik Disdik Jabar',
            //text: 'Hi ini pesan dari nodemailer'
            html: `<!DOCTYPE html>
            <html>
            <head>
                <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
                <style>
                    body {
                        font-family: 'Montserrat';
                    }
            
                    .title {
                        font-weight: bold;
                        margin-bottom: 40px !important;
                    }
            
                    .subtitle {
                        font-size: 16px;
                        font-weight: 500;
                    }
            
                    .username-content {
                        font-size: 16px;
                        letter-spacing: 0.5px;
                    }
            
                    .circle-yellow {
                        background-color: #EFD020;
                        border-radius: 50%;
                        width: 20px;
                        height: 20px;
                        margin-right: 5px;
                    }
            
                    .circle-blue {
                        background-color: #20AEE0;
                        border-radius: 50%;
                        width: 20px;
                        height: 20px;
                        margin-right: 5px;
                    }
            
                    .circle-green {
                        background-color: #0E8647;
                        border-radius: 50%;
                        width: 20px;
                        height: 20px;
                    }
                    .email-wraper{
                        padding: 0px 0px;
                        background-color: white;
                        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                        width: 100%;
                        margin: auto;
                    }
                    .email-margin{
                        padding-inline: 30px;
                    }
                    .line-header{
                        background-color: #20AEE0;
                        border-radius: 0px;
                        width: 100%;
                        height: 20px;
                    }
                    .line-bottom{
                        background-color: #0E8647;
                        border-radius: 0px;
                        width: 100%;
                        height: 20px;
                    }
                </style>
            </head>
            
            <body style="padding: 20px 30px 50px 30px; ">
                <div class="email-wraper" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
                    <div class="line-header"></div>
                    <div class="email-margin">
                        <div style="margin-top: 20px; display: flex;">
                            <h3 class="title">Hai Calon Siswa/Mahasiswa Prakerin</h3>
                                <div class="circle-yellow" style="margin-left: auto; margin-top: 20px;"></div>
                                <div class="circle-blue" style="margin-top: 20px;"></div>
                                <div class="circle-green" style="margin-top: 20px;"></div>
                        </div>
                <h5 class="subtitle" style="color: #0E8647; font-weight: 600;">Selamat Pengajuan Anda Di Terima</h5>
                    <div class="username-content">
                        <table>
                            <tr>
                                <td>Nama</td>
                                <td>:</td>
                                <td style="text-transform: capitalize;">${pengajuan.nama}</td>
                            </tr>
                            <tr>
                                <td>Asal Instansi</td>
                                <td>:</td>
                                <td style="text-transform: uppercase;">${pengajuan.nama_instansi}</td>
                            </tr>
                            <tr>
                                <td>Nomor Pengajuan</td>
                                <td>:</td>
                                <td>${pengajuan.id_pengajuan}</td>
                            </tr>
                        </table>
                 </div>   
                 <h5 class="subtitle">Silahkan Datang Ke UPTD TIKomdik Disdik Jabar Pada :</h5>
                    <div class="username-content">
                        <table>
                            <tr>
                                <td>Hari</td>
                                <td>:</td>
                                <td style="text-transform: capitalize;">${hari}</td>
                            </tr>
                            <tr>
                                <td>Pukul</td>
                                <td>:</td>
                                <td>${waktu}</td>
                            </tr>
                            <tr>
                                <td>Ruangan</td>
                                <td>:</td>
                                <td style="text-transform: capitalize;">${ruangan}</td>
                            </tr>
                        </table>
                 </div>
                 <h5 class="subtitle">Dinas Pendidikan Jawa Barat, Jl. Dr. Rajiman No.6, Pasir Kaliki, Kec. Cicendo, Kota Bandung, Jawa Barat 40171</h5>  
            </div>
            <div class="line-bottom"></div>
            </div>
            </body>
            </html>`
        }

        transporter.sendMail(mailOptions, function(err, data){
            if(err){
                res.status(400).json({status: 'bad request', message: "Email penerimaan gagal dikirim", data: err})
            }else{
                console.log("Email terkirim")
                res.status(200).json({status: 'ok', message: "Email penerimaan berhasil dikirim", data: data})
            }
        })
    }else{
        res.status(404).json({status: 'not found', message: "Pengajuan tidak ditemukan"})
    }
})

//error handler
app.use(function(err, req, res, next){
    //set locals, only providing eror in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //render the error pages
    res.status(err.status || 500)
    res.render('error');
    res.json({ message: err.message, error: err })
});

module.exports = app;
