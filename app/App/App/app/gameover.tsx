import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

export default function GameOver({ navigation }) {

    const route = useRouter();
  
  // 🔥 Dados fictícios embutidos
  const timeline = [
    {
      name: "Rogério Tavares",
      months: 20,
      endReason: "Pediu demissão após desentendimento com a diretoria.",
    },
    {
      name: "Hugo Mendonça",
      months: 20,
      endReason: "Demissão após uma sequência de 12 jogos sem vitória.",
    },
    {
      name: "Vicente Prado",
      months: 20,
      endReason: "Saiu para assumir o comando da Seleção Brasileira.",
    },
  ];

  const finalManager = {
    name: "Seu treinador",
    months: 10,
    endReason: "Um dos indicadores críticos da gestão chegou ao limite.",
  };

  return (
    <View className="flex-1 bg-[#002200] pt-16 px-6">

      {/* Título */}
      <Text className="text-white text-3xl font-bold text-center mb-6">
        Fim da Gestão
      </Text>

      <Text className="text-yellow-400 text-center text-lg mb-10">
        Sua gestão chegou ao fim.
      </Text>

      {/* Timeline dos treinadores */}
      <ScrollView className="flex-1 mb-10">
        <Text className="text-white/80 mb-4 text-center text-sm">
          Linha do Tempo dos Treinadores
        </Text>

        {timeline.map((coach, index) => (
          <View
            key={index}
            className="bg-white/10 border border-white/20 rounded-xl p-4 mb-4"
          >
            <Text className="text-yellow-300 font-bold text-lg">{coach.name}</Text>
            <Text className="text-white text-sm">Meses de gestão: {coach.months}</Text>
            <Text className="text-white/70 text-sm mt-1 italic">
              {coach.endReason}
            </Text>
          </View>
        ))}

        {/* Treinador atual em destaque */}
        <View className="bg-yellow-600/20 border border-yellow-500 rounded-xl p-5 mt-6">
          <Text className="text-yellow-300 font-bold text-xl text-center mb-2">
            {finalManager.name} (Você)
          </Text>

          <Text className="text-white text-center">
            Gestão: {finalManager.months} Meses
          </Text>

          <Text className="text-white/80 text-center mt-2 italic">
            {finalManager.endReason}
          </Text>
        </View>
      </ScrollView>

      {/* Botão de Recomeçar */}
      <TouchableOpacity
        className="bg-yellow-500 py-4 rounded-xl mb-10"
        onPress={() => route.replace('/')}
      >
        <Text className="text-center text-xl font-bold uppercase">
          Recomeçar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
