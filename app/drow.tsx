import React from "react";
import { StyleSheet } from "react-native";
import ShuffleAnimation from "../components/ShuffleMotion";
import { router } from "expo-router";

export default function ShuffleView(spread: string) {
  const handlePress = () => {
    // シャッフル停止、抽選コンポーネント表示、結果画面へ遷移など
    console.log("ボタンが押されました。ここで抽選を開始します。");


     router.push("/result");
  };

  return <ShuffleAnimation spread={spread} onSwitchPress={handlePress} />;
}

const styles = StyleSheet.create({});
