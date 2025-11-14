import { ThemedView } from "@/components/themed-view";
import ButtonImage from "@/components/ui/Button";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>あなたが気になることは何でしょうか？</Text>
        <Text>タロットを引いてみましょう</Text>

        <ButtonImage
          label="1枚引く"
          onClick={() => router.push("/drow?spread=single")}
        />
      </View>
    </ThemedView>
  );
}
