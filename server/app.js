const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const path = require('path');

const { db } = require('./controller/lib/firebase.js');

const express = require("express");
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const classifyImage = require('./routes/CNNRoute.js');

const PORT = process.env.PORT || 3000;

async function testDBConnection(){
    try{
        const testDoc = db.collection("test").doc("connectionTest");
        await testDoc.set({ message: "Firestore connection successful!", timestamp: new Date() });
    
        console.log("Database is connected.");
    }catch(error){
        console.error("Database connection failed", error);
    }
}
testDBConnection();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use("/api", classifyImage)

app.listen(PORT, ()=> {
    console.log(`Server is running on port: ${PORT}`);
})

app.use('/model', express.static(path.join(__dirname, 'AnimalSkinDiseasePrediction_CNN-main', 'model', 'tfjs')));

async function loadModel() {
    try {
      const model = await tf.loadLayersModel('http://localhost:3000/model/model.json'); 
  
      console.log('Model loaded successfully!');
    } catch (error) {
      console.error('Error loading the model:', error);
    }
  }

const imagePath = path.join(__dirname, 'AnimalSkinDiseasePrediction_CNN-main', 'src', 'Validation', 'Fungal', '26.jpg');

console.log('Image path:', imagePath);

loadModel();