const express = require('express');
const router = express.Router();
const {
    submitApplication,
    getApplicationsForJob,
    getMyApplications,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
router.post('/', protect, submitApplication);
// POST /api/applications — candidate submits application
router.get('/', protect, getApplicationsForJob);
// GET /api/applications?jobId=xxx — recruiter views applications
router.get('/my', protect, getMyApplications);
// GET /api/applications/my — candidate views their own applications
module.exports = router;