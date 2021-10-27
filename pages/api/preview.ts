import { RSA_NO_PADDING } from 'constants'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req, res: NextApiResponse) => {
  res.setPreviewData({})

  res.redirect(req.query.route)
}

