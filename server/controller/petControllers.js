const { db } = require('./lib/firebase');
const admin = require('firebase-admin');

const getAllPets = async (req, res) => {
    try {
        const uid = "test-user-id" //decodedToken.uid;

        const petsSnapshot = await db.collection('users').doc(uid).collection('pets').get();
        const pets = petsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json(pets);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getPetById = async (req, res) => {
    try {
        const uid = "test-user-id"; //decodedToken.uid
        const { petId } = req.params;

        const petDoc = await db.collection('users').doc(uid).collection('pets').doc(petId).get();

        if (!petDoc.exists) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        res.status(200).json({ id: petDoc.id, ...petDoc.data() });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const addPetProfile = async (req, res) => {
    try {
      const {
        name,
        breed,
        age,
        profilePic,
        gender,
        birthday,
        neutered,
        species
      } = req.body;

      // Check for required fields
      if (!name || !breed || age === undefined || !profilePic || !species) {
        return res.status(400).json({ error: 'Missing required pet data.' });
      }

      const uid = "test-user-id"; // Replace with the authenticated user's UID

      // Define the pet document
      const petDoc = {
        name,
        breed,
        age,
        profilePic,
        gender: gender || null,
        birthday: birthday || null,
        neutered: typeof neutered === 'boolean' ? neutered : null,
        species,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };

      // Save the pet profile under the user's pets collection
      const newPetRef = await db.collection('users').doc(uid).collection('pets').add(petDoc);

      res.status(201).json({ message: 'Pet profile created', id: newPetRef.id });
    } catch (error) {
      console.error('Error adding pet profile:', error);
      res.status(500).json({ error: 'Failed to create pet profile.' });
    }
};

  

const updatePetProfile = async (req, res) => {
    try {
        const uid = "test-user-id"; //decodedToken.uid
        const { petId } = req.params;
        const updatedData = req.body;

        const cleanData = Object.fromEntries(
            Object.entries(updatedData).filter(([_, v]) => v !== undefined)
        );

        const petRef = db.collection('users').doc(uid).collection('pets').doc(petId);
        const petDoc = await petRef.get();

        if (!petDoc.exists) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        await petRef.update(cleanData);

        res.status(200).json({ message: 'Pet profile updated' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const deletePetProfile = async (req, res) => {
    try {
        const uid = "test-user-id"; //decodedToken.uid
        const { petId } = req.params;

        const petRef = db.collection('users').doc(uid).collection('pets').doc(petId);
        await petRef.delete();

        res.status(200).json({ message: 'Pet profile deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    addPetProfile,
    updatePetProfile,
    deletePetProfile,
    getAllPets,
    getPetById,
};