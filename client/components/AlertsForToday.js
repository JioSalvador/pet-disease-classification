import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

const initialAlerts = [
  {
    id: '1',
    title: "Your pet's scheduled deworming is today",
    description: "It’s 2 weeks old, you have to deworm your pet twice a w...",
    image: { uri: 'https://www.metlifepetinsurance.com/content/dam/metlifecom/us/metlifepetinsurance/the-siamese-cat-min.webp' },
  },
  {
    id: '2',
    title: "Your pet’s scheduled Anti-rabies vaccine is today",
    description: "It’s been 2–3 weeks since you have prune the d...",
    image: { uri: 'https://i.ytimg.com/vi/EcMlX_36gjs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCeRm3Bj7_7wf4f1mItqzz8GS7NIQ' },
  },
];

const AlertsForToday = () => {
  const [alerts, setAlerts] = useState(initialAlerts);

  const handleDelete = (id) => {
    setAlerts((prev) => prev.filter((item) => item.id !== id));
  };

  const renderRightActions = (id) => (
    <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(id)}>
      <Text style={styles.deleteText}>Remove</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Alerts for today</Text>

      {alerts.length === 0 ? (
        <Text style={styles.emptyText}>No alerts for today 🎉</Text>
      ) : (
        alerts.map((item) => (
          <Swipeable
            key={item.id}
            renderRightActions={() => renderRightActions(item.id)}
          >
            <View style={styles.alertCard}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.textWrapper}>
                <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                <Text numberOfLines={1} style={styles.description}>{item.description}</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#94A3B8" />
            </View>
          </Swipeable>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: 'white',
    /////Remove marginbottom
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 14,
    marginTop: 24,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: '#64748B',
  },
  deleteBtn: {
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    marginBottom: 12,
    borderRadius: 12,
  },
  deleteText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default AlertsForToday;
