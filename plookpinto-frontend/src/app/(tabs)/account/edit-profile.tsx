import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('พีค ศรัณยกร'); // พีคสามารถเปลี่ยนค่าเริ่มต้นตรงนี้ได้ครับ

  const handleSaveProfile = () => {
    if (!name.trim()) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกชื่อผู้ใช้งานด้วยครับ');
      return;
    }
    // ตรงนี้ในอนาคตเอาไว้ใส่ฟังก์ชันยิงไปหลังบ้านเซฟลง PostgreSQL นะครับ
    Alert.alert('สำเร็จ', 'บันทึกข้อมูลโปรไฟล์เรียบร้อยแล้วครับ!', [
      { text: 'ตกลง', onPress: () => router.back() }
    ]);
  };

  return (
    <View className="flex-1 bg-[#f8f9fa]">
      {/* ส่วนหัว Header */}
      <View className="bg-white px-4 pt-14 pb-4 flex-row items-center justify-between border-b border-slate-100 shadow-sm">
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
          <FontAwesome name="chevron-left" size={16} color="#5b8c4d" />
          <Text className="text-sm font-bold text-slate-700 ml-1">ยกเลิก</Text>
        </TouchableOpacity>
        <Text className="text-lg font-black text-slate-800">แก้ไขโปรไฟล์</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* โซนแก้ไขรูปภาพโปรไฟล์ */}
        <View className="items-center my-6">
          <TouchableOpacity className="w-28 h-28 bg-[#f5f6f4] rounded-full items-center justify-center border border-dashed border-slate-300 relative shadow-inner">
            <FontAwesome name="user" size={48} color="#b1c2a3" />
            <View className="absolute bottom-0 right-0 bg-[#6b9649] w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-md">
              <FontAwesome name="camera" size={12} color="white" />
            </View>
          </TouchableOpacity>
          <Text className="text-xs font-bold text-[#5b8c4d] mt-3">แตะเพื่อเปลี่ยนรูปโปรไฟล์</Text>
        </View>

        {/* ฟอร์มกรอกชื่อ */}
        <View className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-6">
          <Text className="text-xs font-black text-slate-500 mb-2">ชื่อบัญชีผู้ใช้งาน</Text>
          <View className="bg-[#f5f6f4] rounded-xl flex-row items-center border border-slate-200 overflow-hidden px-3">
            <FontAwesome name="user" size={16} color="#5b8c4d" className="mr-2" />
            <TextInput
              className="flex-1 text-slate-800 font-bold text-sm h-11"
              placeholder="กรอกชื่อของคุณ"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        {/* ปุ่มบันทึกข้อมูล */}
        <TouchableOpacity 
          onPress={handleSaveProfile}
          className="bg-[#6b9649] rounded-xl py-3.5 items-center justify-center shadow-md active:bg-[#587d3c]"
        >
          <Text className="text-base font-black text-white">บันทึกโปรไฟล์</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}