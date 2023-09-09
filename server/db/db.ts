import connection from './connection.ts'
import { Tasks } from '../../models/todos.ts'

const db = connection
export async function getTasks(): Promise<Tasks[]> {
  // return db('table_name')
  return db('todo').select()
}

export async function addTasks(task: Tasks): Promise<Tasks> {
  console.log('this is a db')
  return db('todo')
    .insert({ ...task })
    .returning(['id', 'task'])
    .then((addedTask) => {
      return addedTask[0]
    })
}
