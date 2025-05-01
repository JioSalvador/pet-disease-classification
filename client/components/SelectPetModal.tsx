import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

function SelectPetModal({
  visible,
  onClose,
  onAddNew
}: {
  visible: boolean;
  onClose: () => void;
  onAddNew: () => void;
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <View style={styles.handleBar} />

          <Text style={styles.title}>Select your pet</Text>

          <TouchableOpacity style={styles.addNewButton} onPress={onAddNew}>
            <Feather name="plus" size={18} color="#666" />
            <Text style={styles.addText}>Add a new pet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default SelectPetModal;

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
  addNewButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 30,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    marginLeft: 8,
    color: '#666',
    fontWeight: '500',
  },
});
