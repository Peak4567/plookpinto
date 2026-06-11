import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditAddressScreen() {
  const router = useRouter();
  const [houseNo, setHouseNo] = useState('');
  const [subDistrict, setSubDistrict] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');

  const handleSaveAddress = () => {
    if (!houseNo || !subDistrict || !district || !province) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกที่อยู่ให้ครบทุกช่องด้วยครับ พีค');
      return;
    }
    // ตรงนี้รอเอาไปเชื่อมต่อบันทึกข้อมูลเข้าฐานข้อมูล PostgreSQL ครับ
    Alert.alert('สำเร็จ', 'บันทึกที่อยู่จัดส่งเรียบร้อยแล้ว!', [
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
        <Text className="text-lg font-black text-slate-800">แก้ไขที่อยู่จัดส่ง</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <View className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-6 space-y-4">
          
          {/* ช่องที่ 1: บ้านเลขที่ / รายละเอียด */}
          <View>
            <Text className="text-xs font-black text-slate-500 mb-1.5">บ้านเลขที่ / ซอย / ถนน / หมู่บ้าน</Text>
            <View className="bg-[#f5f6f4] rounded-xl border border-slate-200 px-3">
              <TextInput
                className="text-slate-800 font-bold text-sm h-11"
                placeholder="เช่น 123/4 หมู่ 5 หมู่บ้านพฤกษา"
                value={houseNo}
                onChangeText={setHouseNo}
              />
            </View>
          </View>

          {/* ช่องที่ 2: ตำบล */}
          <View>
            <Text className="text-xs font-black text-slate-500 mb-1.5">ตำบล / แขวง</Text>
            <View className="bg-[#f5f6f4] rounded-xl border border-slate-200 px-3">
              <TextInput
                className="text-slate-800 font-bold text-sm h-11"
                placeholder="กรอกตำบล"
                value={subDistrict}
                onChangeText={setSubDistrict}
              />
            </View>
          </View>

          {/* ช่องที่ 3: อำเภอ */}
          <View>
            <Text className="text-xs font-black text-slate-500 mb-1.5">อำเภอ / เขต</Text>
            <View className="bg-[#f5f6f4] rounded-xl border border-slate-200 px-3">
              <TextInput
                className="text-slate-800 font-bold text-sm h-11"
                placeholder="กรอกอำเภอ"
                value={district}
                onChangeText={setDistrict}
              />
            </View>
          </View>

          {/* ช่องที่ 4: จังหวัด */}
          <View>
            <Text className="text-xs font-black text-slate-500 mb-1.5">จังหวัด</Text>
            <View className="bg-[#f5f6f4] rounded-xl border border-slate-200 px-3">
              <TextInput
                className="text-slate-800 font-bold text-sm h-11"
                placeholder="กรอกจังหวัด"
                value={province}
                onChangeText={setProvince}
              />
            </View>
          </View>

        </View>

        {/* ปุ่มบันทึกข้อมูล */}
        <TouchableOpacity 
          onPress={handleSaveAddress}
          className="bg-[#6b9649] rounded-xl py-3.5 items-center justify-center shadow-md active:bg-[#587d3c]"
        >
          <Text className="text-base font-black text-white">บันทึกที่อยู่</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}