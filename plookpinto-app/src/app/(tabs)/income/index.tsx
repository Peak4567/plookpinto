import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function IncomeScreen() {
  const monthlyData = [
    { month: 'ม.ค.', amount: 12500, height: '40%' },
    { month: 'ก.พ.', amount: 15000, height: '50%' },
    { month: 'มี.ค.', amount: 18500, height: '65%' },
    { month: 'เม.ย.', amount: 22000, height: '80%' },
    { month: 'พ.ค.', amount: 26450, height: '100%' },
    { month: 'มิ.ย.', amount: 21000, height: '72%' },
  ];

  const transactions = [
    { id: 1, title: 'ออเดอร์ #10244 - แอปเปิ้ลฟูจิสด', date: 'วันนี้, 14:20', amount: '+340', type: 'income' },
    { id: 2, title: 'ออเดอร์ #10243 - ส้มสายน้ำผึ้ง', date: 'วันนี้, 11:05', amount: '+190', type: 'income' },
    { id: 3, title: 'ถอนเงินเข้าบัญชีธนาคาร', date: 'เมื่อวาน, 18:30', amount: '-5,000', type: 'withdraw' },
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
          <Text className="text-xl font-black text-[#5b8c4d]">รายได้ของร้าน</Text>
        </View>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-4 bg-[#5b8c4d] rounded-2xl p-5 shadow-sm">
          <Text className="text-xs font-bold text-emerald-100 uppercase tracking-wider">
            รายได้สุทธิประจำเดือนนี้
          </Text>
          <Text className="text-3xl font-black text-white mt-2">฿26,450.00</Text>
          <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-emerald-600/50">
            <View>
              <Text className="text-[10px] font-bold text-emerald-100">ยอดถอนได้ปัจจุบัน</Text>
              <Text className="text-sm font-black text-white mt-0.5">฿8,940.00</Text>
            </View>
            <TouchableOpacity className="bg-white rounded-xl px-4 py-2 shadow-sm active:bg-slate-50">
              <Text className="text-xs font-black text-[#5b8c4d]">ถอนเงิน</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mx-4 mt-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
            กราฟสรุปรายได้ 6 เดือนล่าสุด
          </Text>
          
          <View className="h-44 flex-row items-end justify-between pt-4 px-2">
            {monthlyData.map((data, index) => (
              <View key={index} className="items-center flex-1 h-full justify-end">
                <Text className="text-[9px] font-black text-slate-700 mb-1">
                  {data.amount >= 1000 ? `${(data.amount / 1000).toFixed(1)}k` : data.amount}
                </Text>
                <View 
                  style={{ height: data.height }} 
                  className={`w-7 rounded-t-lg ${index === 4 ? 'bg-[#5b8c4d]' : 'bg-[#b1c2a3]'}`} 
                />
                <Text className="text-[10px] font-bold text-slate-400 mt-2">{data.month}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mx-4 mt-4 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <View className="border-b border-slate-100 p-3.5 bg-slate-50/50">
            <Text className="text-xs font-black text-slate-700">ประวัติการทำรายการล่าสุด</Text>
          </View>

          {transactions.map((tx, index) => (
            <View 
              key={tx.id} 
              className={`flex-row items-center justify-between p-4 ${
                index !== transactions.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              <View className="flex-row items-center flex-1 pr-3">
                <View className={`w-9 h-9 rounded-full items-center justify-center ${
                  tx.type === 'income' ? 'bg-emerald-50' : 'bg-rose-50'
                }`}>
                  <FontAwesome 
                    name={tx.type === 'income' ? 'arrow-down' : 'arrow-up'} 
                    size={13} 
                    color={tx.type === 'income' ? '#5b8c4d' : '#f43f5e'} 
                  />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-xs font-black text-slate-800" numberOfLines={1}>
                    {tx.title}
                  </Text>
                  <Text className="text-[10px] font-bold text-slate-400 mt-0.5">{tx.date}</Text>
                </View>
              </View>
              <Text className={`text-sm font-black ${
                tx.type === 'income' ? 'text-[#5b8c4d]' : 'text-rose-500'
              }`}>
                {tx.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}