import connection from './connection.ts'
import { Tasks } from '../../models/todos.ts'

export async function getTasks(db = connection): Promise<Tasks[]> {
  // return db('table_name')
  return db('todo').select()
}
