var express = require('express');
var router  = express.Router()
const multer = require('multer');

const JobdeskController = require('../controller/jobdesk')
// const VerifyToken = require('../middleware/VerifyToken')

/***
 * @swagger
 * /jobdesk:
 *   get:
 *     tags:
 *       - Jobdesk
 *     description: Menampilkan data jobdesk
 *     summary: Menampilkan data jobdesk
 *     parameters:
 *       - in: query
 *         name: nama
 *         schema: 
 *           type: string
 *         description: nama jobdesk
 *         required: false
 *     responses:
 *       200:
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_jobdesk:
 *                   type: string
 *                   format: uuid
 *                 nama_jobdesk:
 *                   type: string
 *                 kuota:
 *                   type: integer
 *                 created_date:
 *                   type: date
 *                 last_update:
 *                   type: date
 *                 soft_delete:
 *                   type: integer
 *                 penanggung_jawab:
 *                   type: string
 */
router.get('/', JobdeskController.findAll)
/***
 * @swagger
 * /jobdesk/paging?page={page}&size={size}:
 *   get:
 *     tags:
 *       - Jobdesk
 *     description: Menampilkan data jobdesk dengan halaman dan jumlah item
 *     summary: Menampilkan data jobdesk dengan halaman dan jumlah item
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
 *         name: penanggung_jawab
 *         schema: 
 *           type: string
 *         description: penanggung jawab jobdesk
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
router.get('/paging', JobdeskController.paging)
/***
 * @swagger
 * /jobdesk:
 *   post:
 *     tags:
 *       - Jobdesk
 *     description: Menambahkan data jobdesk
 *     summary: Menambahkan data jobdesk
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               nama_jobdesk:
 *                 type: string
 *               kuota:
 *                 type: integer
 *               soft_delete:
 *                 type: integer
 *               penanggung_jawab:
 *                 type: string
 *             required:
 *               - nama_jobdesk
 *               - kuota
 *               - soft_delete
 *               - penanggung_jawab
 *     responses:
 *       201:
 *         description: created
 *       400:
 *         description: bad request
 * 
 */
router.post('/', multer().none(), JobdeskController.store)
/***
 * @swagger
 * /jobdesk/{id_jobdesk}:
 *   get:
 *     tags:
 *       - Jobdesk
 *     description: Menampilkan data jobdesk berdasarkan id
 *     summary: Menampilkan data jobdesk berdasarkan id
 *     parameters: 
 *       - in: path
 *         name: id_jobdesk
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
 *                 id_jobdesk:
 *                   type: string
 *                   format: uuid
 *                 nama_jobdesk:
 *                   type: string
 *                 kuota:
 *                   type: integer
 *                 created_date:
 *                   type: date
 *                 last_update:
 *                   type: date
 *                 soft_delete:
 *                   type: integer
 *                 penanggung_jawab:
 *                   type: string
 *       404:
 *         description: not found
 */
router.get('/:id', JobdeskController.show)
/***
 * @swagger
 * /jobdesk/{id_jobdesk}:
 *   put:
 *     tags:
 *       - Jobdesk
 *     description: Memperbarui data jobdesk berdasarkan id
 *     summary: Memperbarui data jobdesk berdasarkan id
 *     parameters:
 *       - in: path
 *         name: id_jobdesk
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
 *               nama_jobdesk:
 *                 type: string
 *               kuota:
 *                 type: integer
 *               soft_delete:
 *                 type: integer
 *               penanggung_jawab:
 *                 type: string
 *             required:
 *               - nama_jobdesk
 *               - kuota
 *               - soft_delete
 *               - penanggung_jawab
 *     responses:
 *       200:
 *         description: ok
 *       400:
 *         description: bad request
 */
router.put('/:id', multer().none(), JobdeskController.update)
/***
 * @swagger
 * /jobdesk/{id_jobdesk}:
 *   delete:
 *     tags:
 *       - Jobdesk
 *     description: Menghapus jobdesk berdasarkan id
 *     summary: Menghapus jobdesk berdasarkan id
 *     parameters:
 *       - in: path
 *         name: id_jobdesk
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
router.delete('/:id', JobdeskController.destroy)

module.exports = router