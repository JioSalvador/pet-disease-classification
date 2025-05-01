const express = require("express");
const app = express();
const admin = require("firebase-admin");
const path = require('path');
const { db } = require('./controller/lib/firebase.js');

//initialize routes
const petRoutes = require('./routes/petRoutes');
const cnnRoutes = require('./routes/CNNRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

//serve model
app.use('/dog', express.static(path.join(__dirname, 'models', 'AnimalSkinDiseasePrediction_CNN-main', 'model', 'tfjs')));
//this is for the other model
//app.use('/model', express.static(path.join(__dirname, 'models', 'AnimalSkinDiseasePrediction_CNN-main', 'model', 'tfjs')));

// setup routes
app.use("/disease-classifier", cnnRoutes); //CNN classification route
app.use("/auth", authRoutes); //Firebase authentication route
app.use('/pet-profiles', petRoutes); //Firebase pet profile route


//Test firestore connection
async function testDBConnection() {
    try {
        const testDoc = db.collection("test").doc("connectionTest");
        await testDoc.set({ message: "Firestore connection successful!", timestamp: new Date() });

        console.log("Database is connected.");
    } catch (error) {
        console.error("Database connection failed", error);
    }
}
testDBConnection();