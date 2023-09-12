import React, { useState, ChangeEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { delTask, getTasks } from '../apis/apiClient'
import { Tasks } from '../../models/todos'
import { EditTasks } from './EditTasks'

export function Todo() {
  const [checkedTasks, setCheckedTasks] = useState([] as number[])

  const { data: todo, isLoading, error } = useQuery(['todo'], getTasks)

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
  function handleCheckboxChange(
    event: ChangeEvent<HTMLInputElement>,
    taskId: number,
  ) {
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
        {todo.map((el) => {
          return (
            <>
              <ul>
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
                        className={
                          checkedTasks.includes(el.id) ? 'completed' : ''
                        }
                      >
                        {el.task}
                      </span>
                    </label>
                    <EditTasks id={el.id} />
                    <button onClick={(event) => handleDelete(event, el.id)}>
                      <img src="/images/delete.png" alt="add-button-icon" />
                    </button>
                  </fieldset>
                </li>
              </ul>
            </>
          )
        })}
      </div>
    </div>
  )
}
