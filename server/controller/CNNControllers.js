const tf = require('@tensorflow/tfjs');
const { createCanvas, loadImage } = require('canvas');

let catModel, dogModel;

const loadModels = async () => {
    try {
//        catModel = await tf.loadLayersModel('http://localhost:3000/model/cat/model.json');
        dogModel = await tf.loadLayersModel('http://localhost:3000/dog/model.json');
        console.log('Cat and Dog models loaded successfully!');
    } catch (error) {
        console.error('Error loading models:', error);
    }
};
loadModels();

const handleImagePrediction = async (file, model, classLabels) => {
    if (!file) {
        throw new Error('No image file uploaded');
    }

    const buffer = file.buffer;
    const img = await loadImage(buffer);

    const canvas = createCanvas(150, 150);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 150, 150);

    const tensor = tf.browser.fromPixels(canvas).div(255.0).expandDims(0);

    if (!model) {
        throw new Error('Model not loaded yet');
    }

    const prediction = model.predict(tensor);
    const result = prediction.arraySync();

    const predictedClassIndex = result[0].indexOf(Math.max(...result[0]));
    const predictedClass = classLabels[predictedClassIndex];

    return { predictedClass, result };
};

// const uploadCatImage = async (req, res) => {
//     try {
//         const classLabels = ['Bacterial', 'Fungal', 'Healthy'];
//         const prediction = await handleImagePrediction(req.file, catModel, classLabels);
//         res.json(prediction);
//     } catch (error) {
//         console.error('Cat image processing error:', error);
//         res.status(500).send(error.message || 'Failed to process cat image');
//     }
// };

const uploadDogImage = async (req, res) => {
    try {
        const classLabels = ['Bacterial', 'Fungal', 'Healthy'];
        const prediction = await handleImagePrediction(req.file, dogModel, classLabels);
        res.json(prediction);
    } catch (error) {
        console.error('Dog image processing error:', error);
        res.status(500).send(error.message || 'Failed to process dog image');
    }
};

module.exports = {
//    uploadCatImage,
    uploadDogImage
};