import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ClinicMap = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 51.017,
    longitude: -114.115,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const searchLocation = async (text) => {
    setQuery(text);
    if (text.length < 3) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          text
        )}&format=json&limit=5`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const selectLocation = (item) => {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);

    const newRegion = {
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setMapRegion(newRegion);
    setSelectedClinic({
      name: item.display_name.split(',')[0],
      address: item.display_name,
      coordinate: { latitude: lat, longitude: lon },
    });

    setQuery(item.display_name);
    setSearchResults([]);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        {selectedClinic?.coordinate && (
          <Marker coordinate={selectedClinic.coordinate}>
            <Callout tooltip>
  <View style={styles.customCalloutContainer}>
    <View style={styles.calloutContent}>
      <Text style={styles.calloutTitle}>{selectedClinic.name}</Text>

      <View style={styles.calloutBody}>
        <Text style={styles.calloutAddress}>{selectedClinic.address}</Text>
      </View>
    </View>
    <View style={styles.calloutArrow} />
  </View>
</Callout>

          </Marker>
        )}
      </MapView>

      <View style={styles.searchBox}>
        <MaterialIcons name="search" size={20} color="#aaa" />
        <TextInput
          placeholder="Search clinic or vets"
          style={styles.searchInput}
          value={query}
          onChangeText={searchLocation}
        />
        <MaterialIcons name="menu" size={24} color="#333" />
      </View>

      {searchResults.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={searchResults}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectLocation(item)} style={styles.resultItem}>
                <Text>{item.display_name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchBox: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 95,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 999,
    elevation: 5,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  customCalloutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutContent: {
    backgroundColor: '#A04747',
    padding: 10,
    borderRadius: 12,
    maxWidth: 260, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  calloutBody: {
    flexDirection: 'column', 
  },
  
  calloutAddress: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 6,
  },
  calloutTitle: {
    fontWeight:'bold',
    color:'#ffff',
    fontSize: 14,
    marginBottom:6

  }
});

export default ClinicMap;
