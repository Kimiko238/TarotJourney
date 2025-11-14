import React from "react";
import { render } from "@testing-library/react-native";
import ResultScreen from "../result";

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(() => ({
    postDataList: JSON.stringify([
      { id: "0", name: "テスト1", isReversed: false },
      { id: "1", name: "テスト2", isReversed: true },
    ]),
  })),
  Link: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/components/cardImages", () => ({
  cardImages: {
    "0": 1,
    "1": 1,
  },
}));

describe("ResultScreen", () => {
  it("カードが表示されること", () => {
    const { getAllByTestId, getByText } = render(<ResultScreen />);

    expect(getAllByTestId("result-card-image")).toHaveLength(2);
    expect(getByText("テスト1（正位置）")).toBeTruthy();
    expect(getByText("テスト2（逆位置）")).toBeTruthy();
  });
});
