import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function TeamCustomization() {
  const [shape, setShape] = useState("classic");
  const [pattern, setPattern] = useState("vertical");
  const [colors, setColors] = useState({
    primary: "#0044cc",
    secondary: "#ffffff",
  });

  const [loading, setLoading] = useState(true);

  // ⭐ CARREGAR ESCUDO SALVO AUTOMATICAMENTE
  useEffect(() => {
    const loadShield = async () => {
      try {
        const data = await AsyncStorage.getItem("@custom_shield");
        if (data) {
          const saved = JSON.parse(data);
          setShape(saved.shape);
          setPattern(saved.pattern);
          setColors(saved.colors);
        }
      } catch (error) {
        console.log("Erro ao carregar escudo:", error);
      } finally {
        setLoading(false);
      }
    };

    loadShield();
  }, []);

  // 🔷 FORMAS EXPANDIDAS
  const shapes = [
    "shield",
    "classic",
    "medieval",
    "diamond",
    "hexagon",
    "drop",
    "circle",
    "square",
  ];

  const saveShield = async () => {
    const shieldData = { shape, pattern, colors };

    try {
      await AsyncStorage.setItem("@custom_shield", JSON.stringify(shieldData));
      alert("Escudo salvo com sucesso!");
      router.replace("/");
    } catch (error) {
      console.log("Erro ao salvar escudo:", error);
    }
  };

  const patterns = ["vertical", "horizontal", "half", "chevron"];

  const colorOptions = [
    { primary: "#0044cc", secondary: "#ffffff" },
    { primary: "#cc0000", secondary: "#000000" },
    { primary: "#008800", secondary: "#f2d024" },
    { primary: "#6a0dad", secondary: "#ffcc00" },
  ];

  // 🛡️ FORMAS DO ESCUDO
  const getShapeStyle = (shape) => {
    switch (shape) {
      case "classic":
        return {
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        };

      case "medieval":
        return {
          borderTopLeftRadius: 80,
          borderTopRightRadius: 80,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        };

      case "diamond":
        return { transform: [{ rotate: "45deg" }], borderRadius: 12 };

      case "hexagon":
        return {
          clipPath:
            "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        };

      case "drop":
        return {
          borderTopLeftRadius: 70,
          borderTopRightRadius: 70,
          borderBottomLeftRadius: 120,
          borderBottomRightRadius: 120,
        };

      case "circle":
        return { borderRadius: 999 };

      case "square":
        return { borderRadius: 10 };

      default:
        return { borderRadius: 20 };
    }
  };

  // 🎨 PADRÃO DO ESCUDO
  const renderPattern = () => {
    switch (pattern) {
      case "vertical":
        return (
          <View className="absolute inset-0 flex-row">
            <View style={{ flex: 1, backgroundColor: colors.primary }} />
            <View style={{ flex: 1, backgroundColor: colors.secondary }} />
            <View style={{ flex: 1, backgroundColor: colors.primary }} />
          </View>
        );

      case "horizontal":
        return (
          <View className="absolute inset-0">
            <View style={{ flex: 1, backgroundColor: colors.primary }} />
            <View style={{ flex: 1, backgroundColor: colors.secondary }} />
            <View style={{ flex: 1, backgroundColor: colors.primary }} />
          </View>
        );

      case "half":
        return (
          <View className="absolute inset-0 flex-row">
            <View style={{ flex: 1, backgroundColor: colors.primary }} />
            <View style={{ flex: 1, backgroundColor: colors.secondary }} />
          </View>
        );

      case "chevron":
        return (
          <View className="absolute inset-0 items-center justify-center">
            <View
              style={{
                width: 0,
                height: 0,
                borderLeftWidth: 40,
                borderRightWidth: 40,
                borderBottomWidth: 60,
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                borderBottomColor: colors.secondary,
              }}
            />
          </View>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#002200] items-center justify-center">
        <Text className="text-white text-lg">Carregando escudo...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#002200] px-6 pt-10">
      <Text className="text-white text-2xl font-bold text-center mb-6">
        Personalize Seu Clube
      </Text>

      {/* PRÉVIA DO ESCUDO */}
      <View className="items-center mb-10">
        <View
          className="w-36 h-40 overflow-hidden items-center justify-center"
          style={{
            borderColor: colors.secondary,
            borderWidth: 4,
            backgroundColor: colors.primary,
            ...getShapeStyle(shape),
          }}
        >
          {renderPattern()}
        </View>
      </View>

      {/* FORMATO */}
      <Text className="text-white text-xl font-semibold mb-2">
        Formato do Escudo
      </Text>

      <View className="flex-row flex-wrap gap-2 mb-6">
        {shapes.map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setShape(s)}
            className={`p-3 rounded-xl border ${
              shape === s
                ? "bg-yellow-500 border-yellow-300"
                : "bg-white/10 border-white/20"
            }`}
          >
            <Text className="text-white uppercase">{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* PADRÃO */}
      <Text className="text-white text-xl font-semibold mb-2">
        Padrão do Escudo
      </Text>

      <View className="flex-row justify-between mb-6">
        {patterns.map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => setPattern(p)}
            className={`p-3 rounded-xl border ${
              pattern === p
                ? "bg-yellow-500 border-yellow-300"
                : "bg-white/10 border-white/20"
            }`}
          >
            <Text className="text-white capitalize">{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* CORES */}
      <Text className="text-white text-xl font-semibold mb-2">
        Cores do Clube
      </Text>

      <View className="flex-row justify-between mb-8">
        {colorOptions.map((c, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setColors(c)}
            className="w-14 h-14 rounded-xl border border-white/20"
            style={{ backgroundColor: c.primary }}
          >
            <View
              className="w-full h-1/3 mt-auto"
              style={{ backgroundColor: c.secondary }}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* CONFIRMAR */}
      <TouchableOpacity
        className="bg-yellow-500 py-4 rounded-xl mt-4"
        onPress={saveShield}
      >
        <Text className="text-center text-xl font-bold uppercase">
          Confirmar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
