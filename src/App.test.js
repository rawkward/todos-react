import { jsx as _jsx } from "react/jsx-runtime";
import { render, fireEvent, screen, within } from "@testing-library/react";
import App from "./App";
describe("Todo App", () => {
    beforeEach(() => {
        render(_jsx(App, {}));
    });
    test("adds new task", () => {
        const input = screen.getByPlaceholderText("Название задачи");
        const addButton = screen.getByText("Добавить");
        fireEvent.change(input, { target: { value: "Test task" } });
        fireEvent.click(addButton);
        expect(within(screen.getByTestId("all-tasks-section")).getByText("Test task")).toBeInTheDocument();
        expect(within(screen.getByTestId("remaining-section")).getByText("Test task")).toBeInTheDocument();
        expect(within(screen.getByTestId("completed-section")).queryByText("Test task")).not.toBeInTheDocument();
    });
});
test("toggles task status", () => {
    const input = screen.getByPlaceholderText("Название задачи");
    const addButton = screen.getByText("Добавить");
    fireEvent.change(input, { target: { value: "Test task" } });
    fireEvent.click(addButton);
    const remainingSection = screen
        .getByText("Не готово (1)")
        .closest("div");
    const checkbox = within(remainingSection).getByLabelText("Test task");
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    expect(screen.getByText("Не готово (0)")).toBeInTheDocument();
    expect(screen.getByText("Готово (1)")).toBeInTheDocument();
});
