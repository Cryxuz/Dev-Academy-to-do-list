import connection from './connection.ts'
import { Tasks } from '../../models/todos.ts'

const db = connection
export async function getTasks(): Promise<Tasks[]> {
  // return db('table_name')
  return db('todo').select()
}

export async function addTasks(task: Tasks): Promise<Tasks[]> {
  return db('todo')
    .insert({ ...task })
    .returning(['id', 'task'])
    .then((addedTask) => {
      return addedTask[0]
    })
}
export async function editTasks(task: Tasks) {
  return db('todo')
    .returning(['id', 'task'])
    .update({ ...task })
    .where('id', task.id)
}
export async function delTask(id: number) {
  return db('todo').where({ id }).delete()
}
