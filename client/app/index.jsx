import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import HeaderSection from '../components/HeaderSection';
import HealthCheckHistory from '../components/HealthCheckHistory';
import AlertsForToday from '../components/AlertsForToday';
import HowToUseCarousel from '../components/HowToUseCarousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SelectPetModal from '../components/SelectPetModal'; 
import PetProfileModal from './PetProfile';
import SkinDiseaseButton from '../components/SkinDiseaseButton'; 

//Added Imports for SelectPetModal and SkinDiseaseButton
const Home = () => {
  const [formVisible, setFormVisible] = useState(false);

  return (
    <View>
      <ScrollView contentContainerStyle={{ paddingBottom: 20, backgroundColor: 'white' }}>
        <HeaderSection />
        <HowToUseCarousel />
        <HealthCheckHistory />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AlertsForToday />
        </GestureHandlerRootView>

        <SkinDiseaseButton />
        
        <SelectPetModal visible={formVisible} onClose={() => setFormVisible(false)} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default Home;
