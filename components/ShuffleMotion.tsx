import { useEffect, useRef } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import ButtonImage from "./ui/Button";

const { width, height } = Dimensions.get("window");

const cards = [
  require("../assets/images/back_side.png"),
  require("../assets/images/back_side.png"),
  require("../assets/images/back_side.png"),
  require("../assets/images/back_side.png"),
  require("../assets/images/back_side.png"),
  require("../assets/images/back_side.png"),
  require("../assets/images/back_side.png"),
  require("../assets/images/back_side.png"),
  require("../assets/images/back_side.png"),
  require("../assets/images/back_side.png"),
  require("../assets/images/back_side.png"),
  require("../assets/images/back_side.png"),
];

export default function ShuffleAnimation({
  spread,
  onSwitchPress,
}: {
  spread: string;
  onSwitchPress: () => void;
}) {
  const rotations = cards.map(() => useSharedValue(0));
  const positions = cards.map(() => ({
    x: useSharedValue(0),
    y: useSharedValue(0),
  }));
  const navigationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const rotationDelayTimers: Array<ReturnType<typeof setTimeout>> = [];
    const positionDelayTimers: Array<ReturnType<typeof setTimeout>> = [];
    // 繰り返しのシャッフル動作
    rotations.forEach((rotation, i) => {
      const delay = i * 100;
      const timer = setTimeout(() => {
        rotation.value = withRepeat(
          withSequence(
            withTiming(-45 + Math.random() * 30, {
              duration: 800,
              easing: Easing.linear,
            }),
            withTiming(45 + Math.random() * 30, {
              duration: 800,
              easing: Easing.linear,
            })
          ),
          -1,
          true
        );
      }, delay);
      rotationDelayTimers.push(timer);
    });

    positions.forEach((p, i) => {
      const delay = i * 150;
      const timer = setTimeout(() => {
        const randomRangeX = width * 0.25;
        const randomRangeY = height * 0.25;

        p.x.value = withRepeat(
          withSequence(
            withTiming((Math.random() - 0.5) * randomRangeX, { duration: 900 }),
            withTiming((Math.random() - 0.2) * randomRangeX, { duration: 400 })
          ),
          -1,
          true
        );

        p.y.value = withRepeat(
          withSequence(
            withTiming((Math.random() - 0.4) * randomRangeY, { duration: 400 }),
            withTiming((Math.random() - 0.5) * randomRangeY, { duration: 900 })
          ),
          -1,
          true
        );
      }, delay);
      positionDelayTimers.push(timer);
    });

    return () => {
      rotations.forEach(cancelAnimation);
      positions.forEach((p) => {
        cancelAnimation(p.x);
        cancelAnimation(p.y);
      });
      rotationDelayTimers.forEach(clearTimeout);
      positionDelayTimers.forEach(clearTimeout);

      if (navigationTimeout.current) {
        clearTimeout(navigationTimeout.current);
      }
    };
  }, []);

  //見た目に反映
  const animatedStyles = rotations.map((r, i) =>
    useAnimatedStyle(() => ({
      transform: [
        { rotate: `${r.value}deg` },
        { translateX: positions[i].x.value },
        { translateY: positions[i].y.value },
      ],
    }))
  );

  // 「カードを引く」ボタンを押下時：アニメ停止→位置を戻す→onShuffleEnd()
  const handleDrawPress = () => {
    rotations.forEach(cancelAnimation);
    rotations.forEach((r) => (r.value = withTiming(0, { duration: 200 })));
    positions.forEach((p) => {
      p.x.value = withTiming(0, { duration: 200 });
      p.y.value = withTiming(0, { duration: 200 });
    });
    if (navigationTimeout.current) {
      clearTimeout(navigationTimeout.current);
    }

    navigationTimeout.current = setTimeout(() => {
      onSwitchPress();
    }, 300);
  };

  return (
    <View style={styles.root}>
      <View style={styles.cardField}>
        <View style={styles.container}>
          {cards.map((card, i) => (
            <Animated.View
              key={i}
              style={[
                styles.card,
                { zIndex: i, position: "absolute" },
                animatedStyles[i],
              ]}
            >
              <Image
                source={card}
                style={styles.image}
                resizeMode="contain"
                testID="shuffle-card"
              />
            </Animated.View>
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonImage label="カードを引く" onClick={handleDrawPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 32,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  cardField: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  card: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: "#ddd",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },

  buttonContainer: {
    paddingBottom: 16,
    width: "100%",
    alignItems: "center",
  },
});
