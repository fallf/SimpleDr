const router = require('express').Router();

const doctorRoutes = require('./doctor-route');
const patientRoutes = require('./patient-route');
const nurseRoutes = require('./nurse-route');

router.use('/doctor', doctorRoutes);
router.use('/patient', patientRoutes);
router.use('/nurse', nurseRoutes);

module.exports= router;