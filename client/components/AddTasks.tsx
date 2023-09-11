import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTasks } from '../apis/apiClient'
import { Tasks } from '../../models/todos'

const emptyTask: any = {
  task: '',
}

export default function AddTasks() {
  const [newTask, setNewTask] = useState(emptyTask)

  // handling change
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setNewTask({
      ...newTask,
      [name]: value,
    })
  }
  const queryClient = useQueryClient()

  const mutation = useMutation((task: Tasks) => addTasks(task), {
    onSuccess: () => {
      // Refetching the tasks after a successful mutation to update the data
      queryClient.invalidateQueries(['todo'])
    },
  })

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const taskToAdd = { ...newTask }

    // Trigger the mutation to add the task
    mutation.mutate(taskToAdd)

    // Reset the input field to empty after submit
    setNewTask(emptyTask)
  }

  return (
    <div className="input">
      <h1>To Do List:</h1>
      <form onSubmit={handleSubmit} method="post">
        <label htmlFor="task">Add New Task</label>
        <input
          placeholder="Enter Task"
          name="task"
          type="text"
          value={newTask.task}
          onChange={handleChange}
        />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Adding Task...' : 'Add Task'}
        </button>
      </form>
    </div>
  )
}
