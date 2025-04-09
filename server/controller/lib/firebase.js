const admin = require("firebase-admin");
const serviceAccount = require ("../../controller/lib/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var db = admin.firestore();

module.exports = { admin, db };