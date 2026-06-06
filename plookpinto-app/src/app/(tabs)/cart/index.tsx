import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// ข้อมูลจำลองสินค้าในตะกร้า 🌱
const INITIAL_CART_ITEMS = [
  {
    id: '1',
    name: 'เมล็ดพันธุ์ผักชีฝรั่ง (ชุด 5 ซอง)',
    price: 150,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=200&q=80',
  },
  {
    id: '2',
    name: 'ดินผสมปุ๋ยอินทรีย์ สูตรเร่งราก 5kg',
    price: 290,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1615678815958-5910c6811c25?w=200&q=80',
  },
  {
    id: '3',
    name: 'ชุดกระถางปลูกผักอัจฉริยะ (Self-Watering)',
    price: 450,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=200&q=80',
  },
];

export default function CartScreen() {
  const [items, setItems] = useState(INITIAL_CART_ITEMS);

  // ฟังก์ชันเพิ่ม/ลดจำนวนสินค้า
  const updateQuantity = (id: string, type: 'plus' | 'minus') => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = type === 'plus' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  // ฟังก์ชันลบสินค้าออกจากตะกร้า
  const removeItem = (id: string) => {
    Alert.alert('ยืนยัน', 'ต้องการลบสินค้านี้ออกจากตะกร้าใช่ไหม?', [
      { text: 'ยกเลิก', style: 'cancel' },
      { text: 'ลบออก', onPress: () => setItems(items.filter(i => i.id !== id)), style: 'destructive' }
    ]);
  };

  // คำนวณราคารวม
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = items.length > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <View className="flex-1 bg-[#f8f9fa]">
      {/* ─── แถบหัวบนสุด (Header) ─── */}
      <View className="bg-white px-4 pt-14 pb-4 flex-row items-center justify-between border-b border-slate-100 shadow-sm">
        <Link href="/home" asChild>
          <TouchableOpacity className="flex-row items-center p-1">
            <FontAwesome name="chevron-left" size={16} color="#5b8c4d" />
            <Text className="text-sm font-bold text-slate-700 ml-1">กลับ</Text>
          </TouchableOpacity>
        </Link>
        <Text className="text-xl font-black text-[#5b8c4d]">ตะกร้าของคุณ</Text>
        <View className="w-10" /> {/* ตัวเว้นวรรคให้หัวข้ออยู่ตรงกลาง */}
      </View>

      {items.length > 0 ? (
        <View className="flex-1">
          <ScrollView 
            className="flex-1 px-4 pt-4"
            showsVerticalScrollIndicator={false}
          >
            {items.map((item) => (
              <View 
                key={item.id} 
                className="bg-white rounded-2xl p-3 mb-4 flex-row border border-slate-100 shadow-sm"
              >
                {/* รูปสินค้า */}
                <Image 
                  source={{ uri: item.image }} 
                  className="w-20 h-20 rounded-xl bg-slate-100"
                  resizeMode="cover"
                />
                
                {/* รายละเอียดสินค้า */}
                <View className="flex-1 ml-3 justify-between">
                  <View className="flex-row justify-between">
                    <Text className="text-sm font-black text-slate-800 flex-1 mr-2" numberOfLines={1}>
                      {item.name}
                    </Text>
                    <TouchableOpacity onPress={() => removeItem(item.id)}>
                      <FontAwesome name="trash-o" size={16} color="#e53e3e" />
                    </TouchableOpacity>
                  </View>
                  
                  <Text className="text-[#5b8c4d] font-black text-base">
                    ฿{item.price.toLocaleString()}
                  </Text>

                  {/* ตัวปรับจำนวนสินค้า */}
                  <View className="flex-row items-center justify-between mt-2">
                    <View className="flex-row items-center bg-slate-50 rounded-lg border border-slate-200">
                      <TouchableOpacity 
                        onPress={() => updateQuantity(item.id, 'minus')}
                        className="px-3 py-1"
                      >
                        <FontAwesome name="minus" size={10} color="#718096" />
                      </TouchableOpacity>
                      <Text className="px-2 font-black text-slate-800">{item.quantity}</Text>
                      <TouchableOpacity 
                        onPress={() => updateQuantity(item.id, 'plus')}
                        className="px-3 py-1"
                      >
                        <FontAwesome name="plus" size={10} color="#5b8c4d" />
                      </TouchableOpacity>
                    </View>
                    <Text className="text-xs font-bold text-slate-400">
                      รวม: ฿{(item.price * item.quantity).toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* ─── ส่วนสรุปราคาด้านล่าง (Summary Card) ─── */}
          <View className="bg-white px-6 pt-6 pb-10 border-t border-slate-100 shadow-2xl">
            <View className="flex-row justify-between mb-2">
              <Text className="text-slate-500 font-bold">รวมค่าสินค้า</Text>
              <Text className="text-slate-800 font-bold">฿{subtotal.toLocaleString()}</Text>
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-slate-500 font-bold">ค่าจัดส่ง</Text>
              <Text className="text-slate-800 font-bold">฿{shipping.toLocaleString()}</Text>
            </View>
            <View className="h-[1px] bg-slate-100 mb-4" />
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-lg font-black text-slate-800">ยอดชำระสุทธิ</Text>
              <Text className="text-2xl font-black text-[#5b8c4d]">฿{total.toLocaleString()}</Text>
            </View>

            <TouchableOpacity 
              className="bg-[#6b9649] rounded-2xl py-4 items-center justify-center shadow-lg active:bg-[#587d3c]"
              onPress={() => Alert.alert('ชำระเงิน', 'กำลังนำคุณไปสู่ระบบชำระเงิน')}
            >
              <Text className="text-lg font-black text-white">ชำระเงินตอนนี้</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        /* กรณีตะกร้าว่างเปล่า */
        <View className="flex-1 items-center justify-center px-10">
          <View className="w-24 h-24 bg-slate-100 rounded-full items-center justify-center mb-4">
            <FontAwesome name="shopping-basket" size={40} color="#cbd5e0" />
          </View>
          <Text className="text-xl font-black text-slate-800 mb-2">ตะกร้าของคุณยังว่างอยู่</Text>
          <Text className="text-slate-500 text-center font-bold mb-8">
            ออกไปเลือกชมเมล็ดพันธุ์และอุปกรณ์การเกษตรที่น่าสนใจกันเถอะ!
          </Text>
          <Link href="/home" asChild>
            <TouchableOpacity className="bg-[#6b9649] px-8 py-3 rounded-xl">
              <Text className="text-white font-black">ไปที่หน้าหลัก</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </View>
  );
}