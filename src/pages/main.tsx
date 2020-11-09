import React, { useEffect, useState } from 'react';
import api from '../services/api'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

interface ProductProperties {
  _id: string
  title: string
  description: string
  url: string
  createdAt: string
  __v?: number
}

interface ProductInfoProperties {
  total: number
  limit: number
  page: string
  pages: number
}

interface RenderItemProperties {
  item: ProductProperties
}

interface props {
  navigation: { navigate: Function }
}

const Main = (props: props) => {
  const [products, setProducts] = useState<ProductProperties[]>([])
  const [productInfo, setProductInfo] = useState<ProductInfoProperties>()
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadProducts()
  }, [page])

  const loadProducts = async () => {
    const response = await api.get(`/products?page=${page}`)

    const { docs, ...info } = response.data

    setProducts(prevProducts => [...prevProducts, ...docs])
    setProductInfo(info)
  }

  const loadMore = () => {
    if (!productInfo) return
    if (page === productInfo.pages) return

    setPage(page + 1)
  }

  const renderItem = (obj: RenderItemProperties) => {
    const { item } = obj
    return (
      <View style={styles.productContainer}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <TouchableOpacity
          style={styles.productButton}
          onPress={() => {
            props.navigation.navigate('Product', { product: item })
          }}
        >
          <Text style={styles.productButtonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={products}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  list: {
    padding: 20,
  },
  productContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
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
    lineHeight: 24,
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  productButtonText: {
    fontSize: 16,
    color: '#DA552F',
    fontWeight: 'bold',
  }
})

export default Main
