import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HelpCenterScreen() {
  const faqs = [
    { id: 1, question: 'วิธีลงทะเบียนเปิดร้านค้าสำหรับผู้ขายใหม่' },
    { id: 2, question: 'ช่องทางการชำระเงินและเงื่อนไขการถอนเงิน' },
    { id: 3, question: 'การเคลมสินค้ากรณีสินค้าเสียหายจากขนส่ง' },
    { id: 4, question: 'ติดต่อฝ่ายสนับสนุนลูกค้าของ Plook Pinto' },
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
          <Text className="text-xl font-black text-[#5b8c4d]">ศูนย์ช่วยเหลือ</Text>
        </View>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120, paddingTop: 16 }} showsVerticalScrollIndicator={false}>
        <View className="mx-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-4">
          <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">คำถามที่พบบ่อย (FAQ)</Text>
          <View className="border border-slate-100 rounded-xl overflow-hidden">
            {faqs.map((faq, index) => (
              <TouchableOpacity key={faq.id} className={`flex-row items-center justify-between p-3.5 bg-white active:bg-slate-50 ${index !== faqs.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <Text className="text-xs font-bold text-slate-700 flex-1 pr-2">{faq.question}</Text>
                <FontAwesome name="chevron-right" size={12} color="#b1c2a3" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mx-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm items-center">
          <Text className="text-xs font-black text-slate-700 text-center mb-3">หากยังพบปัญหาการใช้งาน สามารถติดต่อเราได้โดยตรง</Text>
          <TouchableOpacity className="bg-[#5b8c4d] rounded-xl py-2.5 w-full flex-row items-center justify-center shadow-sm active:bg-[#4a733e]">
            <FontAwesome name="commenting-o" size={16} color="white" />
            <Text className="text-xs font-black text-white ml-2">แชทติดต่อเจ้าหน้าที่</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}