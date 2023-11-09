import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import { useRoute } from '@react-navigation/native'

const listData = [
  {
    id: 1,
    name: 'Checking plants',
    balance: 1000,
    image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
  },
  {
    id: 2,
    name: 'Savings plants',
    balance: 5000,
    image: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
  },
  {
    id: 3,
    name: 'Pending Payments plants',
    balance: 3000,
    image: 'https://www.bootdey.com/img/Content/avatar/avatar6.png',
  },
];

const DetailScreens = ({ navigation }) => {
    const route = useRoute()
    const {id, title} = route.params.data
    console.log(id)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Tanaman</Text>
      {listData.map(plants => (
        <TouchableOpacity key={plants.id} style={styles.plants}>
          <Image source={{ uri: plants.image }} style={styles.plantsImage} />
          <View style={styles.plantsContent}>
            <Text style={styles.plantsName}>{plants.name}</Text>
            <Text style={styles.plantsBalance}>${plants.balance}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default DetailScreens

const styles = StyleSheet.create({
  container: {
    marginTop:60,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  plants: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  plantsImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  plantsContent: {
    justifyContent: 'center',
  },
  plantsName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  plantsBalance: {
    fontSize: 16,
    color: '#999',
  },
});