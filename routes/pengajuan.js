var express = require('express');
var router  = express.Router()
const multer = require('multer');

const PengajuanController = require('../controller/pengajuan')
const upload = require("../middleware/upload")
// const VerifyToken = require('../middleware/VerifyToken')

/***
 * @swagger
 * /pengajuan:
 *   get:
 *     tags:
 *       - Pengajuan
 *     description: Menampilkan data pengajuan
 *     summary: Menampilkan data pengajuan
 *     parameters:
 *       - in: query
 *         name: nama
 *         schema: 
 *           type: string
 *         description: nama 
 *         required: false
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_pengajuan:
 *                   type: string
 *                   format: uuid
 *                 nama:
 *                   type: string
 *                 tgl_lahir:
 *                   type: date
 *                 jenis_kelamin:
 *                   type: char
 *                 tingkat_pendidikan:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 no_telp:
 *                   type: string
 *                 created_date:
 *                   type: time
 *                 last_update:
 *                   type: date
 *                 soft_delete:
 *                   type: integer
 *                   default: 0
 *                 referral_id:
 *                   type: string
 *                   format: uuid
 *                 jenis_tingkat_pendidikan:
 *                   type: integer
 *                 status_approval:
 *                   type: integer
 *                 approved_by:
 *                   type: string
 *                   format: uuid
 *                 target_jobdesk:
 *                   type: string
 *                   format: uuid
 *                 nomor_induk_instansi:
 *                   type: string
 *                 dokumen_validasi:
 *                   type: text
 *                 nama_pembimbing:
 *                   type: string
 *                 nip_pembimbing:
 *                   type: char
 *                 kontak_pembimbing:
 *                   type: char
 *                 nama_instansi:
 *                   type: string
 *                 curriculum_vitae:
 *                   type: text
 */
router.get('/', PengajuanController.findAll)
/***
 * @swagger
 * /pengajuan/paging?page={page}&size={size}:
 *   get:
 *     tags:
 *       - Pengajuan
 *     description: Menampilkan data pengajuan dengan halaman dan jumlah item
 *     summary: Menampilkan data pengajuan dengan halaman dan jumlah item
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: 
 *           type: integer
 *         description: nomor halaman yang ditampilkan
 *         required: true
 *       - in: query
 *         name: size
 *         schema: 
 *           type: integer
 *         description: jumlah data yang ditampilkan
 *         required: true
 *       - in: query
 *         name: jenis_kelamin
 *         schema: 
 *           type: character
 *         description: jenis kelamin
 *         required: false
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_instansi:
 *                   type: string
 *                   format: uuid
 *                 nama:
 *                   type: string
 *                 kode_instansi:
 *                   type: string
 *                 alamat:
 *                   type: text
 *                 kode_pos:
 *                   type: char
 *                 website:
 *                   type: text
 */
router.get('/paging', PengajuanController.paging)
/***
 * @swagger
 * /pengajuan:
 *   post:
 *     tags:
 *       - Pengajuan
 *     description: Menambahkan data pengajuan
 *     summary: Menambahkan data pengajuan
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               tgl_lahir:
 *                 type: date
 *               jenis_kelamin:
 *                 type: char
 *               tingkat_pendidikan:
 *                 type: integer
 *               email:
 *                 type: string
 *               no_telp:
 *                 type: string
 *               soft_delete:
 *                 type: integer
 *                 default: 0
 *               jenis_tingkat_pendidikan:
 *                 type: string
 *               status_approval:
 *                 type: integer
 *                 default: 0
 *               approved_by:
 *                 type: string
 *                 format: uuid
 *               target_jobdesk:
 *                 type: string
 *                 format: uuid
 *               nomor_induk_instansi:
 *                 type: string
 *               dokumen_validasi:
 *                 type: string
 *                 format: binary
 *               nama_pembimbing:
 *                 type: string
 *               nip_pembimbing:
 *                 type: char
 *               kontak_pembimbing:
 *                 type: char
 *               nama_instansi:
 *                 type: string
 *               curriculum_vitae:
 *                 type: string
 *                 format: binary
 *             required:
 *               - nama
 *               - tgl_lahir
 *               - jenis_kelamin
 *               - tingkat_pendidikan
 *               - email
 *               - no_telp
 *               - approved_by
 *               - target_jobdesk
 *               - nomor_induk_instansi
 *               - dokumen_validasi
 *               - nama_pembimbing
 *               - nip_pembimbing
 *               - kontak_pembimbing
 *               - nama_instansi
 *               - curriculum_vitae
 *     responses:
 *       201:
 *         description: created
 *       400:
 *         description: bad request
 * 
 */
