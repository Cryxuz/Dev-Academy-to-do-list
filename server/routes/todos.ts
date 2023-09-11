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

router.patch('/:id', async (req, res) => {
  const task = req.body.tasks
  console.log(typeof task)
  const id = Number(req.params.id)
  await db.editTasks(id, task)
  res.sendStatus(200)
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  await db.delTask(id)
  res.sendStatus(200)
})

export default router
