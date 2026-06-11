import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router'; // 📍 นำเข้า Link เพื่อใช้กดย้อนกลับ
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const CATEGORIES = ['ทั้งหมด', 'ผักสวนครัว', 'ปุ๋ย/ดิน', 'ระบบน้ำ', 'เทคนิคพิเศษ'];

const VIDEOS_DATA = [
  {
    id: '1',
    title: 'วิธีปลูกผักชีในกระถางให้โตไว รากแน่น เก็บกินได้ตลอดปี',
    channel: 'สถาบัน Plook Pinto',
    views: '1.2 แสนครั้ง',
    time: '2 วันที่แล้ว',
    duration: '10:15',
    category: 'ผักสวนครัว',
    thumbnail: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=500&q=80',
  },
  {
    id: '2',
    title: 'สูตรทำปุ๋ยหมักชีวภาพจากเศษอาหารในครัวเรือน ลดต้นทุน 100%',
    channel: 'เกษตรอินทรีย์ง่ายๆ',
    views: '8.5 หมื่นครั้ง',
    time: '1 สัปดาห์ที่แล้ว',
    duration: '08:42',
    category: 'ปุ๋ย/ดิน',
    thumbnail: 'https://images.unsplash.com/photo-1615678815958-5910c6811c25?w=500&q=80',
  },
  {
    id: '3',
    title: 'สอนต่อระบบรดน้ำอัตโนมัติด้วย Smart Wi-Fi ผ่านแอปมือถือ',
    channel: 'พีค สมาร์ทฟาร์ม',
    views: '2.4 แสนครั้ง',
    time: '3 วันที่แล้ว',
    duration: '15:20',
    category: 'ระบบน้ำ',
    thumbnail: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=500&q=80',
  },
  {
    id: '4',
    title: 'เทคนิคการเตรียมดินปลูกพริกให้เม็ดใหญ่ ดกเต็มต้น ไม่เป็นโรค',
    channel: 'ลุงอินทร์ปลูกผัก',
    views: '5.1 หมื่นครั้ง',
    time: '5 วันที่แล้ว',
    duration: '12:05',
    category: 'ปุ๋ย/ดิน',
    thumbnail: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=500&q=80',
  }
];

export default function VideoScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');

  const filteredVideos = VIDEOS_DATA.filter(video => {
    const matchesCategory = selectedCategory === 'ทั้งหมด' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View className="flex-1 bg-[#f8f9fa]">
      {/* ─── แถบหัวบนสุด (Header) ─── */}
      <View className="bg-white px-4 pt-14 pb-4 border-b border-slate-100 shadow-sm">
        <View className="flex-row items-center justify-between mb-3">
          
          {/* 📍 ปุ่มย้อนกลับไปหน้าหลัก: ถ้าหน้าแรกของพีคใช้ path อื่น เช่น /home พีคเปลี่ยนตรง hrefได้เลยนะครับ */}
          <Link href="/home" asChild>
            <TouchableOpacity className="flex-row items-center p-1">
              <FontAwesome name="chevron-left" size={16} color="#5b8c4d" />
              <Text className="text-sm font-bold text-slate-700 ml-1">หน้าหลัก</Text>
            </TouchableOpacity>
          </Link>

          <Text className="text-xl font-black text-[#5b8c4d]">คลังความรู้เกษตร</Text>
          
          <TouchableOpacity className="p-1">
            <FontAwesome name="history" size={20} color="#718096" />
          </TouchableOpacity>
        </View>

        {/* ช่องค้นหาวิดีโอ */}
        <View className="bg-[#f5f6f4] rounded-xl flex-row items-center border border-slate-200 px-3 py-1.5">
          <FontAwesome name="search" size={16} color="#a0aec0" className="mr-2" />
          <TextInput
            className="flex-1 text-slate-800 font-bold text-sm p-0 m-0"
            placeholder="ค้นหาวิธีปลูกผัก, สูตรปุ๋ย, ระบบน้ำ..."
            placeholderTextColor="#a0aec0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <FontAwesome name="times-circle" size={16} color="#a0aec0" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ─── แถบเลือกหมวดหมู่แนวนอน (Categories) ─── */}
      <View className="my-3">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                className={`mr-2 px-4 py-2 rounded-xl border ${
                  isActive 
                    ? 'bg-[#6b9649] border-[#6b9649]' 
                    : 'bg-white border-slate-200'
                }`}
              >
                <Text className={`text-xs font-black ${isActive ? 'text-white' : 'text-slate-600'}`}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ─── รายการวิดีโอ (Video List) ─── */}
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <TouchableOpacity 
              key={video.id} 
              className="bg-white mb-4 border-b border-slate-100 shadow-xs"
              activeOpacity={0.9}
            >
              <View className="relative">
                <Image 
                  source={{ uri: video.thumbnail }} 
                  className="w-full h-52 bg-slate-200"
                  resizeMode="cover"
                />
                <View className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded-md">
                  <Text className="text-[10px] font-bold text-white">{video.duration}</Text>
                </View>
                <View className="absolute inset-0 items-center justify-center">
                  <View className="w-12 h-12 bg-black/40 rounded-full items-center justify-center backdrop-blur-md">
                    <FontAwesome name="play" size={18} color="#ffffff" className="ml-1" />
                  </View>
                </View>
              </View>

              <View className="p-4 flex-row">
                <View className="w-9 h-9 rounded-full bg-[#eaf2e6] items-center justify-center border border-slate-100 mr-3">
                  <FontAwesome name="leaf" size={16} color="#5b8c4d" />
                </View>

                <View className="flex-1">
                  <Text className="text-sm font-black text-slate-800 leading-5" numberOfLines={2}>
                    {video.title}
                  </Text>
                  <Text className="text-xs font-bold text-slate-500 mt-1">
                    {video.channel}
                  </Text>
                  <Text className="text-[10px] text-slate-400 font-medium mt-0.5">
                    การดู {video.views} • {video.time}
                  </Text>
                </View>

                <TouchableOpacity className="p-1 self-start">
                  <FontAwesome name="ellipsis-v" size={16} color="#a0aec0" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View className="items-center justify-center py-20">
            <FontAwesome name="search-plus" size={40} color="#cbd5e0" />
            <Text className="text-slate-500 font-bold mt-2">ไม่พบวิดีโอที่คุณกำลังตามหา</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}