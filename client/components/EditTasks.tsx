import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { editTasks, getTasks } from '../apis/apiClient'
import Modal from 'react-modal'
const initialFormData = {
  id: 0,
  task: '',
}
interface Props {
  id: number
}
export function EditTasks({ id }: Props) {
  const [form, setForm] = useState(initialFormData)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const queryClient = useQueryClient()
  const editMutation = useMutation(editTasks, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todo'])
    },
  })

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    // connected to line 62 {form.task}
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    editMutation.mutate({ id, tasks: form.task })
    setForm(initialFormData)
  }

  // closing and opening the form when edit button is clicekd.
  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <>
      <button className="edit-btn" onClick={openModal}>
        Edit Task
      </button>

      <Modal
        className="modal-content"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      >
        <form onSubmit={handleSubmit}>
          <label htmlFor="task">Edit Task</label>
          <input
            id="task"
            type="text"
            name="task"
            value={form.task}
            onChange={handleChange}
            placeholder="Edit Task"
          />
          <button type="submit">Save</button>
          <button className="close-modal" onClick={closeModal}>
            Close
          </button>
        </form>
      </Modal>
    </>
  )
}
