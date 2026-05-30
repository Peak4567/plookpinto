import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ShopRatingScreen() {
  const ratings = [
    { stars: '5 ดาว', count: 85, percentage: '85%' },
    { stars: '4 ดาว', count: 12, percentage: '12%' },
    { stars: '3 ดาว', count: 3, percentage: '3%' },
    { stars: '2 ดาว', count: 0, percentage: '0%' },
    { stars: '1 ดาว', count: 0, percentage: '0%' },
  ];

  return (
    <View className="flex-1 bg-[#f8f9fa]">
      <View className="bg-white px-4 pt-14 pb-4 flex-row items-center justify-between border-b border-slate-100">
        <Link href="/account" asChild>
          <TouchableOpacity className="flex-row items-center">
            <FontAwesome name="chevron-left" size={16} color="#5b8c4d" />
            <Text className="text-sm font-bold text-slate-700 ml-1">กลับ</Text>
          </TouchableOpacity>
        </Link>
        <View className="absolute left-0 right-0 top-14 items-center -z-10">
          <Text className="text-xl font-black text-[#5b8c4d]">ค่าแนบเฉลี่ยร้าน</Text>
        </View>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120, paddingTop: 16 }} showsVerticalScrollIndicator={false}>
        <View className="mx-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-4 flex-row items-center justify-between">
          <View className="items-center w-[35%]">
            <Text className="text-4xl font-black text-slate-800">4.8</Text>
            <View className="flex-row mt-1.5">
              <FontAwesome name="star" size={12} color="#f59e0b" />
              <FontAwesome name="star" size={12} color="#f59e0b" style={{ marginLeft: 2 }} />
              <FontAwesome name="star" size={12} color="#f59e0b" style={{ marginLeft: 2 }} />
              <FontAwesome name="star" size={12} color="#f59e0b" style={{ marginLeft: 2 }} />
              <FontAwesome name="star-half-o" size={12} color="#f59e0b" style={{ marginLeft: 2 }} />
            </View>
            <Text className="text-[10px] font-bold text-slate-400 mt-2">จากทั้งหมด 100 รีวิว</Text>
          </View>
          
          <View className="w-[60%] border-l border-slate-100 pl-4 justify-between h-24">
            {ratings.map((rate, idx) => (
              <View key={idx} className="flex-row items-center">
                <Text className="text-[10px] font-bold text-slate-500 w-8">{rate.stars}</Text>
                <View className="flex-1 h-2 bg-slate-100 rounded-full mx-2 overflow-hidden">
                  <View style={{ width: rate.percentage }} className="h-full bg-amber-400 rounded-full" />
                </View>
                <Text className="text-[10px] font-bold text-slate-400 w-6 text-right">{rate.count}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}