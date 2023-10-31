import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Modal from "../src/app/Components/Modal/ModalReg";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-dom', () => {
  const originalReactDOM = jest.requireActual('react-dom');
  return {
    ...originalReactDOM,
    createPortal: (node: any) => node,
  };
});

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
        },
        reg: {
            isLoading: false,
            errorReg: "",
        }
    };

    function renderWithStore(state = initialState, props = {}) {
        const store = mockStore(state);
        return {
            ...render(
                <Provider store={store}>
                    <Modal isOpen={false} onClose={jest.fn()} {...props} />
                </Provider>
            ),
            store
        };
    }

    it("renders without crashing", () => {
        renderWithStore(undefined, { isOpen: true, onClose: jest.fn() });
    });

    it("shows the registration form when open", () => {
        renderWithStore(undefined, { isOpen: true, onClose: jest.fn() });
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    });

    it("closes the modal when the close button is clicked", () => {
        const onCloseMock = jest.fn();
        renderWithStore(undefined, { isOpen: true, onClose: onCloseMock });

        const closeButton = screen.getByText("✕");
        fireEvent.click(closeButton);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it("displays error messages", async () => {
        const errorMessage = "Registration failed!";
        renderWithStore({
            auth: {
                isAuthenticated: false,
                isLoading: false,
                userId: "testUserId",
                errorMessage: ""
            },
            reg: {
                ...initialState.reg,
                errorReg: errorMessage
            }
        }, { isOpen: true, onClose: jest.fn() });

        await act(async () => { await Promise.resolve() });

        const errorMsgElement = screen.queryByText(errorMessage);
        expect(errorMsgElement).toBeInTheDocument();
    });

    it("does not submit the registration form with invalid input", async () => {
        const email = "invalid-email";
        const password = "";
        const regActionMock = jest.fn();

        renderWithStore(undefined, {
            isOpen: true,
            onClose: jest.fn(),
            registerUser: regActionMock,
        });

        const emailInput = screen.getByPlaceholderText("Email");
        const passwordInput = screen.getByPlaceholderText("Password");
        const submitButton = screen.getByTestId("sign-up-button");

        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.change(passwordInput, { target: { value: password } });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(regActionMock).not.toHaveBeenCalled();
    });
});
