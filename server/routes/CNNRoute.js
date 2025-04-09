const express = require('express');
const app = express();

const { uploadImage } = require('../controller/CNNController.js');

const router = express.Router()

// Image classification
router.get('/disease-classifier', (req, res) => {
    res.send('Hi World');
})
router.post('/disease-classifier', uploadImage);

module.exports = router;