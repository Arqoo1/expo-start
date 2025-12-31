import React from "react";
import { render } from "@testing-library/react-native";
import { Tabs } from "expo-router"; 
import TabLayout from "../app/(tabs)/_layout";

//VIRTUAL MOCK
jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    Ionicons: (props) => React.createElement("Ionicons", props),
  };
}, { virtual: true });

jest.mock("expo-router", () => {
  const React = require("react");
  const MockScreen = (props) => null;
  const MockTabs = ({ children }) => React.createElement("Tabs", {}, children);

  MockTabs.Screen = MockScreen;
  return {
    Tabs: MockTabs,
  };
});

describe("TabLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the correct number of tab screens", () => {
    const spy = jest.spyOn(Tabs, "Screen");
    render(<TabLayout />);
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it("configures the Home tab with the correct icon", () => {
    const spy = jest.spyOn(Tabs, "Screen");
    render(<TabLayout />);

    const homeCall = spy.mock.calls.find(call => call[0].name === "index");
    const iconFunc = homeCall[0].options.tabBarIcon;
    
    const IconComponent = iconFunc({ color: "#000", size: 24 });

    expect(IconComponent.props.name).toBe("home-outline");
  });
});