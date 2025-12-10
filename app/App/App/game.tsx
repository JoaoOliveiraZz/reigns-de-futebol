import { Image, Text, View } from "react-native";

export default function Game() {
  return (
    <View className="flex-1 bg-[#003300] ">

      {/* Status do Clube */}
      <View className="flex-row justify-between h-20 flex items-center px-6 mb-8 bg-stone-700">

        {/* Elenco */}
        <View className="items-center">
          <Text className="text-white text-xs mb-1 uppercase">Elenco</Text>
          <View className="w-16 h-2 bg-white/20 rounded-full">
            <View className="h-full w-10 bg-yellow-400 rounded-full" />
          </View>
        </View>

        {/* Diretoria */}
        <View className="items-center">
          <Text className="text-white text-xs mb-1 uppercase">Diretoria</Text>
          <View className="w-16 h-2 bg-white/20 rounded-full">
            <View className="h-full w-14 bg-yellow-500 rounded-full" />
          </View>
        </View>

        {/* Torcida */}
        <View className="items-center">
          <Text className="text-white text-xs mb-1 uppercase">Torcida</Text>
          <View className="w-16 h-2 bg-white/20 rounded-full">
            <View className="h-full w-12 bg-yellow-300 rounded-full" />
          </View>
        </View>

        {/* Finanças */}
        <View className="items-center">
          <Text className="text-white text-xs mb-1 uppercase">Finanças</Text>
          <View className="w-16 h-2 bg-white/20 rounded-full">
            <View className="h-full w-8 bg-yellow-600 rounded-full" />
          </View>
        </View>

      </View>

      {/* Carta estilo Reigns */}
      <View className="flex-1 items-center justify-center">
        <View className="bg-white/10 border border-white/20 rounded-2xl p-6 w-full max-w-xs shadow-xl">
          
          <Text className="text-white text-xl font-bold text-center mb-4">
            O craque do time pediu aumento salarial!
          </Text>

          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg/960px-20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg" }}
            className="w-full h-40 rounded-xl mb-4"
            resizeMode="cover"
          />

          <Text className="text-white/90 text-center text-sm">
            Se aceitar, poderá melhorar o humor do elenco, mas deixará as finanças apertadas.
          </Text>
        </View>
      </View>

      {/* Ações (esquerda / direita estilo Reigns) */}
      <View className="flex-row justify-between mt-8 px-4">
        <Text className="text-yellow-300 text-xl font-bold">Não</Text>
        <Text className="text-yellow-300 text-xl font-bold">Sim</Text>
      </View>

      <View className="bg-stone-700 flex flex-row justify-around py-4">
        <View>
            <Text className="text-lg text-white">Felipe Burris</Text>
            <Text className="text-lg text-white">100 anos na direção</Text>
        </View>
        <View className="flex items-center justify-center">
            <Text className="text-xl text-white">Ano 2077</Text>
        </View>
      </View>

    </View>
  );
}
