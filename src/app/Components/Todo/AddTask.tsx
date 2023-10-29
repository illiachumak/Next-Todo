import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'
import AddTaskModal from '../Modal/AddTaskModal';

export default function AddTask () {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenAddModal = () => {
            setIsOpen(true)
    }

    return <>
        {isOpen && <AddTaskModal isOpen={isOpen} onClose={() => setIsOpen(false)}/> }
        <button className="btn btn-primary w-full rounded-2xl" onClick={handleOpenAddModal}>
            Add Task 
            <AiOutlinePlus size={20}/>
        </button>
    </>
}
