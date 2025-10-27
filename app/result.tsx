import React from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

import { Card } from "@/components/Data";
import { cardImages } from "@/components/cardImages";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
export default function ResultScreen() {
  const params = useLocalSearchParams<{ postDataList?: string | string[] }>();

  const cards = React.useMemo<Card[]>(() => {
    const raw = params.postDataList;
    const serialized = Array.isArray(raw) ? raw[0] : raw;
    if (!serialized) {
      return [];
    }

    try {
      const parsed = JSON.parse(serialized);
      if (Array.isArray(parsed)) {
        return parsed as Card[];
      }
      if (parsed && typeof parsed === "object") {
        return [parsed as Card];
      }
      return [];
    } catch (error) {
      console.warn("結果データの解析に失敗しました", error);
      return [];
    }
  }, [params.postDataList]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">あなたが引いたカードはこちら。</ThemedText>
      {cards.length > 0 ? (
        <View style={styles.cardsWrapper}>
          {cards.map((card) => {
            const source = cardImages[card.id];
            return (
              <View style={styles.cardBlock} key={card.id}>
                {source && <Image source={source} style={styles.cardImage} />}
                <ThemedText type="subtitle">{card.name}</ThemedText>
              </View>
            );
          })}
        </View>
      ) : (
        <ThemedText style={styles.description}>
          結果の取得に失敗しました。お手数ですがもう一度お試しください。
        </ThemedText>
      )}
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">ホームに戻る</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#E1BEE7",
  },
  description: {
    textAlign: "center",
    marginTop: 16,
    lineHeight: 22,
  },
  cardsWrapper: {
    width: "100%",
    alignItems: "center",
  },
  cardBlock: {
    alignItems: "center",
    marginVertical: 12,
  },
  cardImage: {
    width: 200,
    height: 340,
    resizeMode: "contain",
    marginVertical: 16,
  },
  link: {
    marginTop: 24,
    paddingVertical: 12,
  },
});
