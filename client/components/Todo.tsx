import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { delTask, getTasks } from '../apis/apiClient'
import { Tasks } from '../../models/todos'

export function Todo() {
  const { data: todo, isLoading, error } = useQuery(['todo'], getTasks)

  // finish the useState to update the page everytime a user deletes a task
  const [task, setTask] = useState()
  if (error) {
    return <p>Something went wrong.</p>
  }
  if (isLoading || !todo) {
    return <p>Loading...Please wait.</p>
  }

  // Handling the delete

  async function handleDelete(
    event: React.MouseEvent<HTMLButtonElement>,
    taskId: number,
  ) {
    event.preventDefault() // this prevents the default form submission behavior

    console.log('delete button component')
    console.log(taskId)
    await delTask(taskId)
  }

  return (
    <div>
      {todo.map((el: any) => {
        return (
          <li key={el.id}>
            <input type="checkbox" />
            {el.task}
            <button onClick={(event) => handleDelete(event, el.id)}>X</button>
          </li>
        )
      })}
    </div>
  )
}
