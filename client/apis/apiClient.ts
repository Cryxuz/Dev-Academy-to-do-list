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

export async function editTasks({ id, tasks }: Tasks) {
  console.log(id)
  console.log(tasks)
  await request.patch(`${rootUrl}/todo/${id}`).send({ tasks })
  // console.log(editedTask)
  // return editedTask
}

export async function delTask(id: number) {
  await request.delete(`${rootUrl}/todo/${id}`)
  // console.log('api client delete function')
}
