import { FontAwesome } from '@expo/vector-icons';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useCallback, useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function AccountScreen() {
  const router = useRouter(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [currentUsername, setCurrentUsername] = useState('-'); 
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  
  // 🌟 1. เพิ่ม State สำหรับจำว่าผู้ใช้เลือกโหมดไหนอยู่ ('user' หรือ 'seller')
  const [activeRole, setActiveRole] = useState<'user' | 'seller'>('user');

  // ดึงสถานะจาก SecureStore ทุกครั้งที่ผู้ใช้สลับหน้าจอกลับเข้ามาหน้านี้
  useFocusEffect(
    useCallback(() => {
      const checkLoginStatus = async () => {
        try {
          const token = await SecureStore.getItemAsync('userToken');
          const storedName = await SecureStore.getItemAsync('username');
          
          if (token === 'isLoggedIn_True') {
            setIsLoggedIn(true);
            setCurrentUsername(storedName || 'ผู้ใช้งาน');
          } else {
            setIsLoggedIn(false);
            setCurrentUsername('-');
          }
        } catch (error) {
          console.error('Error checking login status:', error);
        }
      };
      checkLoginStatus();
    }, [])
  );

  const menuItems: { id: number; title: string; icon: any; href: string }[] = [
    { id: 1, title: 'ประวัติการสั่งซื้อ', icon: 'file-text', href: '/history' },
    { id: 2, title: 'จัดการร้านค้า', icon: 'home', href: '/manage-shop' },
    { id: 3, title: 'รายได้ต่อเดือน (ตัวเลขกับกราฟ)', icon: 'credit-card', href: '/income' },
    { id: 4, title: 'รายการสินค้าที่เหลือ', icon: 'shopping-bag', href: '/product-stock' },
    { id: 5, title: 'จำนวนคำสั่งซื้อ', icon: 'list-alt', href: '/order-count' },
    { id: 6, title: 'ค่าแนบเฉลี่ยร้าน', icon: 'bar-chart', href: '/shop-rating' },
    { id: 7, title: 'ศูนย์ช่วยเหลือ', icon: 'support', href: '/help-center' },
  ];

  const confirmLogout = async () => {
    try {
      setLogoutModalVisible(false); 
      await SecureStore.deleteItemAsync('userToken'); 
      await SecureStore.deleteItemAsync('username'); 
      
      setIsLoggedIn(false);
      setCurrentUsername('-');
      router.replace('/home'); 
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View className="flex-1 bg-[#f8f9fa]">
      {/* ส่วนหัวแอปพลิเคชัน Header */}
      <View className="bg-white px-4 pt-14 pb-4 flex-row items-center justify-between border-b border-slate-100">
        <Link href="/home" asChild>
          <TouchableOpacity className="flex-row items-center">
            <FontAwesome name="chevron-left" size={16} color="#5b8c4d" />
            <Text className="text-sm font-bold text-slate-700 ml-1">กลับหน้าเดิม</Text>
          </TouchableOpacity>
        </Link>
        
        <View className="absolute left-0 right-0 top-14 items-center -z-10">
          <Text className="text-xl font-black text-[#5b8c4d]">โปรไฟล์</Text>
          <Text className="text-xs font-bold text-slate-500 mt-0.5">
            {isLoggedIn ? `สวัสดีครับคุณ ${currentUsername}` : 'หน้า 3 โปรไฟล์'}
          </Text>
        </View>
        <View className="w-10" />
      </View>

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        
        {!isLoggedIn ? (
          <View className="flex-row mx-4 mt-4 justify-between">
            <Link href="/login" asChild>
              <TouchableOpacity className="bg-[#5b8c4d] rounded-xl py-2.5 flex-1 mr-1.5 flex-row items-center justify-center shadow-sm active:bg-[#4a733e]">
                <FontAwesome name="sign-in" size={14} color="white" />
                <Text className="text-xs font-black text-white ml-1.5">เข้าสู่ระบบ</Text>
              </TouchableOpacity>
            </Link>
            
            <Link href="/register" asChild>
              <TouchableOpacity className="bg-white border border-[#5b8c4d] rounded-xl py-2.5 flex-1 ml-1.5 flex-row items-center justify-center shadow-sm active:bg-slate-50">
                <FontAwesome name="user-plus" size={13} color="#5b8c4d" />
                <Text className="text-xs font-black text-[#5b8c4d] ml-1.5">สมัครสมาชิก</Text>
              </TouchableOpacity>
            </Link>
          </View>
        ) : (
          <View className="flex-row mx-4 mt-4 justify-between">
            <Link href="/account/manage-account" asChild>
              <TouchableOpacity className="bg-[#5b8c4d] rounded-xl py-2.5 flex-1 mr-1.5 flex-row items-center justify-center shadow-sm active:bg-[#4a733e]">
                <FontAwesome name="sliders" size={14} color="white" />
                <Text className="text-xs font-black text-white ml-1.5">จัดการบัญชี</Text>
              </TouchableOpacity>
            </Link>
            
            <TouchableOpacity 
              onPress={() => setLogoutModalVisible(true)}
              className="bg-white border border-red-500 rounded-xl py-2.5 flex-1 ml-1.5 flex-row items-center justify-center shadow-sm active:bg-red-50"
            >
              <FontAwesome name="sign-out" size={14} color="#ef4444" />
              <Text className="text-xs font-black text-red-500 ml-1.5">ออกจากระบบ</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* บล็อกแสดงข้อมูลรายละเอียดผู้ใช้งานและการ์ดที่อยู่ */}
        <View className="mx-4 mt-4 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          
          {/* 🌟 2. ปรับปรุงแท็บสลับโหมดผู้ซื้อ / ผู้ขาย ให้กดสลับคลาสสีได้ตามโหมดที่เลือกจริง */}
          <View className="flex-row h-10 border-b border-slate-100">
            <TouchableOpacity 
              onPress={() => setActiveRole('user')}
              className={`flex-1 flex-row items-center justify-center ${activeRole === 'user' ? 'bg-[#e2edd9]' : 'bg-[#fafafa]'}`}
            >
              <FontAwesome name="user" size={16} color={activeRole === 'user' ? '#5b8c4d' : '#94a3b8'} />
              <Text className={`text-xs font-black ml-1.5 ${activeRole === 'user' ? 'text-[#5b8c4d]' : 'text-slate-400'}`}>for user</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setActiveRole('seller')}
              className={`flex-1 flex-row items-center justify-center ${activeRole === 'seller' ? 'bg-[#e2edd9]' : 'bg-[#fafafa]'}`}
            >
              <FontAwesome name="building" size={15} color={activeRole === 'seller' ? '#5b8c4d' : '#94a3b8'} />
              <Text className={`text-xs font-black ml-1.5 ${activeRole === 'seller' ? 'text-[#5b8c4d]' : 'text-slate-400'}`}>สำหรับผู้ขาย</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row p-4">
            <View className="w-[45%] items-center justify-center pr-2">
              <TouchableOpacity className="w-full aspect-square bg-[#f5f6f4] rounded-xl items-center justify-center border border-dashed border-slate-300 p-2">
                <FontAwesome name="picture-o" size={32} color="#b1c2a3" />
                <Text className="text-[10px] font-bold text-slate-400 text-center mt-2">
                  {activeRole === 'user' ? 'ภาพหน้าโปรไฟล์' : 'โลโก้ร้านค้า'}
                </Text>
                <Text className="text-[9px] font-bold text-slate-400 text-center mt-0.5">
                  (แตะเพื่อแก้ไขรูป)
                </Text>
              </TouchableOpacity>
            </View>

            {/* 🌟 3. เงื่อนไขสลับการแสดงผลข้อมูลตามปุ่มที่พีคกดเลือก */}
            {activeRole === 'user' ? (
              // ข้อมูลฝั่งผู้ซื้อ (User Address)
              <View className="w-[55%] pl-2 justify-between">
                <View className="border-b border-slate-100 pb-1">
                  <Text className="text-[11px] font-bold text-slate-700">ชื่อบัญชี: {currentUsername}</Text>
                </View>
                <View className="border-b border-slate-100 py-1"><Text className="text-[11px] font-bold text-slate-700">บ้านเลขที่ -</Text></View>
                <View className="border-b border-slate-100 py-1"><Text className="text-[11px] font-bold text-slate-700">ตำบล -</Text></View>
                <View className="border-b border-slate-100 py-1"><Text className="text-[11px] font-bold text-slate-700">อำเภอ -</Text></View>
                <View className="py-1"><Text className="text-[11px] font-bold text-slate-700">จังหวัด -</Text></View>
              </View>
            ) : (
              // ข้อมูลฝั่งร้านค้าผู้ขาย (Seller Shop Data)
              <View className="w-[55%] pl-2 justify-between">
                <View className="border-b border-slate-100 pb-1">
                  <Text className="text-[11px] font-black text-[#5b8c4d]">ร้านค้า: สวนผักอินทรีย์ของ {currentUsername}</Text>
                </View>
                <View className="border-b border-slate-100 py-1"><Text className="text-[11px] font-bold text-slate-700">สถานะร้าน: เปิดบริการ 🌱</Text></View>
                <View className="border-b border-slate-100 py-1"><Text className="text-[11px] font-bold text-slate-700">ทะเบียนเกษตรกร: รอดำเนินการ</Text></View>
                <View className="border-b border-slate-100 py-1"><Text className="text-[11px] font-bold text-slate-700">คะแนนร้าน: 5.0 ★</Text></View>
                <View className="py-1"><Text className="text-[11px] font-bold text-slate-700">ส่งจาก: ประเทศไทย</Text></View>
              </View>
            )}
          </View>
        </View>

        <View className="flex-row mx-4 mt-3 justify-between">
          <Link href="/account/edit-profile" asChild>
            <TouchableOpacity className="bg-white border border border-slate-200 rounded-xl py-2 flex-1 mr-1.5 flex-row items-center justify-center shadow-sm active:bg-slate-50">
              <FontAwesome name="pencil" size={13} color="#5b8c4d" />
              <Text className="text-xs font-black text-slate-700 ml-1.5">
                {activeRole === 'user' ? 'แก้ไขโปรไฟล์' : 'แก้ไขข้อมูลร้าน'}
              </Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/account/edit-address" asChild>
            <TouchableOpacity className="bg-white border border-slate-200 rounded-xl py-2 flex-1 ml-1.5 flex-row items-center justify-center shadow-sm active:bg-slate-50">
              <FontAwesome name="map-marker" size={13} color="#5b8c4d" />
              <Text className="text-xs font-black text-slate-700 ml-1.5">
                {activeRole === 'user' ? 'แก้ไขที่อยู่' : 'ที่อยู่ตั้งร้านค้า'}
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* รายการเมนูอื่นๆ ลูปแสดงผลอย่างเป็นระเบียบ */}
        <View className="mx-4 mt-4 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {menuItems.map((item, index) => {
            const Content = (
              <TouchableOpacity 
                key={item.id}
                className={`flex-row items-center justify-between p-3.5 active:bg-slate-50 ${
                  index !== menuItems.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >
                <View className="flex-row items-center">
                  <View className="w-6 items-center">
                    <FontAwesome name={item.icon as any} size={16} color="#5b8c4d" />
                  </View>
                  <Text className="text-xs font-black text-slate-800 ml-2">
                    {item.title}
                  </Text>
                </View>
                <FontAwesome name="chevron-right" size={12} color="#b1c2a3" />
              </TouchableOpacity>
            );

            return item.href ? (
              <Link href={item.href as any} asChild key={item.id}>
                {Content}
              </Link>
            ) : (
              <React.Fragment key={item.id}>
                {Content}
              </React.Fragment>
            );
          })}
        </View>
      </ScrollView>

      {/* โมดอลแจ้งเตือนออกจากระบบ */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="w-full bg-white rounded-3xl p-6 items-center shadow-2xl border border-slate-100 max-w-[320px]">
            <View className="w-14 h-14 bg-red-50 rounded-full items-center justify-center mb-4 border border-red-100">
              <FontAwesome name="sign-out" size={24} color="#ef4444" />
            </View>
            <Text className="text-lg font-black text-slate-800 text-center">ยืนยันออกจากระบบ</Text>
            <Text className="text-xs font-bold text-slate-400 text-center mt-1.5 mb-6 px-2">
              คุณต้องการออกจากระบบใช่หรือไม่ครับพีค? ระบบจะทำการเคลียร์ข้อมูลชั่วคราวออกทั้งหมด
            </Text>
            <View className="flex-row w-full space-x-3">
              <TouchableOpacity 
                onPress={() => setLogoutModalVisible(false)}
                className="flex-1 bg-slate-100 py-3 rounded-xl active:bg-slate-200"
              >
                <Text className="text-slate-600 font-black text-center text-xs">ยกเลิก</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={confirmLogout}
                className="flex-1 bg-red-500 py-3 rounded-xl shadow-sm active:bg-red-600"
              >
                <Text className="text-white font-black text-center text-xs">ออกจากระบบ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}