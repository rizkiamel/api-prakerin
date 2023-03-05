var nodemailer = require('nodemailer')
var dotenv = require('dotenv');
const { getMaxListeners } = require('./app');

//get config vars
dotenv.config();

let transporter = nodemailer.createTransport({
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

let mailOptions = {
    from: 'rizkiamel239@gmail.com',
    to: 'rizkiamelia843@gmail.com',
    subject: 'Penerimaan Pengajuan Prakerin di UPTD TIKomDik Disdik Jabar',
    //text: 'Hi ini pesan dari nodemailer'
    html: '<h1>Selamat Pengajuan mu diterima</h1><p>Harap segera datangi UPTD TIKomDik Disdik Jabar</p><p>Alamat: Dinas Pendidikan Jawa Barat, Jl. Dr. Rajiman No.6, Pasir Kaliki, Kec. Cicendo, Kota Bandung, Jawa Barat 40171</p><p>Hari: Senin-Jum`at</p><p>Pukul: 08:00-16:00</p>'
}

transporter.sendMail(mailOptions, function(err, data){
    if(err){
        console.log("Error"+err)
    }else{
        console.log("Email terkirim")
    }
})

