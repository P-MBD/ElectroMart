//import liraries
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// create a component
const BackButton = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity className='absolute top-14 left-2 ' onPress={()=> navigation.goBack()}>
            <Ionicons name='arrow-back-circle-sharp' size={40} color='gray' />
        </TouchableOpacity>
    );
};



//make this component available to the app
export default BackButton;
