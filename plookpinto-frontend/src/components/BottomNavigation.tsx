import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function BottomNavigation() { 
  return (
    <View className="bg-[#e2edd9] mx-4 my-2 rounded-2xl flex-row justify-around items-center h-16 shadow-sm">
      
      {/* ─── ปุ่มตะกร้า ─── */}
     <Link href="/cart" asChild>
      <TouchableOpacity className="items-center justify-center flex-1">
        <FontAwesome name="shopping-cart" size={24} color="#719e64" />
        <Text className="text-[11px] font-bold text-[#44623b] mt-1">
          ตะกร้า
        </Text>
      </TouchableOpacity>
     </Link>

      {/* 📍 ปุ่มแชท: เพิ่ม Link ครอบให้กดเข้าหน้าแชทได้แล้วครับ พีค */}
      <Link href="/chat" asChild>
        <TouchableOpacity className="items-center justify-center flex-1">
          <FontAwesome name="comment" size={22} color="#719e64" />
          <Text className="text-[11px] font-bold text-[#44623b] mt-1">
            แชท
          </Text>
        </TouchableOpacity>
      </Link>

      {/* ─── ปุ่มหน้าแรก ─── */}
      <TouchableOpacity className="items-center justify-center flex-1">
        <FontAwesome name="home" size={24} color="#44623b" />
        <Text className="text-[11px] font-bold text-[#44623b] mt-1">
          หน้าแรก
        </Text>
      </TouchableOpacity>

      {/* ─── ปุ่มวิดีโอ ─── */}
     <Link href="/video" asChild>
      <TouchableOpacity className="items-center justify-center flex-1">
        <FontAwesome name="play-circle" size={24} color="#719e64" />
        <Text className="text-[11px] font-bold text-[#44623b] mt-1">
          วิดีโอ
        </Text>
      </TouchableOpacity>
     </Link>

      {/* ─── ปุ่มบัญชี ─── */}
      <Link href="/account" asChild>
        <TouchableOpacity className="items-center justify-center flex-1">
          <FontAwesome name="user" size={24} color="#719e64" />
          <Text className="text-[11px] font-bold text-[#44623b] mt-1">
            บัญชี
          </Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}