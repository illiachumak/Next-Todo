import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Modal from "../src/app/Components/Modal/ModalLogin";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock ReactDOM.createPortal for portal behavior
jest.mock('react-dom', () => {
  const originalReactDOM = jest.requireActual('react-dom');
  return {
    ...originalReactDOM,
    createPortal: (node: any) => node,
  };
});

// Set up modal root
const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

describe("<Modal />", () => {

    const initialState = {
        auth: {
            isAuthenticated: false,
            isLoading: false,
            userId: "testUserId",
            errorMessage: ""
        }
    };

    function renderWithStore(state = initialState, props = {}) {
        const store = mockStore(state);
        return {
            ...render(
                <Provider store={store}>
                    <Modal isOpen={false} onClose={function (): void {
                        throw new Error("Function not implemented.");
                    } } {...props} />
                </Provider>
            ),
            store
        };
    }

    it("renders without crashing", () => {
        renderWithStore(undefined, { isOpen: true, onClose: jest.fn() });
    });

    it("shows the login form when open", () => {
        renderWithStore(undefined, { isOpen: true, onClose: jest.fn() });
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    });

    it("closes the modal when close button is clicked", () => {
        const onCloseMock = jest.fn();
        renderWithStore(undefined, { isOpen: true, onClose: onCloseMock });

        const closeButton = screen.getByText("✕");
        fireEvent.click(closeButton);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it("displays error messages", async () => {
        const errorMessage = "Login failed!";
        renderWithStore({
            auth: {
                ...initialState.auth,
                errorMessage
            }
        }, { isOpen: true, onClose: jest.fn() });

        await act(async () => { await Promise.resolve() });

        const errorMsgElement = screen.queryByText(errorMessage);
        expect(errorMsgElement).toBeInTheDocument();
    });

    // ... Add more test cases as needed
});
