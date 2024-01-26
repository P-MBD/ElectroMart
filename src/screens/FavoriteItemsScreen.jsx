import { View, Text, SafeAreaView, TouchableOpacity,FlatList,Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteItemsScreen = () => {
  const[favoriteItems, setFavoriteItems] = useState([]);
  const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(()=> {
      FavoriteItemsList();
    },[])
  );
const FavoriteItemsList = async () => {
  try{
    const keys = await AsyncStorage.getAllKeys()
    const itemKeys = keys.filter((key)=> key.startsWith('ItemInfo-'))
    const items =  await AsyncStorage.multiGet(itemKeys)
    setFavoriteItems(items.map((item)=>{
      const itemId = item[0].split('-')[1];
      return{id: itemId, ...JSON.parse(item[1])}
    }))
  }
  catch(error){
    console.log(error);
  }
}

const removeFavoriteItem = async (itemId) => {
  try{
    await AsyncStorage.removeItem(`ItemInfo-${itemId}`);
    setFavoriteItems((prevItems)=> prevItems.filter((item)=> item.id !==itemId));
  }catch(error){
    console.log(error);
  }
};


  const renderItem  = ({item}) => {
    return(
      <>
      <View className='flex-row my-3 items-center'>
          <Image 
          source={{uri: item.image}}
          className="h-20 w-20 rounded-xl"
           />
           <View className="flex-1  mx-3">
              <Text className="font-semibold">{item.name}</Text>
              <Text className="text-gray-500">{item.price}</Text>
           </View>

           <TouchableOpacity onPress={()=>removeFavoriteItem(item.id)}>
              <Ionicons name="trash-outline" size={30} color="red" />
           </TouchableOpacity>
      </View>
     
      </>
    )
  };
  return (
    <SafeAreaView>
         <View className='flex-row items-center my-1 mx-3 border-b border-gray-300 pb-2'>
            <TouchableOpacity>
                <MaterialIcons name='arrow-back-ios' color='black' size={30} />
            </TouchableOpacity>
            <Text className='flex-1 text-center tracking-widest test-x1 font-medium'>Favorite Item</Text>
        </View>

        <View>
            <FlatList
              data={favoriteItems}
              renderItem={renderItem}
              keyExtractor={(item)=> item.id}
              showsVerticalScrollIndicator={false}
             />
        </View>
    </SafeAreaView>
  )
}

export default FavoriteItemsScreen