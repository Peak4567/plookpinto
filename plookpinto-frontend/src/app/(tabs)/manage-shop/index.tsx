import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function ShopManagementScreen() {
  const [isShopOpen, setIsShopOpen] = useState(true);

  const managementButtons = [
    { id: 1, title: 'เพิ่มสินค้าใหม่', icon: 'plus-circle' as const, color: '#5b8c4d' },
    { id: 2, title: 'แก้ไขข้อมูลร้าน', icon: 'edit' as const, color: '#4a733e' },
    { id: 3, title: 'ตั้งค่าการจัดส่ง', icon: 'truck' as const, color: '#6b9649' },
  ];

  const summaryData = [
    { id: 1, title: 'คำสั่งซื้อใหม่', count: '5', label: 'รายการ', icon: 'shopping-basket' as const },
    { id: 2, title: 'สินค้าหมด', count: '2', label: 'รายการ', icon: 'exclamation-circle' as const },
    { id: 3, title: 'รีวิวจากลูกค้า', count: '4.8', label: 'คะแนน', icon: 'star' as const },
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
          <Text className="text-xl font-black text-[#5b8c4d]">จัดการร้านค้า</Text>
        </View>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-[#e2edd9] rounded-xl items-center justify-center border border-slate-100">
              <FontAwesome name="home" size={22} color="#5b8c4d" />
            </View>
            <View className="ml-3">
              <Text className="text-base font-black text-slate-800">สถานะร้านค้า</Text>
              <Text className="text-xs font-bold text-slate-400 mt-0.5">
                {isShopOpen ? 'กำลังเปิดรับออเดอร์ลูกค้า' : 'ปิดร้านชั่วคราว'}
              </Text>
            </View>
          </View>
          <Switch
            trackColor={{ false: '#cbd5e1', true: '#a3e635' }}
            thumbColor={isShopOpen ? '#5b8c4d' : '#f1f5f9'}
            onValueChange={() => setIsShopOpen(!isShopOpen)}
            value={isShopOpen}
          />
        </View>

        <View className="mx-4 mt-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
            เมนูการจัดการ
          </Text>
          <View className="flex-row justify-between">
            {managementButtons.map((btn) => (
              <TouchableOpacity
                key={btn.id}
                className="w-[31%] bg-[#f5f6f4] rounded-xl py-3.5 items-center justify-center border border-slate-200/60 active:bg-slate-100 shadow-sm"
              >
                <FontAwesome name={btn.icon} size={20} color={btn.color} />
                <Text className="text-[11px] font-black text-slate-700 mt-2 text-center">
                  {btn.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mx-4 mt-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
            ภาพรวมวันนี้
          </Text>
          <View className="flex-row justify-between">
            {summaryData.map((data) => (
              <View
                key={data.id}
                className="w-[31%] border border-slate-100 rounded-xl p-3 items-center bg-slate-50/50"
              >
                <FontAwesome name={data.icon} size={14} color="#719e64" />
                <Text className="text-[10px] font-bold text-slate-400 mt-1.5">{data.title}</Text>
                <Text className="text-xl font-black text-slate-800 mt-1">{data.count}</Text>
                <Text className="text-[9px] font-bold text-slate-400 mt-0.5">{data.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mx-4 mt-4 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <View className="border-b border-slate-100 p-3.5 bg-slate-50/50">
            <Text className="text-xs font-black text-slate-700">คำสั่งซื้อล่าสุดที่ต้องจัดการ</Text>
          </View>

          <View className="p-4 items-center justify-center py-8">
            <View className="w-12 h-12 bg-slate-100 rounded-full items-center justify-center mb-2">
              <FontAwesome name="check-circle" size={20} color="#b1c2a3" />
            </View>
            <Text className="text-xs font-black text-slate-400">จัดการคำสั่งซื้อทั้งหมดเรียบร้อยแล้ว</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}