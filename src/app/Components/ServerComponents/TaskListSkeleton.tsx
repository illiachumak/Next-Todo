
export default function TaskListSkeleton () {
    const dummyTodo = [1,2,3,4,5,6,7,8]
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
                            <td>Todo</td>
                            <td>Make simple todo using Next.js/Typescript</td>
                            <td>17/12/2023</td>
                            <td>-</td>
                            <td>edit \ delete</td>
                            
                        </tr>
                        )
                    })}
                  
                </tbody>
              </table>
            </div>
    </>
}
