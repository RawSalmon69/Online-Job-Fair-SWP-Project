const express = require('express');
const {getCompanies, getCompany, createCompany, updateCompany, deleteCompany} = require('../controllers/companies');
const router = express.Router();
const {protect, authorize} = require('../middleware/auth');

const appointmentsRouter = require('./appointments');
const swaggerJSDoc = require('swagger-jsdoc');

//re-route into other resource routers
router.use('/:companyId/appointments', appointmentsRouter);

router.route('/').get(getCompanies).post(protect, authorize('admin'), createCompany);
router.route('/:id').get(getCompany).put(protect, authorize('admin'), updateCompany).delete(protect, authorize('admin'), deleteCompany);


module.exports = router;