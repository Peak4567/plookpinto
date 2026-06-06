import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

// ข้อมูลจำลองสถานะการแจ้งเตือนตามหมวดหมู่ที่พีคกำหนด 🌱
const NOTIFICATIONS_DATA = [
  {
    id: '1',
    category: 'อัปเดตคำสั่งซื้อ',
    title: 'คำสั่งซื้อ #PP-9942 สำเร็จแล้ว',
    detail: 'เมล็ดพันธุ์ผักชีฝรั่งของคุณจัดส่งสำเร็จแล้ว ขอให้สนุกกับการปลูกผักครับ!',
    time: '10 นาทีที่แล้ว',
    icon: 'shopping-bag',
    iconColor: '#5b8c4d',
    unread: true,
  },
  {
    id: '2',
    category: 'โปรโมชั่น Live',
    title: 'ลุงอินทร์ กำลังไลฟ์สด! 🔴',
    detail: 'แจกสูตรลับปุ๋ยหมักและแจกโค้ดส่วนลดเมล็ดพันธุ์ 50% เข้าไปดูกันเลย',
    time: '45 นาทีที่แล้ว',
    icon: 'video-camera',
    iconColor: '#e53e3e',
    unread: true,
  },
  {
    id: '3',
    category: 'อัปเดตบริการเติมเงิน',
    title: 'เติมเงินเข้า PlookPinto Wallet สำเร็จ',
    detail: 'ยอดเงินจำนวน ฿500 ถูกเพิ่มเข้าบัญชีของคุณเรียบร้อยแล้ว',
    time: '2 ชั่วโมงที่แล้ว',
    icon: 'credit-card',
    iconColor: '#3182ce',
    unread: false,
  },
  {
    id: '4',
    category: 'อัปเดตจากแอพ PlookPinto',
    title: 'ระบบเวอร์ชันใหม่ V1.2.0 พร้อมใช้งาน',
    detail: 'เราได้เพิ่มระบบแชทและคลังวิดีโอเกษตรกรรมใหม่เพื่อให้พีคใช้งานได้ดียิ่งขึ้น!',
    time: '1 วันที่แล้ว',
    icon: 'leaf',
    iconColor: '#dd6b20',
    unread: false,
  },
  {
    id: '5',
    category: 'อัปเดตล่าสุด',
    title: 'มีผู้กดถูกใจความคิดเห็นของคุณ',
    detail: 'คุณสมชาย กดถูกใจเทคนิคการเตรียมดินปลูกพริกของคุณในชุมชน',
    time: '2 วันที่แล้ว',
    icon: 'thumbs-up',
    iconColor: '#4a5568',
    unread: false,
  }
];

export default function NotificationScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);

  // ฟังก์ชันกดอ่านแจ้งเตือนแล้วเคลียร์จุดแจ้งเตือนสีเขียวออก
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(noti => 
      noti.id === id ? { ...noti, unread: false } : noti
    ));
  };

  return (
    <View className="flex-1 bg-[#f8f9fa]">
      {/* ─── แถบหัว Header ─── */}
      <View className="bg-white px-4 pt-14 pb-4 flex-row items-center justify-between border-b border-slate-100 shadow-sm">
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center p-1">
          <FontAwesome name="chevron-left" size={16} color="#5b8c4d" />
          <Text className="text-sm font-bold text-slate-700 ml-1">กลับ</Text>
        </TouchableOpacity>
        <Text className="text-lg font-black text-slate-800">การแจ้งเตือน</Text>
        <TouchableOpacity 
          onPress={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
          className="p-1"
        >
          <Text className="text-xs font-bold text-[#5b8c4d]">อ่านทั้งหมด</Text>
        </TouchableOpacity>
      </View>

      {/* ─── รายการแจ้งเตือนทั้งหมด ─── */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {notifications.map((noti) => (
          <TouchableOpacity
            key={noti.id}
            onPress={() => handleMarkAsRead(noti.id)}
            className={`flex-row p-4 border-b border-slate-100 items-start active:bg-slate-50 ${
              noti.unread ? 'bg-[#f4f9f1]' : 'bg-white'
            }`}
          >
            {/* ไอคอนตามประเภทการแจ้งเตือน */}
            <View 
              style={{ backgroundColor: `${noti.iconColor}15` }} 
              className="w-11 h-11 rounded-xl items-center justify-center mt-0.5"
            >
              <FontAwesome name={noti.icon as any} size={18} color={noti.iconColor} />
            </View>

            {/* รายละเอียดข้อความ */}
            <View className="flex-1 ml-3.5 pr-2">
              <View className="flex-row items-center justify-between mb-1">
                <Text 
                  style={{ color: noti.iconColor }} 
                  className="text-[10px] font-black uppercase tracking-wider"
                >
                  {noti.category}
                </Text>
                <Text className="text-[10px] font-bold text-slate-400">{noti.time}</Text>
              </View>
              
              <Text className={`text-sm text-slate-800 mb-0.5 ${noti.unread ? 'font-black' : 'font-bold'}`}>
                {noti.title}
              </Text>
              
              <Text className="text-xs text-slate-500 font-medium leading-4" numberOfLines={2}>
                {noti.detail}
              </Text>
            </View>

            {/* จุดวงกลมสีเขียวแสดงสถานะ "ยังไม่ได้อ่าน" */}
            {noti.unread && (
              <View className="w-2 h-2 bg-emerald-600 rounded-full self-center ml-1" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}