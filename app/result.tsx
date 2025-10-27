import { Link, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet } from "react-native";

import { cardImages } from "@/components/cardImages";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
export default function ResultScreen() {
  const { postDataList } = useLocalSearchParams();
  const result = JSON.parse(postDataList as string);
  console.log(result.id);
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">
        あなたが引いたカードのメッセージを受け取りましょう。
      </ThemedText>
      <Image source={cardImages[result.id]} />
      <ThemedText style={styles.description}>
        カードの内容は近日中に追加されます。
      </ThemedText>
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
  link: {
    marginTop: 24,
    paddingVertical: 12,
  },
});
