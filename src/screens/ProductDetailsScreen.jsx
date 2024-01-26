import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const ProductDetailsScreen = () => {
    const route = useRoute()
    console.log('item details = ', route.params)
  return (
    <View>
      <Text>ProductDetailsScreen</Text>
    </View>
  )
}

export default ProductDetailsScreen