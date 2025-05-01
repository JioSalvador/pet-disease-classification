import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SkinDiseaseModal from './SkinDiseaseModal';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const SkinDiseaseButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.9}>
      <LinearGradient
        colors={['rgba(160, 71, 71, 0.9)','rgba(255, 215, 0, 0.9)']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
>
          <View style={styles.content}>
            <MaterialCommunityIcons name="book-open-page-variant" size={32} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Discover how to access your pet health </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <SkinDiseaseModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

export default SkinDiseaseButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 0,
    marginTop:20
  },
  button: {
    borderRadius: 12,
    width: 370,
    height: 70,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    elevation: 4,
    marginBottom: 100,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    marginLeft:10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
