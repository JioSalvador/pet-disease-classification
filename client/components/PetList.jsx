import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { getAllPets } from '../services/petProfileServices'

const PetList = ({ color = '#A04747' }) => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

  useFocusEffect(
    React.useCallback(() => {
      const fetchPets = async () => {
        setLoading(true)
        try {
          const data = await getAllPets()
          setPets(data)
        } catch (error) {
          console.error('Error fetching pets:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchPets()
    }, [])
  )

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { borderColor: color }]}
      onPress={() => navigation.navigate('PetProfile', { petId: item.id })}
    >
      <Image source={{ uri: item.profilePic }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>Breed: {item.breed}</Text>
        <Text style={styles.details}>Age: {item.age}</Text>
      </View>
    </TouchableOpacity>
  )

  if (loading) {
    return <ActivityIndicator size="large" color={color} />
  }

  return (
    <FlatList
      data={pets}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
})

export default PetList