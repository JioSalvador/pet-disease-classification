import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function SelectSpeciesModal({
  visible,
  onSelect,
  onClose
}: {
  visible: boolean;
  onSelect: (type: 'cat' | 'dog') => void;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <View style={styles.handleBar} />
          <Text style={styles.title}>What kind of pet are you adding?</Text>

          <TouchableOpacity style={styles.optionButton} onPress={() => onSelect('cat')}>
            <Text style={styles.optionText}><FontAwesome5 name="cat" size={24} color="black" />  Cat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => onSelect('dog')}>
            <Text style={styles.optionText}><FontAwesome6 name="dog" size={24} color="black" />  Dog</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#f6f6f6',
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
