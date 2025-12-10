// 🛡️ GAME.JSX — ESCUDO + GAME OVER FIXADO

import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  PanResponder,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Game() {
  const [stats, setStats] = useState({
    elenco: 100,
    diretoria: 100,
    torcida: 100,
    financeiro: 100,
  });

  const [meses, setMeses] = useState(0);

  const [shield, setShield] = useState(null);

  useEffect(() => {
    const loadShield = async () => {
      try {
        const data = await AsyncStorage.getItem("@custom_shield");
        if (data) {
          setShield(JSON.parse(data));
        } else {
          setShield({
            shape: "classic",
            pattern: "vertical",
            colors: { primary: "#0044cc", secondary: "#ffffff" },
          });
        }
      } catch (error) {
        console.log("Erro ao carregar escudo:", error);
      }
    };

    loadShield();
  }, []);

  const getShapeStyle = (shape) => {
    switch (shape) {
      case "classic":
        return {
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        };

      case "circle":
        return { borderRadius: 999 };

      case "square":
        return { borderRadius: 12 };

      case "diamond":
        return { transform: [{ rotate: "45deg" }] };

      case "medieval":
        return {
          borderTopLeftRadius: 80,
          borderTopRightRadius: 80,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        };

      default:
        return { borderRadius: 20 };
    }
  };

  const renderShieldPattern = (pattern, colors) => {
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
                borderLeftWidth: 30,
                borderRightWidth: 30,
                borderBottomWidth: 40,
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                borderBottomColor: colors.secondary,
                position: "absolute",
                top: "20%",
              }}
            />
          </View>
        );

      default:
        return null;
    }
  };

  const cards = [
    {
      id: 1,
      title: "O craque do time pediu aumento salarial!",
      img: "https://upload.wikimedia.org/wikipedia/commons/6/65/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg",
      description: "Aceitar pode melhorar o humor do elenco, mas prejudica as finanças.",
      effects: {
        yes: { elenco: +20, financeiro: -20 },
        no: { elenco: -10, torcida: -5 },
      },
    },

    {
      id: 2,
      title: "Um patrocinador quer renovar por mais 5 anos.",
      img: "https://www.theladders.com/wp-content/uploads/handshake_190617-800x450.jpg",
      description: "Aceitar fortalece o caixa, mas a diretoria está desconfiada.",
      effects: {
        yes: { financeiro: +20, diretoria: -15 },
        no: { financeiro: -5, torcida: -5 },
      },
    },

    {
      id: 3,
      title: "A torcida pede ingressos mais baratos.",
      img: "https://ludopedio.org.br/wp-content/uploads/santos-x-flamengo-7.jpg",
      description: "Aceitar aumenta popularidade, mas prejudica a receita.",
      effects: {
        yes: { torcida: +25, financeiro: -10 },
        no: { torcida: -101 },
      },
    },
  ];

  const [cardIndex, setCardIndex] = useState(0);

  const position = useRef(new Animated.ValueXY()).current;

  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (_, gesture) => {
      const threshold = 120;

      if (gesture.dx > threshold) handleSwipe("yes");
      else if (gesture.dx < -threshold) handleSwipe("no");
      else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true
        }).start();
      }
    },
  });

  const applyEffects = (effects) => {
    setStats(prev => {
      const updated = {
        elenco: Math.max(0, Math.min(100, prev.elenco + (effects.elenco ?? 0))),
        diretoria: Math.max(0, Math.min(100, prev.diretoria + (effects.diretoria ?? 0))),
        torcida: Math.max(0, Math.min(100, prev.torcida + (effects.torcida ?? 0))),
        financeiro: Math.max(0, Math.min(100, prev.financeiro + (effects.financeiro ?? 0))),
      };

      // 🔥 AGORA O GAME OVER É CHECADO IMEDIATAMENTE
      if (
        updated.elenco <= 0 ||
        updated.diretoria <= 0 ||
        updated.torcida <= 0 ||
        updated.financeiro <= 0
      ) {
        router.push({
          pathname: "/gameover",
          params: { meses }
        });
      }

      return updated;
    });
  };

  const handleSwipe = (choice) => {
    Animated.timing(position, {
      toValue: { x: choice === "yes" ? 500 : -500, y: 0 },
      duration: 250,
      useNativeDriver: true,
    }).start(() => {

      const event = cards[cardIndex];

      applyEffects(event.effects[choice]);

      setMeses(prev => prev + Math.floor(Math.random() * 4) + 2);

      setCardIndex((i) => (i + 1) % cards.length);

      position.setValue({ x: 0, y: 0 });
    });
  };

  const rotate = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-10deg', '0deg', '10deg']
  });

  const opacity = position.x.interpolate({
    inputRange: [-150, 0, 150],
    outputRange: [0.8, 1, 0.8]
  });

  const card = cards[cardIndex];

  if (!shield) {
    return (
      <View className="flex-1 bg-[#003300] items-center justify-center">
        <Text className="text-white text-lg">Carregando escudo...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#003300]">

      <View className="flex-row justify-between h-20 flex items-center px-6 mb-8 bg-stone-700">
        <Status label="Elenco" value={stats.elenco} />
        <Status label="Diretoria" value={stats.diretoria} />
        <Status label="Torcida" value={stats.torcida} />
        <Status label="Finanças" value={stats.financeiro} />
      </View>

      <View className="flex-1 items-center justify-center">

        <Animated.View
          {...pan.panHandlers}
          style={{
            transform: [{ translateX: position.x }, { translateY: position.y }, { rotate }],
            opacity,
          }}
          className="absolute bg-white/10 border border-white/20 rounded-2xl p-6 w-full max-w-xs shadow-xl"
        >
          <Text className="text-white text-xl font-bold text-center mb-4">
            {card.title}
          </Text>

          <Image
            source={{ uri: card.img }}
            className="w-screen h-96 rounded-xl mb-4"
            resizeMode="cover"
          />

          <Text className="text-white/90 text-center text-sm">
            {card.description}
          </Text>
        </Animated.View>
      </View>

      <View className="bg-stone-700 flex flex-row justify-between px-6 py-4">

        <View className="flex-col justify-center">
          <Text className="text-lg text-white">Seu treinador</Text>
          <Text className="text-lg text-white">{meses} meses de gestão</Text>
        </View>

        <View
          className="w-14 h-16 overflow-hidden items-center justify-center"
          style={{
            borderColor: shield.colors.secondary,
            borderWidth: 3,
            backgroundColor: shield.colors.primary,
            ...getShapeStyle(shield.shape),
          }}
        >
          {renderShieldPattern(shield.pattern, shield.colors)}
        </View>

      </View>

    </View>
  );
}

function Status({ label, value }) {
  return (
    <View className="items-center">
      <Text className="text-white text-xs mb-1 uppercase">{label}</Text>
      <View className="w-16 h-2 bg-white/20 rounded-full">
        <View
          className="h-full bg-yellow-400 rounded-full"
          style={{ width: `${value}%` }}
        />
      </View>
    </View>
  );
}
