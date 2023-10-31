"use client"

import React, { useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { useState } from "react";
import { useAppDispatch, useAppSelector} from '../../redux/store';
import { login, returnError } from '../../redux/Slices/authSlice';
import { fetchTasks } from '../../redux/Slices/contentSlice';
import useValidateInput from '../../hooks/useValidateInput';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ( {isOpen, onClose }) => {

    const dispatch = useAppDispatch();
    const { isAuthenticated, isLoading, userId, errorMessage} = useAppSelector(state => state.auth)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    

    useLayoutEffect( () => {
        dispatch(fetchTasks(userId))
        if (isAuthenticated) {
         onClose();
        }
    }, [isAuthenticated, onClose, dispatch]);
    
    const loginUser = async (email: string, password: string) => {

        const inputError = useValidateInput(email, 'email', '')
        const inputError2 = useValidateInput(password, '', '')

        if(inputError || inputError2){
            if(inputError || inputError2){
                if(inputError) setError(inputError)
                else setError(inputError2)
            }
        }else{

            try{
                setError('')
                await dispatch(login({email, password}))
                
            } catch (error) {
                console.error(error)
            }
        }
    }

    const modalRoot = document.getElementById('modal-root');
    if (!isOpen || !modalRoot) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50" onClick={() => {
            dispatch(returnError())
            onClose()}}>
            <div className="relative flex flex-col items-center bg-white rounded-lg p-4 max-w-xl mx-auto w-11/12 z-11" onClick={e => e.stopPropagation()}>
                <h1 className="mb-4">Log in</h1>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => {
            dispatch(returnError())
            onClose()}}>✕</button>

                <div className="form-control w-full w-11/12 mb-4">
                    <label className="label">
                        <span className="label-text">Email</span>
                        <span className="label-text-alt"></span>
                    </label>
                    {error || errorMessage ? 
                        <input type="text" placeholder="Email" className="input input-bordered w-full border-red-400" value={email} onChange={(e) => setEmail(e.target.value)}/> :
                        <input type="text" placeholder="Email" className="input input-bordered w-full" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        } 
                </div> 

                <div className="form-control w-full w-11/12 mb-4 pb-20">
                    <label className="label">
                        <span className="label-text">Password</span>
                        <span className="label-text-alt"></span>
                    </label>
                    {error || errorMessage ? 
                        <input type="password" placeholder="Password" className="input input-bordered w-full border-red-400" value={password} onChange={(e) => setPassword(e.target.value)}/> :
                        <input type="password" placeholder="Password" className="input input-bordered w-full" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    } 

                    <label className="label">
                        <span className="label-text text-red-400">{error && error}{errorMessage && errorMessage}</span>
                        <span className="label-text-alt"></span>
                    </label>
                </div> 

                <div className="modal-action absolute right-10 bottom-10">
                <button className="btn btn-primary" onClick={() => loginUser(email, password)}>{isLoading ? <span className="loading loading-spinner"></span> : 'Sign in'}</button>
                </div>
            </div>
        </div>,
        modalRoot
    );
    
};

export default Modal;
