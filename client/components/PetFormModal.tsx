import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Platform, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { createPetProfile } from '../services/petProfileServices';

export default function PetFormModal({
  visible,
  onClose,
  species
}: {
  visible: boolean;
  onClose: () => void;
  species: 'cat' | 'dog' | null;
}) {

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | null>(null);
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [breed, setBreed] = useState('');
  const [breedModalVisible, setBreedModalVisible] = useState(false);
  const [neutered, setNeutered] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  
  const catBreeds = [
    "Abyssinian", "Aegean", "American Bobtail", "American Curl", "American Shorthair",
    "American Wirehair", "Arabian Mau", "Asian", "Asian Semi-longhair", "Australian Mist",
    "Balinese", "Bambino", "Bengal", "Birman", "Bombay", "Brazilian Shorthair",
    "British Longhair", "British Shorthair", "Burmese", "Burmilla", "California Spangled",
    "Chantilly-Tiffany", "Chartreux", "Chausie", "Cheetoh", "Colorpoint Shorthair",
    "Cornish Rex", "Cymric", "Cyprus", "Devon Rex", "Donskoy", "Dragon Li", "Dwelf",
    "Egyptian Mau", "European Burmese", "Exotic Shorthair", "Foldex", "German Rex",
    "Havana Brown", "Highlander", "Himalayan", "Japanese Bobtail", "Javanese", "Khao Manee",
    "Korat", "Korean Shorthair", "Kurilian Bobtail", "LaPerm", "Lykoi", "Maine Coon",
    "Manx", "Mekong Bobtail", "Minskin", "Mixed", "Munchkin", "Nebelung", "Norwegian Forest",
    "Ocicat", "Ojos Azules", "Oriental", "Oriental Longhair", "Oriental Shorthair",
    "Persian", "Peterbald", "Pixie-bob", "Ragamuffin", "Ragdoll", "Russian Blue",
    "Savannah", "Scottish Fold", "Selkirk Rex", "Serengeti", "Siamese", "Siberian",
    "Singapura", "Snowshoe", "Sokoke", "Somali", "Sphynx", "Suphalak", "Thai",
    "Tonkinese", "Toyger", "Turkish Angora", "Turkish Van", "Ukrainian Levkoy"
  ];
  const dogBreeds = [
    "Mixed", "Aspin (Asong Pinoy)", "Shih Tzu", "Chihuahua", "Pomeranian",
    "Golden Retriever", "Labrador Retriever", "Beagle", "Poodle",
    "Pug", "Dachshund", "German Shepherd", "Siberian Husky", "Cocker Spaniel",
    "Yorkshire Terrier", "Bulldog", "Rottweiler", "Doberman Pinscher",
    "Jack Russell Terrier", "French Bulldog", "Maltese", "Mini Pinscher",
    "Boston Terrier", "Border Collie", "Alaskan Malamute", "Great Dane",
    "Boxer", "Corgi", "Shar Pei", "Akita", "Basset Hound",
    "Belgian Malinois", "Bernese Mountain Dog", "Cane Corso", "Lhasa Apso",
    "Shiba Inu", "Samoyed", "Tibetan Mastiff", "Whippet", "Weimaraner"
  ];  
  const breedList = species === 'dog' ? dogBreeds : catBreeds;

  const handleImagePick = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setName('');
    setGender(null);
    setBreed('');
    setNeutered(false);
    setImageUri(null);
    onClose();
  };

  const canProceedToStep2 = name.trim() !== '' && gender !== null && breed !== '';

  const handleRegister = async () => {
    if (canProceedToStep2) {
      const calculateAge = (birthday: Date) => {
        const diff = new Date().getFullYear() - birthday.getFullYear();
        return diff;
      };
  
      const petData = {
        name,
        breed,
        age: calculateAge(birthday),
        profilePic: imageUri,
        gender,
        birthday,
        neutered,
        species
      };
  
      try {
        const response = await createPetProfile(petData);
        console.log('Pet Profile Created:', response);
        resetAndClose();
      } catch (error) {
        console.error('Error creating pet profile:', error);
        alert('There was an error creating the pet profile. Please try again.');
      }
    }
  };
  

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {step === 1 ? (
          <>
            <View style={styles.closeWrapper}>
              <TouchableOpacity onPress={onClose}>
                <Feather name="x" size={22} color="white" />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Tell us about your {species === 'dog' ? 'dog' : 'cat'}</Text>

            <Text style={styles.label}>What is your pet's name? *</Text>
            <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Enter name" />

            <Text style={styles.label}>What is the gender? *</Text>
            <View style={styles.row}>
              {['Male', 'Female'].map(g => (
                <TouchableOpacity
                  key={g}
                  style={[styles.genderButton, gender === g && styles.genderButtonSelected]}
                  onPress={() => setGender(g as 'Male' | 'Female')}
                >
                  <Text style={gender === g ? styles.genderTextSelected : styles.genderText}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>When is your pet's birthday? *</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.birthdayText}>{birthday.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={birthday}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={(_, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setBirthday(selectedDate);
                }}
              />
            )}
            <Text style={styles.note}>Please enter the exact date of birth. You can't change birthday.</Text>

            <Text style={styles.label}>What breed is your pet? *</Text>
            <TouchableOpacity onPress={() => setBreedModalVisible(true)} style={styles.input}>
              <Text>{breed || 'Select breed'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.checkbox} onPress={() => setNeutered(prev => !prev)}>
              <Feather
                name={neutered ? 'check-square' : 'square'}
                size={22}
                color={neutered ? '#923F44' : '#888'}
              />
              <Text style={{ marginLeft: 26, fontSize: 16, marginTop: -20 }}>Neutered</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.submitButton, !canProceedToStep2 && styles.disabledButton]} 
              onPress={() => canProceedToStep2 && setStep(2)}
              disabled={!canProceedToStep2}
            >
              <Text style={styles.submitText}>Next</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Show us {name || `your ${species === 'dog' ? 'dog' : 'cat'}`}'s best picture</Text>
            <Text style={styles.note}>
              If it's hard to choose because there are so many pictures, you can change it later in the family companion information.
            </Text>

            <TouchableOpacity onPress={handleImagePick}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
              ) : (
                <View style={styles.placeholder}><Text style={{ fontSize: 40 }}>🐾</Text></View>
              )}
            </TouchableOpacity>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.registerBtn} onPress={() => setStep(1)}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Register</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <Modal visible={breedModalVisible} animationType="slide">
          <View style={styles.breedModal}>
            <Text style={styles.title}>Select a breed</Text>
            <FlatList
              data={breedList}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setBreed(item);
                    setBreedModalVisible(false);
                  }}
                  style={styles.breedItem}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setBreedModalVisible(false)}>
              <Text style={styles.closeBreed}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: 'white' 
  },
  title: { 
    fontSize: 25, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    marginTop: 60 
  },
  label: { 
    fontWeight: '600', 
    marginTop: 15 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    borderRadius: 6, 
    marginTop: 5 
  },
  row: { 
    flexDirection: 'row', 
    marginTop: 10 },
  genderButton: { 
    flex: 1, 
    padding: 10, 
    marginRight: 5, 
    backgroundColor: '#eee', 
    borderRadius: 6, 
    alignItems: 'center' 
  },
  genderButtonSelected: { 
    backgroundColor: '#A04747'
  },
  genderText: { 
    color: '#333' 
  },
  genderTextSelected: {
     color: 'white', 
     fontWeight: 'bold' 
    },
  birthdayText: { 
    padding: 10, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 6, 
    marginTop: 5 
  },
  note: { 
    color: '#409EFF', 
    fontSize: 13, 
    marginTop: 10, 
    marginBottom: 20 
  },
  checkbox: { 
    marginTop: 15 
  },
  submitButton: { 
    backgroundColor: '#A04747',
    padding: 15, 
    borderRadius: 8, 
    marginTop: 30, 
    alignItems: 'center' 
  },
  disabledButton: { 
    backgroundColor: '#888', 
    opacity: 0.7 
  },
  submitText: { 
    color: 'white', 
    fontWeight: 'bold' 
  },
  breedModal: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: 'white' 
  },
  breedItem: { 
    padding: 15, 
    borderBottomWidth: 1, 
    borderColor: '#eee' 
  },
  closeBreed: { 
    marginTop: 20, 
    color: 'blue', 
    textAlign: 'center' 
  },
  
  image: {
    width: 160, 
    height: 160, 
    borderRadius: 80, 
    resizeMode: 'cover',
    alignSelf: 'center', 
    marginTop: 20
  },
  placeholder: {
    width: 160, 
    height: 160, 
    borderRadius: 80, 
    backgroundColor: '#f0f0f0',
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center', 
    marginTop: 20
  },
  buttonRow: {
    marginTop: 40, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  registerBtn: {
    backgroundColor: '#A04747', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 25
  },
  closeWrapper: {
    position: 'absolute',
    backgroundColor: '#A04747',
    padding: 10,
    borderRadius:20,
    top: 20,
    left: 20,
    zIndex: 10,
  }
  
});