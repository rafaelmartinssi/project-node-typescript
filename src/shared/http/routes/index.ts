import { Router } from 'express'
import { rolesRouter } from '@roles/http/roles.routes'
import { usersRouter } from '@users/http/users.routes'

const routes = Router()

routes.use('/roles', rolesRouter)
routes.use('/users', usersRouter)

export { routes }
