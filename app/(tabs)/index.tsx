import { Text, View, Button} from "react-native";
import {router} from 'expo-router';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>あなたが気になることは何でしょうか？</Text>
      <Text>タロットを引いてみましょう</Text>
    
    <Button title= "1枚引く" onPress={() => router.push('/drow')} />
    </View>
  );
}
