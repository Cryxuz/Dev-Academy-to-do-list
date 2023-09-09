import { Router } from 'express'

import * as db from '../db/db.ts'

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

export default router
