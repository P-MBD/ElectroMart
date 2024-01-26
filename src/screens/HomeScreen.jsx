import {SafeAreaView, View, Text, Image, TouchableOpacity, TextInput, FlatList, RefreshControl } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Feather, SimpleLineIcons, MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons'
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter'
import ProductsList from '../../ProductsList.json'
const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const[products, setProducts] =useState([]);
  const[refreshing, setRefreshing] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  //console.log("products",ProductsList)
  useEffect(()=>{
    setSelected("smartphone");
    setProducts(ProductsList);
  },[]);
  //console.log(products);
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
   });
   
   if (!fontsLoaded){
     return null;
   }

   const renderItem = ({item})=>{
      return(
        <View className='flex-row justify-between mb-5'>
          {
            item[0]&& (
              <View className='bg-white shadow-md shadow-black rounded-lg w-48'>
                  <TouchableOpacity>
                    <Image source={{uri: item[0].image}} className='h-64 w-full rounded-t-2x1' resizeMode="contain" />
                    <View>
                        <Text>{item[0].name}</Text>
                        <Text>{item[0].price}</Text>
                    </View>
                  </TouchableOpacity>
              </View>
            )
          }
           {
            item[1]&& (
              <View className='bg-white shadow-md shadow-black rounded-lg w-[180px]'>
                  <TouchableOpacity>
                    <Image source={{uri: item[1].image}} className='h-64 w-full rounded-t-2x1' resizeMode="contain" />
                    <View>
                        <Text>{item[1].name}</Text>
                        <Text>{item[1].price}</Text>
                    </View>
                  </TouchableOpacity>
              </View>
            )
          }
        </View>
      )
   }
   const handleRefresh= () => {

   }

  return (
    <SafeAreaView className="mx-2 flex-1">
        <View>
             <Text style={{fontFamily:"Inter_400Regular", fontSize:30 , color:'gray'}}>ElectroMark</Text>
        </View>
        <View className="flex-row space-x-5 mx-3 my-3">
            <View className="px-3 flex-row  border border-x-gray-400 rounded-2xl flex-1 space-x-5  items-center">
               <Feather name="search" size={24} color="gray" />
               <TextInput  
               placeholder="Search" 
               className='py-2 flex-1'
               autoFocus={false} 
               value={searchQuery}
               onChangeText={(text) => setSearchQuery(text)}
                 /> 
              <TouchableOpacity>
                <Feather name="send" size={24} color="#6366f1" />
              </TouchableOpacity>
              
            </View>
        </View>
        <View className='flex-row mt-2 justify-evenly my-2'>
          <TouchableOpacity 
          className={`rounded-full h-16 w-16 items-center justify-center ${selected === "smartphone" ? "bg-indigo-500" : "bg-white" }`}
          onPress={() => setSelected("smartphone")}
          >
                  <SimpleLineIcons name="screen-smartphone" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity 
          className={`rounded-full h-16 w-16 items-center justify-center ${selected === "computer" ? "bg-indigo-500" : "bg-white" }`}
          onPress={() => setSelected("computer")}
          >
              <MaterialIcons name="computer" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity 
             className={`rounded-full h-16 w-16 items-center justify-center ${selected === "game-controller" ? "bg-indigo-500" : "bg-white" }`}
             onPress={() => setSelected("game-controller")}
             >
              <Entypo name="game-controller" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity 
              className={`rounded-full h-16 w-16 items-center justify-center ${selected === "tv" ? "bg-indigo-500" : "bg-white" }`}
              onPress={() => setSelected("tv")}
          >
              <FontAwesome name="tv" size={24} color="black" />
          </TouchableOpacity>
      
        </View>
        <FlatList
        data={products
          .filter(
            (item) => 
              item.category.toLowerCase() === selected &&  
                (item.name.toLowerCase().includes(searchQuery.toLowerCase())||
                    item.category.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                        .reduce((result, item, index, array) => {
                            if(index%2 === 0){
                                  result.push(array.slice(index, index + 2));
              }
              return result;
           }, [])}
        keyExtractor={(index)=> index}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View>
                <Text 
                style={{fontFamily:"Inter_400Regular", fontSize:30 , color:'gray'}}
                className='text-center'>No Products found</Text>
          </View>
        }
         />
    </SafeAreaView>
  )
}

export default HomeScreen