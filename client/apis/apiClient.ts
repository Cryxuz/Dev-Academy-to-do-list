import request from 'superagent'
import { Tasks } from '../../models/todos'

const rootUrl = '/api/v1'

export async function getTasks() {
  try {
    const dbTodo = await request.get(`${rootUrl}/todo`)
    return dbTodo.body
  } catch (err) {
    console.error('Error fetching todo')
  }
}

export async function addTasks(task: Tasks) {
  const addedTask = await request.post(`${rootUrl}/todo`).send(task)
  return addedTask.body
}

export async function editTasks(task: Tasks) {
  const editedTask = await request.patch(`${rootUrl}/todo`).send(task)
  console.log(editedTask.body)
  return editedTask.body
}

export async function delTask(id: number) {
  await request.delete(`${rootUrl}/todo/${id}`)
  console.log('api client delete function')
}
