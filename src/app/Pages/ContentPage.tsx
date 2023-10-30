'use client'
import TaskListSkeleton from "../Components/ServerComponents/TaskListSkeleton"
import AddTask from "../Components/Todo/AddTask"
import TaskList from "../Components/Todo/TaskList"
import { useAppSelector } from "@/redux/store"

export default function TodoPage () {
    const {taskList, isLoadingTasks} = useAppSelector(state => state.cont)
    return <>
    <div className="text-center my-5 flex flex-col gap-4">
        <AddTask/>  
    </div>
    {taskList && !isLoadingTasks ? <TaskList/> : <TaskListSkeleton/>}
    </>
}
