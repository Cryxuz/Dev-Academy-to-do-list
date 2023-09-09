import connection from './connection.ts'
import { Tasks } from '../../models/todos.ts'

const db = connection
export async function getTasks(): Promise<Tasks[]> {
  // return db('table_name')
  return db('todo').select()
}
