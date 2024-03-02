const express = require('express');

const {getAppointments, getAppointment, addAppointment, updateAppointment, deleteAppointment} = require('../controllers/appointment');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, getAppointments).post(protect, authorize('admin', 'user'), addAppointment);
router.route('/:id').get(protect, getAppointment).put(protect, authorize('admin','user'), updateAppointment).delete(protect, authorize('admin', 'user'), deleteAppointment);

module.exports = router;

/** 
*@swagger
* /companies:
*     get:
*       summary: "Get all companies"
*       description: "Retrieve a list of all companies"
*       responses:
*         200:
*           description: "Successful operation"
*           schema:
*             type: "array"
*             items:
*               $ref: "#/definitions/Company"
*     post:
*       summary: "Create a new company"
*       description: "Create a new company"
*       parameters:
*         - in: "body"
*           name: "company"
*           description: "Company object to be created"
*           required: true
*           schema:
*             $ref: "#/definitions/CompanyInput"
*       responses:
*         201:
*           description: "Company created successfully"
*           schema:
*             $ref: "#/definitions/Company"
*@swagger
*   /companies/{id}:
*     parameters:
*       - name: "id"
*         in: "path"
*         description: "ID of the company to be operated on"
*         required: true
*         type: "string"
*     get:
*       summary: "Get a company by ID"
*       description: "Retrieve details of a company by its ID"
*       responses:
*         200:
*           description: "Successful operation"
*           schema:
*             $ref: "#/definitions/Company"
*     put:
*       summary: "Update a company"
*       description: "Update details of a company"
*       parameters:
*         - in: "body"
*           name: "company"
*           description: "Updated company object"
*           required: true
*           schema:
*             $ref: "#/definitions/CompanyInput"
*       responses:
*         200:
*           description: "Company updated successfully"
*           schema:
*             $ref: "#/definitions/Company"
*     delete:
*       summary: "Delete a company"
*       description: "Delete a company by its ID"
*       responses:
*         200:
*           description: "Company deleted successfully"
*           schema:
*             $ref: "#/definitions/Company"
* definitions:
*   Company:
*     type: "object"
*     properties:
*       _id:
*         type: "string"
*         example: "60f5275a91a425153c433a8d"
*       name:
*         type: "string"
*         example: "Company Name"
*   CompanyInput:
*     type: "object"
*     properties:
*       name:
*         type: "string"
*         example: "Company Name"
*/