import TaskListSkeleton from "../Components/ServerComponents/TaskListSkeleton"
import AddTask from "../Components/Todo/AddTask"

export default function LoginPage () {

    return <>
    <div className="text-center my-5 flex flex-col gap-4">
        <AddTask/>  
    </div>
    <TaskListSkeleton/>
    </>
}
