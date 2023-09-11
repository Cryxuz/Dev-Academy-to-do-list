import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { delTask, getTasks } from '../apis/apiClient'
import { Tasks } from '../../models/todos'
import { EditTasks } from './EditTasks'

export function Todo() {
  const [checkedTasks, setCheckedTasks] = useState([])

  const { data: todo, isLoading, error } = useQuery(['todo'], getTasks)

  // Date
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()

  const queryClient = useQueryClient()
  const delMutation = useMutation(delTask, {
    onSuccess: () => {
      // Refetching the tasks after a successful mutation to update the data
      queryClient.invalidateQueries(['todo'])
    },
  })

  if (error) {
    return <p>Something went wrong.</p>
  }
  if (isLoading || !todo) {
    return <p>Loading... Please wait.</p>
  }

  // Handling the delete
  async function handleDelete(
    event: React.MouseEvent<HTMLButtonElement>,
    taskId: number,
  ) {
    event.preventDefault()
    delMutation.mutate(taskId)
  }

  // Function to handle checkbox change
  function handleCheckboxChange(event, taskId) {
    if (event.target.checked) {
      // If checked, add the task id to the checkedTasks array
      setCheckedTasks([...checkedTasks, taskId])
    } else {
      // If unchecked, remove the task id from the checkedTasks array
      setCheckedTasks(checkedTasks.filter((id) => id !== taskId))
    }
  }

  return (
    <div className="container">
      <div className="list-container">
        {todo.map((el: any) => {
          return (
            <li key={el.id}>
              <fieldset>
                <legend></legend>
                <label>
                  <input
                    name="checkbox"
                    type="checkbox"
                    checked={checkedTasks.includes(el.id)}
                    onChange={(event) => handleCheckboxChange(event, el.id)}
                  />
                  <span
                    className={checkedTasks.includes(el.id) ? 'completed' : ''}
                  >
                    {el.task}
                  </span>
                </label>
                <EditTasks id={el.id} />
                <button onClick={(event) => handleDelete(event, el.id)}>
                  Delete Task
                </button>
              </fieldset>
            </li>
          )
        })}
      </div>
    </div>
  )
}
