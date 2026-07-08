// const router = require('express').Router();
// const { login, register, getMe, checkSetup } = require('../controllers/authController');
// const { protect } = require('../middleware/authMiddleware');
// router.get('/check-setup', checkSetup);
// router.post('/login', login);
// router.post('/register', register);
// router.get('/me', protect, getMe);
// module.exports = router;
const router = require('express').Router();
const {
    login,
    register,
    getMe,
    checkSetup,
    createEmployee,
    getEmployees,
    deactivateEmployee,
    updateEmployeePermissions,
} = require('../controllers/authController');
const { protect, superAdminOnly } = require('../middleware/authMiddleware');

// Public
router.get('/check-setup', checkSetup);
router.post('/login', login);
router.post('/register', register); // shudhu prothom bar (setup) e kaj korbe, erpor auto-lock

// Logged-in jekono admin/employee
router.get('/me', protect, getMe);

// Super Admin only — employee manage kora
router.post('/employees', protect, superAdminOnly, createEmployee);
router.get('/employees', protect, superAdminOnly, getEmployees);
router.put('/employees/:id/deactivate', protect, superAdminOnly, deactivateEmployee);
router.put('/employees/:id/permissions', protect, superAdminOnly, updateEmployeePermissions);

module.exports = router;