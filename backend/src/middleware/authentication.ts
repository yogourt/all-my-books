import UnauthenticatedError from '../errors/unauthenticated'
import { NextFunction, Response, Request } from 'express'
import { userPoolId, clientId } from '../utils/consts'
import { CognitoJwtVerifier } from 'aws-jwt-verify'

const verifier = CognitoJwtVerifier.create({
  userPoolId,
  tokenUse: 'id',
  clientId,
})

const authenticate = async (
  req: Request & { user: any },
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization

  try {
    const payload = await verifier.verify(token)
    req.user = { email: payload.email, name: payload['cognito:username'] }
  } catch (error) {
    console.log(error)
    throw new UnauthenticatedError('Invalid token.')
  }
  next()
}

export default authenticate
