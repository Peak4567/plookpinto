import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LogoImg from '../assets/images/logo.png';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View className="bg-white px-4 pt-14 pb-3 flex-row items-center justify-between shadow-sm">
      
      <View className="items-center justify-center w-[65px]">
        <View className="w-12 h-12 rounded-xl items-center justify-center overflow-hidden">
          <Image 
            source={LogoImg} 
            className="w-full h-full"
            resizeMode="contain" 
          />
        </View>
      </View>

      <View className="flex-1 mx-3 justify-center">
        <Text className="text-[12px] font-bold text-green-700 text-center mb-1">
          plook pinto
        </Text>
        
        <View className="bg-emerald-100/60 border border-emerald-200/50 rounded-lg flex-row items-center px-3 h-8 justify-between">
          <TextInput 
            className="text-slate-800 font-bold text-xs flex-1 h-full p-0 text-center"
            placeholder="Search Box"
            placeholderTextColor="#475569"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FontAwesome name="search" size={13} color="#15803d" />
        </View>
      </View>

      <Link href="/notification" asChild>
        <TouchableOpacity className="w-[45px] items-center justify-center relative">
        <View className="p-2">
          <FontAwesome name="bell" size={26} color="#71a062" />
        </View>
      <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-600 rounded-full border border-white" />
        </TouchableOpacity>
      </Link>

    </View>
  );
}