router.post('/', upload.fields([{ name: 'dokumen_validasi', maxCount: 1 }, { name: 'curriculum_vitae', maxCount: 1 }]), PengajuanController.store)
/***
 * @swagger
 * /pengajuan/{id_pengajuan}:
 *   get:
 *     tags:
 *       - Pengajuan
 *     description: Menampilkan data pengajuan berdasarkan id
 *     summary: Menampilkan data pengajuan berdasarkan id
 *     parameters: 
 *       - in: path
 *         name: id_pengajuan
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_pengajuan:
 *                   type: string
 *                   format: uuid
 *                 nama:
 *                   type: string
 *                 tgl_lahir:
 *                   type: date
 *                 jenis_kelamin:
 *                   type: char
 *                 tingkat_pendidikan:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 no_telp:
 *                   type: string
 *                 created_date:
 *                   type: time
 *                 last_update:
 *                   type: date
 *                 soft_delete:
 *                   type: integer
 *                   default: 0
 *                 referral_id:
 *                   type: string
 *                   format: uuid
 *                 jenis_tingkat_pendidikan:
 *                   type: integer
 *                 status_approval:
 *                   type: integer
 *                 approved_by:
 *                   type: string
 *                   format: uuid
 *                 target_jobdesk:
 *                   type: string
 *                   format: uuid
 *                 nomor_induk_instansi:
 *                   type: string
 *                 dokumen_validasi:
 *                   type: text
 *                 nama_pembimbing:
 *                   type: string
 *                 nip_pembimbing:
 *                   type: char
 *                 kontak_pembimbing:
 *                   type: char
 *                 nama_instansi:
 *                   type: string
 *                 curriculum_vitae:
 *                   type: text
 *       404:
 *         description: not found
 */
router.get('/:id', PengajuanController.show)
/***
 * @swagger
 * /pengajuan/{id_pengajuan}:
 *   put:
 *     tags:
 *       - Pengajuan
 *     description: Memperbarui data pengajuan berdasarkan id
 *     summary: Memperbarui data pengajuan sesuai id
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               tgl_lahir:
 *                 type: date
 *               jenis_kelamin:
 *                 type: char
 *               tingkat_pendidikan:
 *                 type: integer
 *               email:
 *                 type: string
 *               no_telp:
 *                 type: string
 *               soft_delete:
 *                 type: integer
 *                 default: 0
 *               jenis_tingkat_pendidikan:
 *                 type: string
 *               status_approval:
 *                 type: integer
 *                 default: 0
 *               approved_by:
 *                 type: string
 *                 format: uuid
 *               target_jobdesk:
 *                 type: string
 *                 format: uuid
 *               nomor_induk_instansi:
 *                 type: string
 *               dokumen_validasi:
 *                 type: string
 *               nama_pembimbing:
 *                 type: string
 *               nip_pembimbing:
 *                 type: char
 *               kontak_pembimbing:
 *                 type: char
 *               nama_instansi:
 *                 type: string
 *               curriculum_vitae:
 *                 type: string
 *             required:
 *               - nama
 *               - tgl_lahir
 *               - jenis_kelamin
 *               - tingkat_pendidikan
 *               - email
 *               - no_telp
 *               - approved_by
 *               - target_jobdesk
 *               - nomor_induk_instansi
 *               - nama_pembimbing
 *               - nip_pembimbing
 *               - kontak_pembimbing
 *               - nama_instansi
 *     responses:
 *       200:
 *         description: ok
 *       400:
 *         description: bad request
 */
router.put('/:id', 
    upload.fields([
        {
            name: 'dokumen_validasi', maxCount: 1
        },
        {
            name: 'curriculum_vitae', maxCount: 1
        }
    ])
, PengajuanController.update)
/***
 * @swagger
 * /pengajuan/{id_pengajuan}:
 *   delete:
 *     tags:
 *       - Pengajuan
 *     description: Menghapus pengajuan berdasarkan id
 *     summary: Menghapus pengajuan berdasarkan id
 *     parameters:
 *       - in: path
 *         name: id_pengajuan
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     responses:
 *       200:
 *         description: ok
 *       404:
 *         description: not found
 */
router.delete('/:id', PengajuanController.destroy)



module.exports = router