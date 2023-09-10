import React, { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { delTask, getTasks } from '../apis/apiClient'
import { Tasks } from '../../models/todos'

export function Todo() {
  const { data: todo, isLoading, error } = useQuery(['todo'], getTasks)

  const queryClient = useQueryClient()
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

    // ask facilitator whats wrong.

    queryClient.invalidateQueries(['todo'])
  }

  return (
    <div>
      {todo.map((el: any) => {
        return (
          <li key={el.id}>
            <button onClick={(event) => handleDelete(event, el.id)}>
              Delete Task
            </button>
            <input type="checkbox" />
            {el.task}
          </li>
        )
      })}
    </div>
  )
}
