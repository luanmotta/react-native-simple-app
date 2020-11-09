import React from 'react'

import { WebView } from 'react-native-webview'

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
  console.log(product.url)
  return <WebView source={{ uri: product.url }} />
}

export default Product
