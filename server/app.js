
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