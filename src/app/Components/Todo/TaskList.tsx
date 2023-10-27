

export default function TaskList () {
    return <>
            <div className="overflow-x-auto z-1">
              <table className="table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Time stamp</th>
                    <th>Done</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Todo</td>
                    <td>Make simple todo using Next.js/Typescript</td>
                    <td>17/12/2023</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
    </>
}
