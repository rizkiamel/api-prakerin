var express = require('express');
var router  = express.Router()
const multer = require('multer');

const InstansiController = require('../controller/instansi')
// const VerifyToken = require('../middleware/VerifyToken')

/***
 * @swagger
 * /instansi:
 *   get:
 *     tags:
 *       - Instansi
 *     description: Menampilkan data instansi
 *     summary: Menampilkan data instansi
 *     parameters:
 *       - in: query
 *         name: nama
 *         schema: 
 *           type: string
 *         description: nama instansi
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
router.get('/', InstansiController.findAll)
/***
 * @swagger
 * /instansi/paging?page={page}&size={size}:
 *   get:
 *     tags:
 *       - Instansi
 *     description: Menampilkan data instansi dengan halaman dan jumlah item
 *     summary: Menampilkan data instansi dengan halaman dan jumlah item
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
router.get('/paging', InstansiController.paging)
/***
 * @swagger
 * /instansi:
 *   post:
 *     tags:
 *       - Instansi
 *     description: Menambahkan data isntansi
 *     summary: Menambahkan data instansi
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id_instansi:
 *                 type: string
 *                 format: uuid
 *               nama:
 *                 type: string
 *               kode_instansi:
 *                 type: string
 *               alamat:
 *                 type: text
 *               kode_pos:
 *                 type: char
 *               website:
 *                 type: text
 *             required:
 *               - id_instansi
 *               - nama
 *               - kode_instansi
 *     responses:
 *       201:
 *         description: created
 *       400:
 *         description: bad request
 * 
 */
router.post('/', multer().none(), InstansiController.store)
/***
 * @swagger
 * /instansi/{id_instansi}:
 *   get:
 *     tags:
 *       - Instansi
 *     description: Menampilkan data instansi berdasarkan id
 *     summary: Menampilkan data instansi berdasarkan id
 *     parameters: 
 *       - in: path
 *         name: id_instansi
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
 *       404:
 *         description: not found
 */
router.get('/:id', InstansiController.show)
/***
 * @swagger
 * /instansi/{id_instansi}:
 *   put:
 *     tags:
 *       - Instansi
 *     description: Memperbarui data instansi berdasarkan id
 *     summary: Memperbarui data instansi berdasarkan id
 *     parameters:
 *       - in: path
 *         name: id_instansi
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
 *               nama:
 *                 type: string
 *               kode_instansi:
 *                 type: string
 *               alamat:
 *                 type: text
 *               kode_pos:
 *                 type: char
 *               website:
 *                 type: text
 *             required:
 *               - nama
 *               - kode_instansi
 *     responses:
 *       200:
 *         description: ok
 *       400:
 *         description: bad request
 */
router.put('/:id', multer().none(), InstansiController.update)
/***
 * @swagger
 * /instansi/{id_instansi}:
 *   delete:
 *     tags:
 *       - Instansi
 *     description: Menghapus instansi berdasarkan id
 *     summary: Menghapus instansi berdasarkan id
 *     parameters:
 *       - in: path
 *         name: id_instansi
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
router.delete('/:id', InstansiController.destroy)


module.exports = router