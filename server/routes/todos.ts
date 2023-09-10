import { Router } from 'express'

import * as db from '../db/db.ts'
import { addTasks } from '../db/db.ts'

const router = Router()

router.get('/', async (req, res) => {
  db.getTasks()
    // the todo is from the db.ts
    .then((todo) => {
      res.json(todo)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.post('/', async (req, res) => {
  const task = req.body
  const addedTask = await addTasks(task)
  res.json(addedTask)
})

router.patch('/', async (req, res) => {
  const task = req.body
  const updateTask = await db.editTasks(task)
  res.json(updateTask)
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  await db.delTask(id)
})

export default router
