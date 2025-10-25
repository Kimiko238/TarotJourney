import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>あなたが気になることは何でしょうか？</Text>
        <Text>タロットを引いてみましょう</Text>

        <Button
          title="1枚引く"
          onPress={() => router.push("/drow?spread=single")}
        />
      </View>
    </ThemedView>
  );
}
