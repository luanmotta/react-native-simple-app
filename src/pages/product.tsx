import React from 'react'

import { Text } from 'react-native'

interface ProductProperties {
  _id: string
  title: string
  description: string
  url: string
  createdAt: string
  __v?: number
}

interface props {
  navigation: { navigate: Function }
  route: {
    params: {
      product: ProductProperties
    }
  }
}

const Product = (props: props) => {
  const { product } = props.route.params

  return <Text>{product.title}</Text>
}

export default Product
