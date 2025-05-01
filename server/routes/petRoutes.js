const express = require('express');
const router = express.Router();
const { addPetProfile, updatePetProfile, deletePetProfile, getAllPets, getPetById } = require('../controller/petControllers.js');

//router.get('', (req, res) => {});
router.get('/pets', getAllPets);
router.get('/pets/:petId', getPetById);
router.post('/pets', addPetProfile);
router.put('/pets/:petId', updatePetProfile);
router.delete('/pets/:petId', deletePetProfile);

module.exports = router;