import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { delTask, getTasks } from '../apis/apiClient'
import { Tasks } from '../../models/todos'
import { EditTasks } from './EditTasks'

export function Todo() {
  const { data: todo, isLoading, error } = useQuery(['todo'], getTasks)
  const queryClient = useQueryClient()
  const delMutation = useMutation(delTask, {
    onSuccess: () => {
      // Refetching the tasks after a successful mutation to update the data
      console.log('hello')
      queryClient.invalidateQueries(['todo'])
    },
  })

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

    // console.log('delete button component')
    // console.log(taskId)
    delMutation.mutate(taskId)
  }

  return (
    <div>
      {todo.map((el: any) => {
        return (
          <li key={el.id}>
            <EditTasks id={el.id} />
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
