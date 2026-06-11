import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import BottomNavigation from '../../../components/BottomNavigation';
import Header from '../../../components/Header';

interface Product {
  id: number;
  name: string;
  shop_name: string;
  price: number;
  image_url: string;
}

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // 📍 1. เปลี่ยนจาก Array ล็อกตายตัว มาเป็น State รอรับจากฐานข้อมูลคอมพีค
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 📍 2. ดึงข้อมูลจาก API หลังบ้านทันทีเมื่อเปิดหน้าจอขึ้นมา
  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        // 💡 เปลี่ยนตัวเลขพอร์ตเป็น 8000 ให้ตรงกับระบบหลังบ้านล่าสุดของพีคครับ
        const response = await fetch('http://10.0.2.2:8000/api/popular-products');
        const data = await response.json();
        
        if (response.ok) {
          setPopularProducts(data);
        } else {
          console.error('Failed to fetch:', data.error);
        }
      } catch (error) {
        console.error('Network error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  const categories = [
    { id: 1, name: 'แอปเปิ้ล', icon: '🌿' },
    { id: 2, name: 'กล้วย', icon: '🌱' },
    { id: 3, name: 'มะละกอ', icon: '🍃' },
    { id: 4, name: 'ส้ม', icon: '🍏' },
  ];

  const adsProducts = [
    { id: 1, text: 'Lorem Ipsum is\nsimply dummy' },
    { id: 2, text: 'Lorem Ipsum is\nsimply dummy' },
    { id: 3, text: 'Lorem Ipsum is\nsimply dummy' },
    { id: 4, text: 'Lorem Ipsum is\nsimply dummy' },
  ];

  return (
    <View className="flex-1 bg-white">
      <Header/>
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ส่วน Banner */}
        <View className="mx-4 mt-4 bg-white border border-slate-200 rounded-2xl flex-row overflow-hidden h-36 shadow-sm">
          <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-xl font-black tracking-wider text-slate-800">Banner</Text>
          </View>
          <TouchableOpacity className="w-16 bg-[#8ba870] items-center justify-center">
            <FontAwesome name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* ส่วน หมวดหมู่ */}
        <View className="mt-5 px-4">
          <Text className="text-base font-black text-slate-900 mb-3">หมวดหมู่</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {categories.map((item) => (
              <TouchableOpacity key={item.id} className="bg-white border border-slate-200 rounded-full flex-row items-center px-4 py-1.5 mr-2 shadow-sm">
                <Text className="text-sm mr-1">{item.icon}</Text>
                <Text className="text-xs font-bold text-slate-800">{item.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity className="bg-slate-200 w-8 h-8 rounded-full items-center justify-center shadow-sm">
              <FontAwesome name="chevron-right" size={12} color="#475569" />
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        {/* 📍 ส่วน สินค้าขายดี (อัปเดตดึงข้อมูล Dynamic และแสดงผลสวยงามขึ้น) */}
        <View className="mt-5 px-4">
          <Text className="text-base font-black text-slate-900 mb-3">สินค้าขายดี</Text>
          
          {loading ? (
            <ActivityIndicator size="small" color="#5b8c4d" className="py-4" />
          ) : (
            <View className="flex-row justify-between flex-wrap">
              {popularProducts.map((item) => (
                <View key={item.id} className="bg-[#f8fafc] border border-slate-200 rounded-xl p-2 items-center w-[23%] shadow-sm mb-2">
                  {/* แสดงรูปสินค้าจริงจากอินเทอร์เน็ตที่ผูกไว้ใน DB */}
                  <Image 
                    source={{ uri: item.image_url }} 
                    className="w-12 h-12 rounded-lg bg-slate-100 mb-1"
                    resizeMode="cover"
                  />
                  <Text className="text-[9px] font-black text-slate-800 text-center" numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text className="text-[8px] font-bold text-slate-400 text-center" numberOfLines={1}>
                    {item.shop_name}
                  </Text>
                  <Text className="text-[10px] font-black text-[#5b8c4d] mt-0.5">
                    ฿{item.price}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* ส่วน โฆษณาสินค้า */}
        <View className="mt-6 px-4">
          <Text className="text-base font-black text-green-800 text-center mb-4">โฆษณาสินค้า</Text>
          <View className="flex-row flex-wrap justify-between">
            {adsProducts.map((item, index) => (
              <View 
                key={item.id} 
                className={`bg-[#ffe1e1] rounded-3xl p-4 w-[48%] h-36 justify-between mb-4 relative shadow-sm border ${
                  index === 2 ? 'border-2 border-blue-500' : 'border-slate-100'
                }`}
              >
                <Text className="text-xs font-bold text-slate-900 font-mono leading-tight">
                  {item.text}
                </Text>
                <View className="absolute bottom-2 right-2">
                  <Text className="text-5xl">🍒</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <BottomNavigation/>
    </View>
  );
}