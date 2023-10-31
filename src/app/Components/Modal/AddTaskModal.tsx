"use client"

import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from "react";
import { useAppDispatch, useAppSelector} from '../../../redux/store';
import { addTask, fetchTasks } from '../../../redux/Slices/contentSlice';
import useValidateInput from '../../../app/hooks/useValidateInput';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ( {isOpen, onClose }) => {

    const modalRoot = document.getElementById('modal-root');
    if (!isOpen || !modalRoot) return null;
    
    const dispatch = useAppDispatch();
    const { userId, isAuthenticated } = useAppSelector(state => state.auth)
    const [name, setName] = useState('');
    const [descr, setDescr] = useState('');
    const [error, setError] = useState('');

    const HandleAddTask = async () => {
        const inputError = useValidateInput(name, '', '')
        const inputError2 = useValidateInput(descr, '', '')
        if(inputError || inputError2){
            if(inputError) setError(inputError)
            else setError(inputError2)
        }
        else{
            try{
            await dispatch(addTask({ userId, name, descr }));  
            await dispatch(fetchTasks(userId))
            onClose()
            } catch (e){
                console.error(e)
            }
    }
        
    }
    


    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div className="relative flex flex-col items-center bg-white rounded-lg p-4 max-w-xl mx-auto w-11/12" onClick={e => e.stopPropagation()}>
                <h1 className="mb-6">Add Task</h1>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                {isAuthenticated ? 
                (<>
                    <div className='pb-24'>
                        <input type="text" placeholder="Task" value={name} onChange={(e) => setName(e.target.value)}  className="input input-bordered input-primary w-full mb-4" />
                        <textarea className="textarea textarea-primary w-full" placeholder="Description"  value={descr} onChange={(e) => setDescr(e.target.value)}></textarea>
                        <label className="label">
                        <span className="label-text text-red-400">{error && error}</span>
                        <span className="label-text-alt"></span>
                        </label>
                    </div>
                    <div className="modal-action absolute right-10 bottom-10">
                        <button className="btn btn-primary" onClick={HandleAddTask}>Add Task</button>
                    </div>
                </>) : 
                (<>
                    <h1 className="mb-6">You need to be logged in to use our app!</h1>
                </>)}
                
            </div>
        </div>,
        modalRoot
    );
    
};

export default Modal;
