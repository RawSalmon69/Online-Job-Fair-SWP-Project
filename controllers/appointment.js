const Appointment = require('../models/Appointment');
const Hospital = require('../models/Hospital');

//@desc         Get all appointments
//@route        GET /api/v1/appointments
//@access       Public
exports.getAppointments = async (req,res,next) => {
    let query;
    
    if(req.user.role !== 'admin'){
        query = Appointment.find({user: req.user.id}).populate({
            path: 'hospital',
            select: 'name province tel'
        });
    }else{
        if(req.params.hospitalId){
            query = Appointment.find().populate({
                path: 'hospital',
                select: 'name province tel'
            });
        }else{
            query = Appointment.find().populate({
                path: 'hospital',
                select: 'name province tel'
            });
        }
    }
    try{
        const appointments = await query;
        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    }catch (err){
        console.log(err);
        res.status(400).json({success: false, messsage: 'Cannot find Appointment'});
    }
};

//@desc         Get one appointments
//@route        GET /api/v1/appointments/:id
//@access       Public
exports.getAppointment = async (req,res,next) => {
    try{
        const appointment = await Appointment.findById(req.params.id).populate({
            path: 'hospital',
            select: 'name province tel'
        });
        if(!appointment){
            return res.status(400).json({success: false, messsage: 'No appointment with the id of ' + req.params.id});
        }
        res.status(200).json({
            success: true,
            data: appointment
        });
    }catch (err){
        console.log(err);
        res.status(400).json({success: false, messsage: 'Cannot find Appointment'});
    }
};

//@desc         Add appointment
//@route        POST /api/v1/hospitals/:hospitalId/appointment
//@access       Private
exports.addAppointment = async (req,res,next) => {
    try{
        req.body.hospital = req.params.hospitalId;
        const hospital = await Hospital.findById(req.params.hospitalId);

        if( !hospital ){
            return res.status(400).json({success: false, messsage: 'No hospital with the id of ' + req.params.hospitalId});
        }

        req.body.user = req.user.id;
        const existedAppointments = await Appointment.find({user: req.user.id});
        if(existedAppointments.length >=3 && req.user.role !== 'admin'){
            return res.status(400).json({success: false, messsage: 'The user with ID ' + req.user.id + ' has already made 3 appointments'});
        }

        const appointment = await Appointment.create(req.body);

        res.status(200).json({
            success: true,
            data: appointment
        });
    }catch (err){
        console.log(err);
        res.status(500).json({success: false, messsage: 'Cannot add Appointment'});
    }
};

//@desc         Update appointment
//@route        PUT /api/v1/hospitals/:hospitalId/appointment
//@access       Private
exports.updateAppointment = async (req,res,next) => {
    try{
        let appointment = await Appointment.findById(req.params.id);

        if(!appointment) {
            return res.status(404).json({success: false, messsage: 'No appointment with the id of ' + req.params.id});
        }

        if(appointment.user.toString() !== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({success: false, messsage: 'User ' + req.user.id + ' is not authorized to update this appointment'});
        }

        appointment = await Appointment.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        });
        return res.status(200).json({success: true, data: appointment});
    }catch (err){
        console.log(err);
        res.status(500).json({success: false, messsage: 'Cannot update Appointment'});
    }
};

//@desc         Delete appointment
//@route        DELETE /api/v1/hospitals/:hospitalId/appointment
//@access       Private
exports.deleteAppointment = async (req,res,next) => {
    try{
        let appointment = await Appointment.findById(req.params.id);

        if(!appointment) {
            return res.status(404).json({success: false, messsage: 'No appointment with the id of ' + req.params.id});
        }

        if(appointment.user.toString() !== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({success: false, messsage: 'User ' + req.user.id + ' is not authorized to delete this appointment'});
        }

        await appointment.deleteOne();

        return res.status(200).json({success: true, data: {}});
    }catch (err){
        console.log(err);
        res.status(500).json({success: false, messsage: 'Cannot delete Appointment'});
    }
};