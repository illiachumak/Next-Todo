
import React, { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { reg } from '@/redux/Slices/regSlice';
import { login } from '@/redux/Slices/AuthSlice';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ( {isOpen, onClose }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { isLoading } = useAppSelector(state => state.reg);
    const { isAuthenticated } = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();
    
    useLayoutEffect(() => {
        if (isAuthenticated) {
        
         onClose();
        }
    }, [isAuthenticated, onClose]);

    const registerUser =  async (email: string, password: string) => {
        dispatch(reg({email, password}))
        try {
            await dispatch(reg({ email, password }));
            await dispatch(login({ email, password }));
          } catch (error) {
            console.error("Error during registration or login:", error);
          }
    }

    const modalRoot = document.getElementById('modal-root');
    if (!isOpen || !modalRoot) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div className="relative flex flex-col items-center bg-white rounded-lg p-4 max-w-xl mx-auto w-11/12 z-11" onClick={e => e.stopPropagation()}>
                <h1 className="mb-4">Sign up</h1>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>

                <div className="form-control w-full w-11/12 mb-4">
                    <label className="label">
                        <span className="label-text">Email</span>
                        <span className="label-text-alt"></span>
                    </label>
                    {error ? 
                        <input type="text" placeholder="Email" className="input input-bordered w-full border-red-400" value={email} onChange={(e) => setEmail(e.target.value)}/> :
                        <input type="text" placeholder="Email" className="input input-bordered w-full" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        } 
                </div> 

                <div className="form-control w-full w-11/12 mb-4 pb-20">
                    <label className="label">
                        <span className="label-text">Password</span>
                        <span className="label-text-alt"></span>
                    </label>
                    {error ? 
                        <input type="password" placeholder="Password" className="input input-bordered w-full border-red-400" value={password} onChange={(e) => setPassword(e.target.value)}/> :
                        <input type="password" placeholder="Password" className="input input-bordered w-full" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    } 

                    <label className="label">
                        <span className="label-text text-red-400">{error && error}</span>
                        <span className="label-text-alt"></span>
                    </label>
                </div> 

                <div className="modal-action absolute right-10 bottom-10">
                <button className="btn btn-primary" onClick={() => registerUser(email, password)}>{isLoading ? <span className="loading loading-spinner"></span> : 'Sign up'}</button>
                </div>
            </div>
        </div>,
        modalRoot
    );
    
};

export default Modal;
