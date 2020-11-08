import React, { useEffect, useState } from 'react';
import api from '../services/api'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

interface ProductProperties {
  _id: string,
  title: string,
  description: string,
  url: string,
  createdAt: string,
  __v?: number,
}

interface RenderItemProperties {
  item: ProductProperties
}


const Main = () => {

  const [ products, setProducts ] = useState<ProductProperties[]>([])

  const loadProducts = async () => {
    const response = await api.get('/products');

    const { docs } = response.data;

    console.log(docs)

    setProducts(docs)
  }

  const renderItem = (obj: RenderItemProperties) => {
    const { item } = obj
    return (
      <View style={styles.productContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <TouchableOpacity style={styles.productButton} onPress={() => {}}>
          <Text style={styles.productButtonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList contentContainerStyle={styles.list} data={products} keyExtractor={item => item._id} renderItem={renderItem} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  list: {
    padding: 20
  },
  productContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  productButtonText: {
    fontSize: 16,
    color: '#DA552F',
    fontWeight: 'bold'
  }
});

export default Main
