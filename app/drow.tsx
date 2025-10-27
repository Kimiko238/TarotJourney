import React from "react";
import { StyleSheet } from "react-native";
import ShuffleAnimation from "../components/ShuffleMotion";
import { router } from "expo-router";
import { drawOne } from "@/components/spreadAlgrithm"

export default function ShuffleView(spread: string) {
  const handlePress = () => {
    // シャッフル停止、抽選コンポーネント表示、結果画面へ遷移など
    console.log("ボタンが押されました。ここで抽選を開始します。");
    let result;
    result = drawOne();
     router.push({pathname:"/result", params: {postDataList:JSON.stringify(result)}});
  };

  return (
    
  <ShuffleAnimation spread={spread} onSwitchPress={handlePress} />
);
}

const styles = StyleSheet.create({});
