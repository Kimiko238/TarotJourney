import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import ShuffleAnimation from "../ShuffleMotion";

jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);

describe("ShuffleMotion", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("カード枚数が12枚レンダリングされる", () => {
    const { getAllByTestId } = render(
      <ShuffleAnimation spread="single" onSwitchPress={jest.fn()} />
    );
    expect(getAllByTestId("shuffle-card")).toHaveLength(12);
  });

  it("ボタン押下でonSwitchPressを呼び出す", () => {
    const handler = jest.fn();
    const { getByText } = render(
      <ShuffleAnimation spread="single" onSwitchPress={handler} />
    );
    fireEvent.press(getByText("カードを引く"));
    jest.runOnlyPendingTimers();
    expect(handler).toHaveBeenCalled();
  });
});
