import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("responsive interactive museum", () => {
  it("opens with six galleries and can enter an exhibit", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole("heading", { name: /六卷三十六计/ })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /进入.*展厅/ })).toHaveLength(6);
    await user.click(screen.getByRole("button", { name: /第三十六计.*走为上/ }));
    expect(screen.getByRole("heading", { name: /走为上/ })).toBeInTheDocument();
    expect(screen.getByText(/败局止损，不是消极逃避/)).toBeInTheDocument();
  });

  it("turns a scenario choice into consequence and review feedback", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /第二计.*围魏救赵/ }));
    await user.click(screen.getByRole("button", { name: /转向关键瓶颈/ }));
    expect(screen.getByRole("status")).toHaveTextContent("你选择了");
    expect(screen.getByText("局势判断")).toBeInTheDocument();
    expect(screen.getByText("可逆性")).toBeInTheDocument();
  });

  it("labels content and AI boundaries honestly", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /第二计.*围魏救赵/ }));
    expect(screen.getByText("静态分支原型 · 未连接生成式 AI")).toBeInTheDocument();
    expect(screen.getByText(/内容审核中/)).toBeInTheDocument();
  });

  it("offers graph, learning, teacher and admin workspaces", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "关系图谱" }));
    expect(screen.getByRole("heading", { name: "计策关系图谱" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "学习中心" }));
    expect(screen.getByRole("heading", { name: "我的学习进度" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "教师工作台" }));
    expect(screen.getByRole("heading", { name: "课堂活动卡" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "内容管理" }));
    expect(screen.getByRole("heading", { name: "内容审核台" })).toBeInTheDocument();
  });
});
