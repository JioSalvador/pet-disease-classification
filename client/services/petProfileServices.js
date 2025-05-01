const BASE_URL = 'http://<insertyourip>:3000/pet-profiles'; // go to command prompt > type ipconfig > get your ipv4 address

export async function createPetProfile(petData) {
  const response = await fetch(`${BASE_URL}/pets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(petData),
  });
  return await response.json();
}

export async function getAllPets() {
  const response = await fetch(`${BASE_URL}/pets`);
  return await response.json();
}

export async function getPetById(petId) {
  const response = await fetch(`${BASE_URL}/pets/${petId}`);
  return await response.json();
}

export async function updatePetProfile(petId, updatedData) {
  const response = await fetch(`${BASE_URL}/pets/${petId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  return await response.json();
}

export async function deletePetProfile(petId) {
  const response = await fetch(`${BASE_URL}/pets/${petId}`, {
    method: 'DELETE',
  });
  return await response.json();
}