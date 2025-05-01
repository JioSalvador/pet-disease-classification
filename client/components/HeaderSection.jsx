import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons, Feather, Entypo} from '@expo/vector-icons';
import { useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import PetFormModal from '../components/PetFormModal';
import SelectPetModal from '../components/SelectPetModal';
import SelectSpeciesModal from '../components/SelectSpeciesModal';


const HeaderSection = () => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const router = useRouter(); 
  const [selectPetVisible, setSelectPetVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [speciesModalVisible, setSpeciesModalVisible] = useState(false);
  const [speciesType, setSpeciesType] = useState(null);
  
  useEffect(() => {
    if (!cameraPermission) {
      requestCameraPermission();
    }
  }, []);

  const openCamera = async () => {
    if (!cameraPermission) {
      const permissionResult = await requestCameraPermission();
      if (!permissionResult.granted) {
        Alert.alert('Permission needed', 'Camera permission is required.');
        return;
      }
    } else if (!cameraPermission.granted) {
      Alert.alert('Permission needed', 'Camera permission is required.');
      return;
    }
    
    router.push('/camera'); 
  };

  //Removed the Icon beside Plus Icon & Added Registering Forms
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello there, Pawrent!</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => setSelectPetVisible(true)}> 
            <Feather name="plus" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.scanBox} onPress={openCamera}>
        <Ionicons name="scan" size={20} color="#923F44" />
        <Text style={styles.scanText}>Scan and Predict your pet's skin condition</Text>
      </TouchableOpacity>



      <SelectPetModal
        visible={selectPetVisible}
        onClose={() => setSelectPetVisible(false)}
        onAddNew={() => {
          setSelectPetVisible(false);
          setSpeciesModalVisible(true); 
        }}
      />

      <SelectSpeciesModal
        visible={speciesModalVisible}
        onClose={() => setSpeciesModalVisible(false)}
        onSelect={(type) => {
          setSpeciesModalVisible(false);
          setSpeciesType(type);
          setFormVisible(true);
        }}
      />

      <PetFormModal
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        species={speciesType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#923F44',
  },
  icons: {
    flexDirection: 'row',
    gap: 2,
  },
  icon: {
    marginRight: 8,
  },
  scanBox: {
    marginTop: 16,
    backgroundColor: '#EEF8EE',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scanText: {
    color: '#923F44',
    fontWeight: '600',
    fontSize: 16,
  }
});

export default HeaderSection;