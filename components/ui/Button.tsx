
import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  label: string;
  onClick: () => void;
};

export default function ButtonImage({ label, onClick }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
      onPress={onClick}
      accessibilityRole="button"
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7c21a3",
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 48,
    minWidth: 260,
    alignItems: "center",
    alignSelf: "center",
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
  },
});
