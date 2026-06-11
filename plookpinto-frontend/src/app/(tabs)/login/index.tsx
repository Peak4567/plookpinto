import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [account, setAccount] = useState(''); 
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handleLogin = async () => {
    if (!account.trim() || !password.trim()) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกชื่อบัญชีและรหัสผ่านให้ครบถ้วนครับ');
      return;
    }
    
    try {
      setLoading(true);

      const IP_ADDRESS = '10.0.2.2'; 
      const BACKEND_URL = `http://${IP_ADDRESS}:8000/api/login`;

      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: account.trim(), 
          password: password,
        }),
      });

      const responseText = await response.text();
      let data: any = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch (e) {
          throw new Error('เซิร์ฟเวอร์ตอบกลับด้วยข้อมูลที่ไม่ได้อยู่ในรูปแบบ JSON');
        }
      }

      if (!response.ok) {
        throw new Error(data.error || `เกิดข้อผิดพลาดรหัส ${response.status}`);
      }

      // บันทึกค่าสถานะล็อกอินลง SecureStore ของเครื่องจำลอง
      await SecureStore.setItemAsync('userToken', 'isLoggedIn_True');
      await SecureStore.setItemAsync('username', data.user.username);

      Alert.alert('สำเร็จ', data.message || 'เข้าสู่ระบบเรียบร้อยแล้วครับ!', [
        { 
          text: 'ตกลง', 
          onPress: () => {
            router.replace('/account'); 
          } 
        }
      ]);

      setPassword('');

    } catch (error: any) {
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
          <Text className="text-2xl font-black text-[#5b8c4d]">ลงชื่อเข้าใช้</Text>
          <Text className="text-xs font-bold text-slate-500 mt-1">ยินดีต้อนรับกลับมา!</Text>
        </View>

        <View className="mx-4 mt-5 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm relative pt-10">
          <View className="absolute -top-7 left-0 right-0 items-center">
            <View className="w-14 h-14 bg-[#e2edd9] rounded-full items-center justify-center border border-white shadow-sm">
              <FontAwesome name="user" size={26} color="#5b8c4d" />
            </View>
          </View>

          <View className="bg-[#f5f6f4] rounded-xl flex-row items-center border border-slate-200 overflow-hidden mb-4 mt-2">
            <View className="w-12 h-12 items-center justify-center border-r border-slate-200/60">
              <FontAwesome name="user-o" size={18} color="#5b8c4d" />
            </View>
            <View className="flex-1 px-3 py-1">
              <TextInput
                className="text-slate-800 font-bold text-sm h-6 p-0"
                placeholder="กรอกชื่อบัญชี"
                placeholderTextColor="#a0aec0"
                value={account}
                onChangeText={setAccount}
                autoCapitalize="none"
                editable={!loading}
              />
              <Text className="text-[10px] text-slate-400 font-medium">ชื่อผู้ใช้งานในระบบ</Text>
            </View>
          </View>

          <View className="bg-[#f5f6f4] rounded-xl flex-row items-center border border-slate-200 overflow-hidden mb-5">
            <View className="w-12 h-12 items-center justify-center border-r border-slate-200/60">
              <FontAwesome name="lock" size={20} color="#5b8c4d" />
            </View>
            <View className="flex-1 px-3 py-1">
              <TextInput
                className="text-slate-800 font-bold text-sm h-6 p-0"
                placeholder="กรอกรหัสผ่าน"
                placeholderTextColor="#a0aec0"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                editable={!loading}
              />
              <Text className="text-[10px] text-slate-400 font-medium">รหัสผ่านของบัญชีคุณ</Text>
            </View>
            <TouchableOpacity 
              className="w-12 h-12 items-center justify-center"
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <FontAwesome name={isPasswordVisible ? "eye-slash" : "eye"} size={16} color="#5b8c4d" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            className="bg-[#6b9649] rounded-xl py-3 items-center justify-center shadow-sm active:bg-[#587d3c]"
            onPress={handleLogin}
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
            <Text className="text-xs font-bold text-slate-500 mx-3">หรือ</Text>
            <View className="flex-1 h-[1px] bg-slate-200" />
          </View>

          <TouchableOpacity className="w-full border border-slate-300 rounded-xl py-2.5 flex-row items-center justify-center mb-3 active:bg-slate-50">
            <FontAwesome name="google" size={18} color="#ea4335" />
            <Text className="text-xs font-black text-slate-700 ml-2">เข้าสู่ระบบด้วย Google</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-full border border-slate-300 rounded-xl py-2.5 flex-1 flex-row items-center justify-center active:bg-slate-50">
            <FontAwesome name="facebook-official" size={18} color="#1877f2" />
            <Text className="text-xs font-black text-slate-700 ml-2">เข้าสู่ระบบด้วย Facebook</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center mt-6">
          <Link href="/login/forgot-password" asChild>
            <TouchableOpacity className="mb-4">
              <Text className="text-xs font-bold text-[#5b8c4d]">ลืมรหัสผ่าน?</Text>
            </TouchableOpacity>
          </Link>
          
          <View className="flex-row items-center">
            <Text className="text-xs font-bold text-slate-500">ยังไม่มีบัญชี? </Text>
            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text className="text-xs font-black text-[#5b8c4d]">สมัครสมาชิก</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}