import { View, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
const cartGif =  require('../../assets/emptyCart.gif');
const CartScreen = () => {
  const navigation = useNavigation();
  const dispach = useDispatch();
  const {items, totalPrice} = useSelector((state)=> state.basket);
  const renderItem =({item})=>{};
  return (
   <SafeAreaView className='flex-1 bg-white'>
      <View className="flex-row items-center mx-3 my-1 border-b border-gray-300 pb-2">
          <TouchableOpacity onPress={()=>navigation.goBack()} className="items-center justify-center">
              <MaterialIcons name="arrow-back-ios" size={30} color="black" />
          </TouchableOpacity>
          <Text className="flex-1 text-center tracking-widest text-x1 font-medium">Shopping Cart</Text>
      </View>
      <View className='min-h-[70%]'>
        <FlatList 
          data={items}
          renderItem={renderItem}
          keyExtractor={(item)=> item.id.toString}
          ListEmptyComponent={
            <View>
                <Image source={cartGif} className={"my-5 h-96 w-96 -ml-5"}/>
                <Text className="text-lg font-semibold text-center">Your cart is empty</Text>
            </View>
          }
        />
      </View>
   </SafeAreaView>
  )
}

export default CartScreen