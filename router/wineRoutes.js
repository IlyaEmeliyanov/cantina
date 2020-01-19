const express = require('express');
const router = express.Router();
const wineController = require('../controllers/wineController');

router.route('/').get(wineController.getWines).post(wineController.postWine);

module.exports = router;