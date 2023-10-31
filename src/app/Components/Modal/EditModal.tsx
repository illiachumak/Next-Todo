"use client"

import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from "react";
import { useAppDispatch, useAppSelector} from '../../../redux/store';
import { editTaskThunk, fetchTasks } from '../../../redux/Slices/contentSlice';
import useValidateInput from '../../../app/hooks/useValidateInput';

type Task = {
    taskId: string,
    Task: string;
    Description: string;
    TimeStamp: number;
    Done: boolean;
  } | null

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task
}

const Modal: React.FC<ModalProps> = ( {isOpen, onClose, task}) => {

    if(task === null) return 
    const modalRoot = document.getElementById('modal-root');
    if (!isOpen || !modalRoot) return null;
    
    const dispatch = useAppDispatch();
    const { userId, isAuthenticated } = useAppSelector(state => state.auth)
    const [name, setName] = useState(task.Task);
    const [descr, setDescr] = useState(task.Description);
    const [error, setError] = useState('');

    const HandleEditTask = async () => {

        const inputError = useValidateInput(name, '', '')
        const inputError2 = useValidateInput(descr, '', '')
        
        if(inputError || inputError2 || name === task.Task || descr === task.Description){
            if(inputError) setError(inputError)
            if(inputError2) setError(inputError2)
            if(name === task.Task) setError('You have to change something!')
            if(descr === task.Description) setError('You have to change something!')
        } else{
            try{
                await dispatch(editTaskThunk({userId, taskId: task.taskId, data: {
                    Task: name,
                    Description: descr,
                    TimeStamp: task.TimeStamp,
                    Done: task.Done,
                }}))
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
                <h1 className="mb-6">Edit Task</h1>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                {isAuthenticated ? 
                (<>
                    <div className='pb-24 '>
                        <input type="text" placeholder="Task" value={name} onChange={(e) => setName(e.target.value)}  className="input input-bordered input-primary w-full mb-4" />
                        <textarea className="textarea textarea-primary w-full" placeholder="Description"  value={descr} onChange={(e) => setDescr(e.target.value)}></textarea>
                        <label className="label">
                        <span className="label-text text-red-400">{error && error}</span>
                        <span className="label-text-alt"></span>
                        </label>
                    </div>
                    <div className="modal-action absolute right-10 bottom-10">
                        <button className="btn btn-primary" onClick={HandleEditTask}>Edit Task</button>
                    </div>
                </>) : 
                (<>

                </>)}
                
            </div>
        </div>,
        modalRoot
    );
    
};

export default Modal;
