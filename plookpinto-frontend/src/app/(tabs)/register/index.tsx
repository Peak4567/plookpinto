import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบทุกช่องครับ พีค');
      return;
    }

    if (password.length < 6) {
      Alert.alert('แจ้งเตือน', 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษรครับ');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('แจ้งเตือน', 'รหัสผ่านทั้งสองช่องไม่ตรงกันครับ');
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch('http://192.168.1.10:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
        }),
      });

      // 🌟 อ่านข้อมูลแบบ Safe parsing เพื่อป้องกันปัญหา Unexpected end of input
      const responseText = await response.text();
      let data: any = {};
      
      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch (e) {
          throw new Error('เซิร์ฟเวอร์ตอบกลับด้วยข้อมูลที่ไม่ได้อยู่ในรูปแบบ JSON');
        }
      }

      // 🌟 ตรวจสอบความถูกต้องของ HTTP Status Code ก่อนนำข้อมูลไปเล่นต่อ
      if (!response.ok) {
        throw new Error(data.error || `เกิดข้อผิดพลาดรหัส ${response.status}`);
      }

      // บันทึกลง PostgreSQL ในคอมพีคเรียบร้อย
      Alert.alert('สำเร็จ', data.message || 'ลงทะเบียนเข้าฐานข้อมูลในคอมเรียบร้อยแล้วครับ!', [
        { text: 'ตกลง', onPress: () => router.push('/account') }
      ]);
      
      setUsername('');
      setPassword('');
      setConfirmPassword('');

    } catch (error: any) {
      // ดักจับ Error แล้วแสดงข้อความจริงจากหลังบ้านให้พีคเห็นทันที
      Alert.alert('ล้มเหลว', error.message || 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์หลังบ้านได้');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#f8f9fa]">
      <View className="bg-white px-4 pt-14 pb-4 flex-row items-center justify-between border-b border-slate-100">
        <Link href="/account" asChild>
          <TouchableOpacity className="flex-row items-center">
            <FontAwesome name="chevron-left" size={16} color="#5b8c4d" />
            <Text className="text-sm font-bold text-slate-700 ml-1">กลับหน้าเดิม</Text>
          </TouchableOpacity>
        </Link>
        
        <View className="absolute left-0 right-0 top-14 items-center -z-10">
          <Text className="text-xl font-black text-[#5b8c4d]">plook pinto</Text>
        </View>

        <TouchableOpacity className="p-1">
          <FontAwesome name="bell" size={22} color="#5b8c4d" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mt-6">
          <Text className="text-2xl font-black text-[#5b8c4d]">ลงทะเบียน</Text>
          <Text className="text-xs font-bold text-slate-500 mt-1">สร้างบัญชีใหม่เพื่อใช้งานแอปพลิเคชัน</Text>
        </View>

        <View className="mx-4 mt-5 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <View className="bg-[#f5f6f4] rounded-xl flex-row items-center border border-slate-200 overflow-hidden mb-4">
            <View className="w-12 h-12 items-center justify-center border-r border-slate-200/60">
              <FontAwesome name="user" size={18} color="#5b8c4d" />
            </View>
            <View className="flex-1 px-3 py-1">
              <TextInput
                className="text-slate-800 font-bold text-sm h-6 p-0"
                placeholder="ตั้งชื่อบัญชี"
                placeholderTextColor="#a0aec0"
                value={username}
                onChangeText={setUsername}
                editable={!loading}
              />
              <Text className="text-[10px] text-slate-400 font-medium">ใช้สำหรับแสดงชื่อของคุณในระบบ</Text>
            </View>
          </View>

          <View className="bg-[#f5f6f4] rounded-xl flex-row items-center border border-slate-200 overflow-hidden mb-4">
            <View className="w-12 h-12 items-center justify-center border-r border-slate-200/60">
              <FontAwesome name="lock" size={20} color="#5b8c4d" />
            </View>
            <View className="flex-1 px-3 py-1">
              <TextInput
                className="text-slate-800 font-bold text-sm h-6 p-0"
                placeholder="ตั้งรหัสผ่าน"
                placeholderTextColor="#a0aec0"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                editable={!loading}
              />
              <Text className="text-[10px] text-slate-400 font-medium">รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร</Text>
            </View>
          </View>

          <View className="bg-[#f5f6f4] rounded-xl flex-row items-center border border-slate-200 overflow-hidden mb-5">
            <View className="w-12 h-12 items-center justify-center border-r border-slate-200/60">
              <FontAwesome name="check-square-o" size={18} color="#5b8c4d" />
            </View>
            <View className="flex-1 px-3 py-1">
              <TextInput
                className="text-slate-800 font-bold text-sm h-6 p-0"
                placeholder="ยืนยันรหัสผ่าน"
                placeholderTextColor="#a0aec0"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                editable={!loading}
              />
              <Text className="text-[10px] text-slate-400 font-medium">กรอกรหัสผ่านอีกครั้ง</Text>
            </View>
          </View>

          <TouchableOpacity 
            className="bg-[#6b9649] rounded-xl py-3 items-center justify-center shadow-sm active:bg-[#587d3c]"
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-base font-black text-white tracking-wide">ตกลง</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="mx-4 mt-6 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm items-center">
          <View className="flex-row items-center w-full mb-4">
            <View className="flex-1 h-[1px] bg-slate-200" />
            <Text className="text-xs font-bold text-slate-500 mx-3">สามารถเลือกช่องทางต่อไปนี้ได้</Text>
            <View className="flex-1 h-[1px] bg-slate-200" />
          </View>

          <TouchableOpacity className="w-full border border-slate-300 rounded-xl py-2.5 flex-row items-center justify-center mb-3 active:bg-slate-50">
            <FontAwesome name="google" size={18} color="#ea4335" />
            <Text className="text-xs font-black text-slate-700 ml-2">สมัครด้วย Google</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-full border border-slate-300 rounded-xl py-2.5 flex-row items-center justify-center active:bg-slate-50">
            <FontAwesome name="facebook-official" size={18} color="#1877f2" />
            <Text className="text-xs font-black text-slate-700 ml-2">สมัครด้วย Facebook</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center items-center mt-6">
          <Text className="text-xs font-bold text-slate-500">มีบัญชีอยู่แล้ว? </Text>
          <Link href="/account" asChild>
            <TouchableOpacity>
              <Text className="text-xs font-black text-[#5b8c4d]">เข้าสู่ระบบ</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}