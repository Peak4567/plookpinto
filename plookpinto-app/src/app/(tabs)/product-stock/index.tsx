import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ProductStockScreen() {
  const stockItems = [
    { id: 1, name: 'แอปเปิ้ลฟูจิสด (คัดเกรด)', stock: 45, unit: 'ลูก', price: '60', icon: '🍎', status: 'normal' },
    { id: 2, name: 'ผักสลัดคอสออร์แกนิก', stock: 12, unit: 'ถุง', price: '45', icon: '🌿', status: 'normal' },
    { id: 3, name: 'ส้มสายน้ำผึ้ง หวานฉ่ำ', stock: 2, unit: 'กิโลกรัม', price: '95', icon: '🍏', status: 'low' },
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
          <Text className="text-xl font-black text-[#5b8c4d]">สินค้าคงเหลือ</Text>
        </View>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120, paddingTop: 16 }} showsVerticalScrollIndicator={false}>
        <View className="mx-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-4">
          <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">สรุปคลังสินค้า</Text>
          <View className="flex-row justify-between pt-2">
            <View className="items-center flex-1 border-r border-slate-100">
              <Text className="text-xs font-bold text-slate-500">รายการทั้งหมด</Text>
              <Text className="text-xl font-black text-slate-800 mt-1">3</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-xs font-bold text-amber-500">สินค้าใกล้หมด</Text>
              <Text className="text-xl font-black text-amber-500 mt-1">1</Text>
            </View>
          </View>
        </View>

        <View className="mx-4 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {stockItems.map((item, index) => (
            <View key={item.id} className={`flex-row items-center justify-between p-4 ${index !== stockItems.length - 1 ? 'border-b border-slate-100' : ''}`}>
              <View className="flex-row items-center flex-1 pr-3">
                <View className="w-10 h-10 bg-slate-50 rounded-xl items-center justify-center border border-slate-200/60">
                  <Text className="text-xl">{item.icon}</Text>
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-xs font-black text-slate-800" numberOfLines={1}>{item.name}</Text>
                  <Text className="text-[10px] font-bold text-slate-400 mt-0.5">ราคาชิ้นละ: ฿{item.price}</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className={`text-sm font-black ${item.status === 'low' ? 'text-rose-500' : 'text-slate-800'}`}>
                  {item.stock} {item.unit}
                </Text>
                {item.status === 'low' && (
                  <Text className="text-[9px] font-bold text-rose-500 mt-0.5">ใกล้หมดแล้ว</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}