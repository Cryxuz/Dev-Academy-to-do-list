import AddTasks from './AddTasks.tsx'
import { EditTasks } from './EditTasks.tsx'
import { Todo } from './Todo.tsx'

function App() {
  return (
    <>
      <h1>To Do:</h1>
      <AddTasks />
      <Todo />
    </>
  )
}

export default App
