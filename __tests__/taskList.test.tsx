import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import TaskList from "../src/app/Components/Todo/TaskList";
import { Task } from "../src/app/Components/Todo/TaskList";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function renderWithStore(tasks: Task[] = []) {
    const store = mockStore({
        cont: { taskList: tasks },
        auth: { userId: "testUserId" }
    });
    render(
        <Provider store={store}>
            <TaskList />
        </Provider>
    );
    return store;
}

describe("<TaskList />", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it("renders without crashing", () => {
        renderWithStore();
    });

    it("displays tasks", () => {
        const tasks = [{
            taskId: "1",
            Task: "Test Task",
            Description: "This is a test task",
            TimeStamp: Date.now(),
            Done: false
        }];

        renderWithStore(tasks);

        expect(screen.getByText("Test Task")).toBeInTheDocument();
        expect(screen.getByText("This is a test task")).toBeInTheDocument();
    });

    it("toggles task status", () => {
        const tasks = [{
            taskId: "1",
            Task: "Test Task",
            Description: "This is a test task",
            TimeStamp: Date.now(),
            Done: false
        }];

        renderWithStore(tasks);

        const toggleInput = screen.getByRole("checkbox");
        fireEvent.click(toggleInput);
    });
});
