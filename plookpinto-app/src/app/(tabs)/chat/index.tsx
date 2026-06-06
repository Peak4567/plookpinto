import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// ข้อมูลจำลองสำหรับแสดงในหน้าแชทตอนเริ่มต้น
const INITIAL_MESSAGES = [
  { id: '1', text: 'สวัสดีครับ ยินดีต้อนรับสู่ plook pinto! 🌱', isMe: false, time: '10:30' },
  { id: '2', text: 'สวัสดีครับ กำลังอยากเริ่มปลูกผักสวนครัวพอดีเลย', isMe: true, time: '10:32' },
  { id: '3', text: 'ยินดีเลยครับ! อยากให้แนะนำชุดปลูกหรือวิธีดูแลตัวไหนเป็นพิเศษไหมครับ?', isMe: false, time: '10:33' },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  // ฟังก์ชันสำหรับกดส่งข้อความ
  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isMe: true, // กำหนดให้เป็นข้อความฝั่งเรา (สีเขียวอยู่ขวา)
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setInputText('');

    // สั่งให้เลื่อนหน้าจอลงมาล่างสุดอัตโนมัติเมื่อมีข้อความใหม่
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-[#f8f9fa]"
    >
      {/* ─── แถบหัวบนสุด (Header) ─── */}
      <View className="bg-white px-4 pt-14 pb-4 flex-row items-center justify-between border-b border-slate-100 shadow-sm">
        <View className="flex-row items-center flex-1">
          <Link href="/home" asChild>
            <TouchableOpacity className="pr-3">
              <FontAwesome name="chevron-left" size={18} color="#5b8c4d" />
            </TouchableOpacity>
          </Link>
          
          {/* รูปโปรไฟล์จำลอง */}
          <View className="w-10 h-10 rounded-full bg-[#eaf2e6] items-center justify-center border border-slate-100">
            <FontAwesome name="user" size={18} color="#5b8c4d" />
          </View>
          
          {/* ชื่อผู้ที่เราคุยด้วย */}
          <View className="ml-3">
            <Text className="text-base font-black text-slate-800">ฝ่ายสนับสนุนชุมชน</Text>
            <Text className="text-[10px] font-bold text-[#5b8c4d]">กำลังออนไลน์</Text>
          </View>
        </View>

        {/* ปุ่มเครื่องมือขวาบน */}
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity className="p-2">
            <FontAwesome name="phone" size={20} color="#5b8c4d" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <FontAwesome name="ellipsis-v" size={20} color="#718096" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ─── ส่วนแสดงกล่องข้อความสนทนา (Message List) ─── */}
      <ScrollView 
        ref={scrollViewRef}
        className="flex-1 px-4 pt-4"
        contentContainerStyle={{ paddingBottom: 20 }}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            className={`flex-row mb-4 ${msg.isMe ? 'justify-end' : 'justify-start'}`}
          >
            {/* กล่องข้อความ */}
            <View 
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm 
                ${msg.isMe 
                  ? 'bg-[#6b9649] rounded-tr-none' // ฝั่งเรา: สีเขียวผัก
                  : 'bg-white border border-slate-100 rounded-tl-none' // ฝั่งคนอื่น: สีขาว
                }`}
            >
              <Text 
                className={`text-sm font-medium leading-5 
                  ${msg.isMe ? 'text-white' : 'text-slate-800'}`}
              >
                {msg.text}
              </Text>
              
              {/* เวลาส่งข้อความ */}
              <Text 
                className={`text-[9px] text-right mt-1 font-bold 
                  ${msg.isMe ? 'text-emerald-100' : 'text-slate-400'}`}
              >
                {msg.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* ─── ช่องพิมพ์ข้อความด้านล่าง (Input Bar) ─── */}
      <View className="bg-white p-4 border-t border-slate-100 flex-row items-center pb-8">
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-slate-50 mr-2">
          <FontAwesome name="plus" size={16} color="#718096" />
        </TouchableOpacity>

        <View className="flex-1 bg-[#f5f6f4] rounded-2xl px-4 py-2 border border-slate-200 flex-row items-center">
          <TextInput
            className="flex-1 text-slate-800 font-bold text-sm max-h-20 p-0 m-0"
            placeholder="พิมพ์ข้อความของคุณ..."
            placeholderTextColor="#a0aec0"
            multiline={true}
            value={inputText}
            onChangeText={setInputText}
          />
        </View>

        {/* ปุ่มส่งข้อความ จะเปลี่ยนสีเมื่อมีตัวอักษรพิมพ์อยู่ */}
        <TouchableOpacity 
          className={`w-10 h-10 items-center justify-center rounded-full ml-2 shadow-sm
            ${inputText.trim() ? 'bg-[#6b9649]' : 'bg-slate-200'}`}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <FontAwesome name="paper-plane" size={16} color={inputText.trim() ? '#ffffff' : '#a0aec0'} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}