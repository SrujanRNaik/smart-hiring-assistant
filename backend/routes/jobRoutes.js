const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById, deleteJob } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
router.post('/', protect, createJob);
// POST /api/jobs — protected (only logged-in recruiters)
router.get('/', getAllJobs);
// GET /api/jobs — public (candidates browse jobs)
router.get('/:id', getJobById);
// GET /api/jobs/:id — public
router.delete('/:id', protect, deleteJob);
// DELETE /api/jobs/:id — protected
module.exports = router;