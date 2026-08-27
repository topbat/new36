import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("interactive museum prototype", () => {
  it("opens with the first exhibit and can switch to another stratagem", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole("heading", { name: /围魏救赵/ })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /第三十六计.*走为上/ }));
    expect(screen.getByRole("heading", { name: /走为上/ })).toBeInTheDocument();
    expect(screen.getByText(/败局止损，不是消极逃避/)).toBeInTheDocument();
  });

  it("turns a scenario choice into consequence and review feedback", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /转向关键瓶颈/ }));
    expect(screen.getByRole("status")).toHaveTextContent("你选择了");
    expect(screen.getByText("局势判断")).toBeInTheDocument();
    expect(screen.getByText("可逆性")).toBeInTheDocument();
  });

  it("labels the prototype boundary honestly", () => {
    render(<App />);
    expect(screen.getByText("静态分支原型 · 未连接生成式 AI")).toBeInTheDocument();
  });
});
