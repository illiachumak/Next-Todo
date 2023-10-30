import { useState } from "react"
import { AiFillEdit } from "react-icons/ai"
import { BsFillTrashFill } from "react-icons/bs"

export default function TaskListSkeleton () {
    const dummyTodo = [1,2,3,4,5,6]
    const [checkInput, setCheckInput] = useState(true)
    return <>
            <div className="overflow-x-auto select-none">
              <table className="table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Time stamp</th>
                    <th>Done</th>
                    <th></th>
                    
                  </tr>
                </thead>
                <tbody>
                    {dummyTodo.map((_,i) => {
                        return(
                        <tr key={i}>
                <td>Task</td>
                <td className="max-w-xs break-words">Description</td>
                <td>30.10.2023</td>
                <td><div className="form-control w-52">
                  <label className="cursor-pointer label">
                    <input 
                      type="checkbox" 
                      className="toggle toggle-primary" 
                      checked={checkInput}
                      onChange={() => setCheckInput(prev => !prev)}
                      
                    />
                    <span className="label-text">Done</span>
                  </label>
                </div>
                </td>
                <td className="min-h-full py-2 flex items-center justify-center space-x-4 pt-5">
                  <AiFillEdit className="text-3xl"/>
                  <BsFillTrashFill className="text-3xl"/>
                </td>

              </tr>
                        
                        )
                    })}
                  
                </tbody>
              </table>
            </div>
    </>
}
