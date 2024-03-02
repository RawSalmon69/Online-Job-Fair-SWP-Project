const express = require('express');
const {getCompanies, getCompany, createCompany, updateCompany, deleteCompany, getVacCenters} = require('../controllers/companies');
const router = express.Router();
const {protect, authorize} = require('../middleware/auth');

const appointmentsRouter = require('./appointments');
const swaggerJSDoc = require('swagger-jsdoc');

//re-route into other resource routers
router.use('/:companyId/appointments', appointmentsRouter);

router.route('/').get(getCompanies).post(protect, authorize('admin'), createCompany);
router.route('/:id').get(getCompany).put(protect, authorize('admin'), updateCompany).delete(protect, authorize('admin'), deleteCompany);


module.exports = router;


/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the company
 *           example: 65e0dbe27733ef9545444ea9
 *         name:
 *           type: string
 *           description: Company name
 *         address:
 *           type: string
 *           description: House No., Street, Road
 *         district:
 *           type: string
 *           description: District
 *         province:
 *           type: string
 *           description: Province
 *         postalcode:
 *           type: string
 *           description: 5-digit postal code
 *         tel:
 *           type: string
 *           description: Telephone number
 *         region:
 *           type: string
 *           description: Region
 *       example:
 *         id: 65e0dbe27733ef9545444ea9
 *         name: Example Company
 *         address: 1234 Example Road
 *         district: Example District
 *         province: Example Province
 *         postalcode: 12345
 *         tel: 012-345-6789
 *         region: Example Region
 */
/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: The companies managing API
 */
/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Returns the list of all the companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: The list of the companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 */
/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Get the company by id
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The company id
 *     responses:
 *       200:
 *         description: The company description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company with the given id was not found
 */
/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       201:
 *         description: The company was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Update the company by the id
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Required company id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Updated company with the given id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company with the given id was not found
 *       500:
 *         description: Error on the server
 */
/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Remove the company by id
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Required company id
 *     responses:
 *       200:
 *         description: The company with the given id was successfully removed
 *       404:
 *         description: Company with the given id was not found
 */
