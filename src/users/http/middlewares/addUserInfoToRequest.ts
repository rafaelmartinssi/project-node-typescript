import { NextFunction, Request, Response } from 'express'
import { JwtPayload, decode } from 'jsonwebtoken'

export const addUserInfoToRequest = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    })
  }

  const token = authHeader.replace('Bearer ', '')

  if (!token) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    })
  }

  try {
    const decodedToken = decode(token)
    const { sub } = decodedToken as JwtPayload
    request.user = { id: sub }
    return next()
  } catch {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    })
  }
}
