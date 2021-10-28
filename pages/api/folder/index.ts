import nc from 'next-connect'
import { folder } from '../../../db'
import middleware from '../../../middleware/all'
import onError from '../../../middleware/error'
import { Request } from '../../../types'

const handler = nc({
  onError,
})

handler.use(middleware)
handler.post(async (req: Request, res) => {
  const newFolder = await folder.createFolder(req.db, req.body)
  res.send({ data: newFolder })
})

export default handler
