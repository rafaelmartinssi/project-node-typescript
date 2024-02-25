import { AppError } from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { JwtPayload, Secret, verify } from 'jsonwebtoken'
import jwtConfig from '@config/auth'

export const isAutenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    throw new AppError('Failed to verify acess token', 401)
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const decodedToken = verify(token, jwtConfig.jwt.secret as Secret)
    const { sub } = decodedToken as JwtPayload
    request.user = { id: sub }
    return next()
  } catch {
    throw new AppError('Invalid authentication token', 401)
  }
}
