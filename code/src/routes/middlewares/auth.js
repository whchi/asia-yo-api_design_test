import { formatResponse, verifyToken } from '../../helpers'

export default async (ctx, next) => {
  try {
    const authHeader = ctx.header.authorization
    if (authHeader.indexOf('Bearer ') !== 0) {
      throw 'Bearer token required.'
    }
    verifyToken(authHeader.substring(7))
    await next()
  } catch (error) {
    ctx.body = formatResponse(false, error, '0400')
    ctx.status = 400
  }
}
