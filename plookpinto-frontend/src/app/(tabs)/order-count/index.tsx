import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function OrderCountScreen() {
  const orderStats = [
    { id: 1, title: 'คำสั่งซื้อที่รอชำระเงิน', count: 2, icon: 'credit-card' as const, color: '#f59e0b' },
    { id: 2, title: 'คำสั่งซื้อที่ต้องจัดส่ง', count: 5, icon: 'truck' as const, color: '#3b82f6' },
    { id: 3, title: 'คำสั่งซื้อที่จัดส่งแล้ว', count: 14, icon: 'send' as const, color: '#6366f1' },
    { id: 4, title: 'คำสั่งซื้อสำเร็จแล้ว', count: 128, icon: 'check-circle' as const, color: '#5b8c4d' },
    { id: 5, title: 'คำสั่งซื้อที่ถูกยกเลิก', count: 3, icon: 'times-circle' as const, color: '#ef4444' },
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
          <Text className="text-xl font-black text-[#5b8c4d]">จำนวนคำสั่งซื้อ</Text>
        </View>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120, paddingTop: 16 }} showsVerticalScrollIndicator={false}>
        <View className="mx-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-4 items-center">
          <Text className="text-xs font-black text-slate-400 uppercase tracking-wider">คำสั่งซื้อรวมทั้งหมด</Text>
          <Text className="text-4xl font-black text-slate-800 mt-2">152</Text>
          <Text className="text-[10px] font-bold text-slate-400 mt-1">รายการสะสมตั้งแต่เปิดร้าน</Text>
        </View>

        <View className="mx-4 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {orderStats.map((stat, index) => (
            <View key={stat.id} className={`flex-row items-center justify-between p-4 ${index !== orderStats.length - 1 ? 'border-b border-slate-100' : ''}`}>
              <View className="flex-row items-center">
                <View className="w-8 items-center">
                  <FontAwesome name={stat.icon} size={16} color={stat.color} />
                </View>
                <Text className="text-xs font-black text-slate-700 ml-2">{stat.title}</Text>
              </View>
              <Text className="text-sm font-black text-slate-800">{stat.count} รายการ</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}