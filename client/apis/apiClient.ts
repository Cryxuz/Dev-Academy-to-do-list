import request from 'superagent'
import { Tasks, Task } from '../../models/todos'

const rootUrl = '/api/v1'

export async function getTasks() {
  const dbTodo = await request.get(`${rootUrl}/todo`)
  return dbTodo.body as Task[]
}

export async function addTasks(task: Tasks) {
  const addedTask = await request.post(`${rootUrl}/todo`).send(task)
  return addedTask.body
}

export async function editTasks({ id, tasks }: Tasks) {
  await request.patch(`${rootUrl}/todo/${id}`).send({ tasks })
}

export async function delTask(id: number) {
  await request.delete(`${rootUrl}/todo/${id}`)
}
