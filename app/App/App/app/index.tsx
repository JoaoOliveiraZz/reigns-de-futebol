import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import "../global.css";
import { Link } from 'expo-router';

export default function App() {
  return (
    <View className="h-screen w-screen bg-[#0d1512] px-6 flex items-center justify-center">

     

      {/* Título */}
      <Text className="text-4xl font-extrabold text-[#d4af37] tracking-wide drop-shadow-xl mb-14 uppercase">
        FUT REIGNS
      </Text>

      {/* Menu */}
      <View className="w-full max-w-xs space-y-8">

        <TouchableOpacity className="bg-[#133e2c] py-4 rounded-xl active:scale-95 ">
          <Link href={'/game'} className="text-center text-[#f3f2e9] font-semibold text-xl tracking-wider uppercase">
            Jogar
          </Link>
        </TouchableOpacity>

        <TouchableOpacity className="bg-[#133e2c] py-4 rounded-xl active:scale-95 ">
          <Link href={"/custom"} className="text-center text-[#f3f2e9] font-semibold text-xl tracking-wider uppercase">
            Personalizar
          </Link>
        </TouchableOpacity>

        <TouchableOpacity className="bg-[#3a1e1e] py-4 rounded-xl active:scale-95 ">
          <Text className="text-center text-[#f3f2e9] font-semibold text-xl tracking-wider uppercase">
            Sair
          </Text>
        </TouchableOpacity>

      </View>

      <StatusBar style="light" />
    </View>
  );
}
