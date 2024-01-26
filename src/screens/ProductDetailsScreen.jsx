import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import BackButton from '../components/BackButton'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
const ProductDetailsScreen = () => {
    const route = useRoute()
   const {id, image, name, description, price} = route.params;
   const [isLiked, setIsLiked] = useState(false);
   const [Added, setAdded] = useState(false); 

useEffect(()=>{
    const checkLiked = async () => {
        const storedValue= await AsyncStorage.getItem(`itemInfo-${id}`);
        console.log('storedValue',storedValue);
        if(storedValue !== null){
            setIsLiked(true);
            console.log('if storedValue',storedValue);
        }
    };
    checkLiked();
},[id]);

   const AddToFavorite= async(value, prevLiked) => {
    console.log("prevLiked=",prevLiked);
    setIsLiked(!prevLiked)
    console.log("isLiked=", isLiked);
    const storedValue = await AsyncStorage.getItem(`itemInfo-${id}`)
    if(storedValue !==null){
            Toast.show({
                type:'error',
                text1:'item Already in Storage!',
                visibilityTime: 3000,
                autoHide:true
            });
    }else{
        try{
            const jsonValue =JSON.stringify(value);
            console.log("Befor jsonValue", jsonValue);
            await AsyncStorage.setItem(`ItemInfo-${id}`,jsonValue);
            console.log("Afetr jsonValue", jsonValue);

        }catch(error){
                    console.log(error);
        }
    }
   };
  return (
    <View className='bg-white flex-1 justify-between'>
        <Image 
        source={{uri: image}}
        className='h-auto w-full rounded-b-2x1 flex-1'
        resizeMode= "cover"
         />
         <BackButton />
         <View className="bg-blue-100 rounded-2xl mx-5 p-3 my-4">
            <View className="flex-row items-center justify-between">
                <Text className="text-x1 tracking-widest font-bold text-gray-700">{name}</Text>
                <Ionicons 
                name={isLiked ? "heart-sharp" : "heart-outline"}  
                size={24} color={isLiked ? "red" : "black"} 
                onPress={()=> AddToFavorite({id,name,price,image}, isLiked)}
                />
            </View>

            <View className="m-2">
                <Text className="text-x1 tracking-widest font-bold text-gray-700">{description}</Text>
            </View>

            <TouchableOpacity className="bg-indigo-500 mx-3 rounded-md p-3 flex-row justify-between mt-5 mb-1">
                <View className="flex-row space-x-1 items-center">
                    <Ionicons name="cart-sharp" size={30} color='white'/>
                    <Text className='text-white font-normal text-lg'>Add to cart </Text>
                </View>
                <View>
                    <Text className="text-white font-extralight text-lg">|</Text>
                    <Text className="text-white font-normal text-lg">${price}</Text>
                </View>
            </TouchableOpacity>
         </View>
    </View>
  )
}

export default ProductDetailsScreen