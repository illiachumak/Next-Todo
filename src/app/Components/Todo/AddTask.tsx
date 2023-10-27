import { AiOutlinePlus } from 'react-icons/ai'

export default function AddTask (active: any) {
    return <>
        <button className="btn btn-primary w-full rounded-2xl" onClick={() => console.log(active.active)}>
            Add Task 
            <AiOutlinePlus size={20}/>
        </button>
    </>
}
