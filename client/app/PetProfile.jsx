import React, { useEffect, useState } from 'react'
import {
  View, Text, TextInput, Image, StyleSheet,
  ScrollView, ActivityIndicator, Button, Alert, TouchableOpacity
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useRoute, useNavigation } from '@react-navigation/native'
import { getPetById, updatePetProfile, deletePetProfile } from '../services/petProfileServices'

const PetProfile = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { petId } = route.params
  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await getPetById(petId)
        setPet(data)
      } catch (error) {
        console.error('Error fetching pet details:', error)
      } finally {
        setLoading(false)
      }
    }

    if (petId) {
      fetchPet()
    }
  }, [petId])

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permissionResult.granted) {
      alert('Permission to access media library is required!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setPet({ ...pet, profilePic: result.assets[0].uri })
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updatePetProfile(petId, pet)
      Alert.alert('Success', 'Pet profile updated!')
    } catch (error) {
      console.error('Update failed:', error)
      Alert.alert('Error', 'Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete this pet profile?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePetProfile(petId)
              Alert.alert('Deleted', 'Pet profile has been deleted.')
              navigation.goBack()
            } catch (error) {
              console.error('Delete failed:', error)
              Alert.alert('Error', 'Failed to delete profile.')
            }
          },
        },
      ]
    )
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#A04747" style={{ marginTop: 40 }} />
  }

  if (!pet) {
    return <Text style={styles.errorText}>Pet not found.</Text>
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: pet.profilePic }} style={styles.image} />
        <Text style={styles.editText}>Tap to change photo</Text>
      </TouchableOpacity>

      <Text style={styles.name}>{pet.name}</Text>

      <View style={styles.infoBox}>
        {renderEditableField('Name', 'name')}
        {renderEditableField('Breed', 'breed')}
        {renderEditableField('Age', 'age')}
        {renderEditableField('Gender', 'gender')}
        {renderEditableField('Weight (kg)', 'weight')}
        {renderEditableField('Medical History', 'medicalHistory')}
        {renderEditableField('Notes', 'notes')}

        <View style={{ marginTop: 30 }}>
          <Button
            title={saving ? 'Saving...' : 'Save Changes'}
            onPress={handleSave}
            color="#A04747"
            disabled={saving}
          />
        </View>
      </View>

      <View style={{ marginTop: 20, width: 340, marginBottom: 40 }}>
        <Button
          title="Delete Profile"
          onPress={handleDelete}
          color="#C0392B"
        />
      </View>
    </ScrollView>
  )

  function renderEditableField(label, key) {
    return (
      <>
        <Text style={styles.label}>{label}:</Text>
        <TextInput
          style={styles.input}
          value={pet[key]?.toString() || ''}
          onChangeText={(text) => setPet({ ...pet, [key]: text })}
          multiline={key === 'medicalHistory' || key === 'notes'}
        />
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 120,
    backgroundColor: '#fff',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 8,
  },
  editText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#A04747',
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 4,
  },
  errorText: {
    marginTop: 50,
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
})

export default PetProfile