import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function OrderHistoryScreen() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', title: 'ทั้งหมด' },
    { id: 'pending', title: 'ที่ต้องชำระ' },
    { id: 'shipping', title: 'ต้องจัดส่ง' },
    { id: 'completed', title: 'สำเร็จแล้ว' },
  ];

  const orders = [
    {
      id: '1',
      shopName: 'สวนป้าสมร ผักออร์แกนิก',
      status: 'completed',
      statusText: 'สำเร็จแล้ว',
      items: [
        { name: 'แอปเปิ้ลฟูจิสด', qty: 2, price: 120, icon: '🍎' },
        { name: 'ผักสลัดคอส', qty: 1, price: 45, icon: '🌿' },
      ],
      totalPrice: 285,
      shippingFee: 40,
    },
    {
      id: '2',
      shopName: 'บ้านสวนส้มสายน้ำผึ้ง',
      status: 'shipping',
      statusText: 'กำลังจัดส่ง',
      items: [
        { name: 'ส้มสายน้ำผึ้ง 1kg', qty: 1, price: 95, icon: '🍏' },
      ],
      totalPrice: 135,
      shippingFee: 40,
    },
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
          <Text className="text-xl font-black text-[#5b8c4d]">ประวัติการสั่งซื้อ</Text>
        </View>
        <View className="w-10" />
      </View>

      <View className="bg-white flex-row justify-around border-b border-slate-200">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            className={`py-3 px-2 border-b-2 ${
              activeTab === tab.id ? 'border-[#5b8c4d]' : 'border-transparent'
            }`}
          >
            <Text
              className={`text-xs ${
                activeTab === tab.id ? 'font-black text-[#5b8c4d]' : 'font-bold text-slate-500'
              }`}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {orders
          .filter((order) => activeTab === 'all' || order.status === activeTab)
          .map((order) => (
            <View key={order.id} className="mx-4 mb-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <View className="flex-row justify-between items-center border-b border-slate-100 pb-2 mb-3">
                <View className="flex-row items-center">
                  <FontAwesome name="shopping-basket" size={14} color="#5b8c4d" />
                  <Text className="text-xs font-black text-slate-800 ml-2">{order.shopName}</Text>
                </View>
                <Text
                  className={`text-[11px] font-black ${
                    order.status === 'completed' ? 'text-[#5b8c4d]' : 'text-orange-500'
                  }`}
                >
                  {order.statusText}
                </Text>
              </View>

              {order.items.map((item, index) => (
                <View key={index} className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center flex-1">
                    <View className="w-10 h-10 bg-slate-100 rounded-xl items-center justify-center border border-slate-200/60">
                      <Text className="text-xl">{item.icon}</Text>
                    </View>
                    <View className="ml-3 flex-1">
                      <Text className="text-xs font-black text-slate-800" numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text className="text-[10px] font-bold text-slate-400 mt-0.5">
                        จำนวน: {item.qty}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-xs font-black text-slate-700">฿{item.price}</Text>
                </View>
              ))}

              <View className="flex-row justify-between items-center border-t border-slate-100 pt-3 mt-1">
                <Text className="text-[10px] font-bold text-slate-400">
                  รวมการจัดส่ง (ค่าส่ง ฿{order.shippingFee})
                </Text>
                <View className="flex-row items-baseline">
                  <Text className="text-[10px] font-bold text-slate-700 mr-1">ยอดคำสั่งซื้อทั้งหมด:</Text>
                  <Text className="text-sm font-black text-[#5b8c4d]">฿{order.totalPrice}</Text>
                </View>
              </View>

              <View className="flex-row justify-end mt-4 pt-3 border-t border-slate-50">
                <TouchableOpacity className="border border-slate-300 rounded-xl px-4 py-1.5 mr-2 active:bg-slate-50">
                  <Text className="text-[11px] font-black text-slate-600">รายละเอียด</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#5b8c4d] rounded-xl px-4 py-1.5 active:bg-[#4a733e]">
                  <Text className="text-[11px] font-black text-white">ซื้ออีกครั้ง</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}