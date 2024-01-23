import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import FavoriteItemsScreen from './src/screens/FavoriteItemsScreen';
import CartScreen from './src/screens/CartScreen';
import OrdersScreen from './src/screens/OrdersScreen';
const Stack= createNativeStackNavigator();
const Tab=createBottomTabNavigator();

function HomeStack(){
  return(
    <Stack.Navigator>
        <Stack.Screen name='HomeStack' component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeStack} options={{tabBarLabel:'Home'}} />
      <Tab.Screen name='Favorite' component={FavoriteItemsScreen} options={{tabBarLabel:'Favorite'}} />
      <Tab.Screen name='Cart' component={CartScreen} options={{tabBarLabel:'Cart'}} />
      <Tab.Screen name='Orders' component={OrdersScreen} options={{tabBarLabel:'Orders'}} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
