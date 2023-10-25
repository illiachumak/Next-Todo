import AddTask from "../Components/AddTask"
import TaskList from "../Components/TaskList"

export default function TodoPage () {
    return <>
    <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <AddTask/>  
    </div>
    <TaskList/>
    </>
}
