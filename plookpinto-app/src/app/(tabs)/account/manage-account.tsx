import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ManageAccountScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('พีค'); // ใส่เป็นตัวแปรธรรมดาไว้ก่อนเพื่อแก้ Error
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleUpdateProfile = () => {
    Alert.alert('สำเร็จ', 'อัปเดตข้อมูลบัญชีเรียบร้อยแล้วครับ');
  };

  return (
    <View className="flex-1 bg-[#f8f9fa]">
      <View className="bg-white px-4 pt-14 pb-4 flex-row items-center border-b border-slate-100">
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
          <FontAwesome name="chevron-left" size={16} color="#5b8c4d" />
          <Text className="text-sm font-bold text-slate-700 ml-1">ย้อนกลับ</Text>
        </TouchableOpacity>
        
        <View className="absolute left-0 right-0 top-14 items-center -z-10">
          <Text className="text-lg font-black text-slate-800">จัดการบัญชี</Text>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 60 }}>
        {/* ส่วนแสดง Avatar */}
        <View className="items-center mt-6">
          <View className="w-24 h-24 bg-[#e2edd9] rounded-full items-center justify-center border-4 border-white shadow-sm">
            <FontAwesome name="user" size={48} color="#5b8c4d" />
          </View>
          <Text className="text-lg font-black text-slate-800 mt-3">{username}</Text>
          <Text className="text-xs font-bold text-slate-400">ผู้ใช้งานระบบ plook pinto</Text>
        </View>

        {/* ฟอร์มกรอกข้อมูล */}
        <View className="mx-4 mt-6 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <Text className="text-sm font-black text-slate-800 mb-4 border-b border-slate-100 pb-2">
            ข้อมูลส่วนตัว
          </Text>

          <View className="mb-4">
            <Text className="text-xs font-bold text-slate-500 mb-1.5">ชื่อบัญชีผู้ใช้</Text>
            <View className="bg-slate-50 rounded-xl flex-row items-center border border-slate-200 overflow-hidden px-3 py-2.5">
              <FontAwesome name="user-o" size={16} color="#94a3b8" />
              <Text className="text-slate-500 font-bold text-sm ml-2.5">{username}</Text>
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-xs font-bold text-slate-500 mb-1.5">อีเมล</Text>
            <View className="bg-[#f5f6f4] rounded-xl flex-row items-center border border-slate-200 overflow-hidden px-3 py-1">
              <FontAwesome name="envelope-o" size={15} color="#5b8c4d" />
              <TextInput
                className="flex-1 text-slate-800 font-bold text-sm h-9 ml-2.5 p-0"
                placeholder="กรอกอีเมลของคุณ"
                placeholderTextColor="#a0aec0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity 
            onPress={handleUpdateProfile}
            className="bg-[#6b9649] rounded-xl py-3 items-center justify-center shadow-sm active:bg-[#587d3c]"
          >
            <Text className="text-base font-black text-white tracking-wide">บันทึกการเปลี่ยนแปลง</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}