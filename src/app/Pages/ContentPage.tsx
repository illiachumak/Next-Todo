import AddTask from "../Components/Todo/AddTask"
import TaskList from "../Components/Todo/TaskList"

export default function TodoPage () {
    return <>
    <div className="text-center my-5 flex flex-col gap-4">
        <AddTask/>  
    </div>
    <TaskList/>
    </>
}
