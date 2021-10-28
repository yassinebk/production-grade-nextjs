import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connectToDB } from '../../../db'
import { createDoc } from '../../../db/doc'
import { createFolder } from '../../../db/folder'

export default (req, res) => {
  NextAuth(req, res, {
    session: {
      jwt: true,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
    database: process.env.DATABASE_URL,
    pages: {
      siginIn: '/signin',
    },
    callbacks: {
      async session(session, user) {
        if (user) session.user.id = user.id
        return session
      },
      async jwt(tokenPayload, user, account, profile, isNewUser) {
        const { db } = await connectToDB()
        if (isNewUser) {
          const newFolder = await createFolder(db, {
            createdBy: user._id,
            name: 'Getting Started',
          })
          await createDoc(db, {
            name: 'Start Here',
            folder: newFolder._id,
            createdBy: `${user.id}`,
            content: {
              time: 1556098174501,
              blocks: [
                {
                  type: 'header',
                  data: {
                    text: 'Some default content',
                    level: 2,
                  },
                },
              ],
              version: '2.12.4',
            },
          })
        }
      },
    },
  })
}
