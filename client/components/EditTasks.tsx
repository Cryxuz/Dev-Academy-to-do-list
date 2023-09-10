import { useQuery, useMutation } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { editTasks, getTasks } from '../apis/apiClient'

const initialFormData = {
  id: 0,
  task: '',
}

export function EditTasks() {
  const [form, setForm] = useState(initialFormData)
  const { data: task, error, isLoading } = useQuery(['todo'], getTasks)

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    await editTasks()
    setForm(initialFormData)
  }
  return <></>
}
