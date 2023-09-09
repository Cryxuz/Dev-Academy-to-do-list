import request from 'superagent'

const rootUrl = '/api/v1'

export async function getTasks() {
  try {
    const dbTodo = await request.get(`${rootUrl}/todo`)
    return dbTodo.body
  } catch (err) {
    console.error('Error fetching todo')
  }
}
