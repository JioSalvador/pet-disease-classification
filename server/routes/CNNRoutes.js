const express = require('express');
const multer = require('multer');
const { uploadDogImage } = require('../controller/CNNControllers.js');
//const { uploadCatImage } = require('../controller/CNNControllers.js');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//router.post('/disease-classifier/cat', upload.single('image'), uploadCatImage);
router.post('/dog', upload.single('image'), uploadDogImage);

module.exports = router;