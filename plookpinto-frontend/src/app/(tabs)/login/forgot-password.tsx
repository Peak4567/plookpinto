import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!username.trim()) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกชื่อบัญชีผู้ใช้ที่ต้องการกู้คืนด้วยครับ พีค');
      return;
    }

    try {
      setLoading(true);

      // ยิงข้อมูลไปหาเซิร์ฟเวอร์หลังบ้าน Node.js พอร์ต 5000 
      // 💡 อย่าลืมปรับเลข IP หากเทสบนอุปกรณ์จริงหรือ iOS Simulator ตามที่เราเคยคุยกันนะคร้าบ
      const response = await fetch('http://10.0.2.2:5000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim() }),
      });

      const responseText = await response.text();
      if (!responseText) {
        throw new Error('เซิร์ฟเวอร์หลังบ้านส่งข้อมูลกลับมาว่างเปล่า');
      }

      const data = JSON.parse(responseText);

      if (!response.ok) {
        throw new Error(data.error || 'เกิดข้อผิดพลาดในการขอรีเซ็ตรหัสผ่าน');
      }

      // ในแอปจริงปกติระบบจะส่งลิงก์กู้คืนไปที่อีเมล แต่นี่เราทำระบบจำลองให้ขึ้น Alert บอกรหัสผ่านใหม่เพื่อความง่ายในการทดสอบครับ
      Alert.alert('กู้คืนสำเร็จ', `ระบบได้ตั้งรหัสผ่านชั่วคราวให้คุณแล้ว:\n🔑 รหัสผ่านใหม่: ${data.temporaryPassword}`, [
        { text: 'ตกลง', onPress: () => router.replace('/login') }
      ]);

    } catch (error: any) {
      Alert.alert('ล้มเหลว', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#f8f9fa]">
      {/* ส่วนหัว Header */}
      <View className="bg-white px-4 pt-14 pb-4 flex-row items-center justify-between border-b border-slate-100 shadow-sm">
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center p-1">
          <FontAwesome name="chevron-left" size={16} color="#5b8c4d" />
          <Text className="text-sm font-bold text-slate-700 ml-1">กลับ</Text>
        </TouchableOpacity>
        <Text className="text-lg font-black text-slate-800">กู้คืนรหัสผ่าน</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 p-4 mt-4" showsVerticalScrollIndicator={false}>
        <View className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6">
          <Text className="text-xl font-black text-[#5b8c4d] mb-1">พบปัญหาในการเข้าสู่ระบบ?</Text>
          <Text className="text-xs font-bold text-slate-400 mb-5">กรอกชื่อบัญชีผู้ใช้ของคุณด้านล่าง เพื่อขอรับรหัสผ่านชั่วคราวในการล็อกอินเข้าสู่ระบบ PlookPinto</Text>

          <View className="bg-[#f5f6f4] rounded-xl flex-row items-center border border-slate-200 overflow-hidden px-3 mb-4">
            <FontAwesome name="user" size={16} color="#5b8c4d" className="mr-2" />
            <TextInput
              className="flex-1 text-slate-800 font-bold text-sm h-12"
              placeholder="กรอกชื่อบัญชีของคุณ"
              placeholderTextColor="#a0aec0"
              value={username}
              onChangeText={setUsername}
              editable={!loading}
            />
          </View>

          <TouchableOpacity 
            onPress={handleResetPassword}
            disabled={loading}
            className="bg-[#6b9649] rounded-xl py-3.5 items-center justify-center shadow-sm active:bg-[#587d3c]"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-base font-black text-white">ขอรหัสผ่านใหม่</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}