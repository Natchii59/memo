import { readFile } from 'fs/promises'
import path from 'path'
import { env } from '@/env'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import handlebars from 'handlebars'
import { AuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import { createTransport } from 'nodemailer'

import { db } from './db'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/sign-in',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30 // 30 days
  },
  providers: [
    GoogleProvider<GoogleProfile>({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
    EmailProvider({
      maxAge: 60 * 60, // 1 hour
      sendVerificationRequest: async ({ identifier, url }) => {
        const urlFormat = new URL(url)

        const transport = createTransport({
          host: env.EMAIL_SERVER_HOST,
          port: parseInt(env.EMAIL_SERVER_PORT),
          auth: {
            user: env.EMAIL_SERVER_USER,
            pass: env.EMAIL_SERVER_PASSWORD
          }
        })

        const emailsFolder = path.resolve(process.cwd(), 'emails')

        const signInHtml = await readFile(
          path.join(emailsFolder, 'signin', 'signin-magic-link.html'),
          {
            encoding: 'utf-8'
          }
        )
        const signInHtmlTemplate = handlebars.compile(signInHtml)

        const signInText = await readFile(
          path.join(emailsFolder, 'signin', 'signin-magic-link.txt'),
          {
            encoding: 'utf-8'
          }
        )
        const signInTextTemplate = handlebars.compile(signInText)

        const result = await transport.sendMail({
          to: identifier,
          from: {
            name: env.EMAIL_FROM_NAME,
            address: env.EMAIL_FROM_ADDRESS
          },
          subject: `Sign in to ${urlFormat.host}`,
          html: signInHtmlTemplate({
            signin_url: url
          }),
          text: signInTextTemplate({
            signin_url: url
          })
        })

        const failed = result.rejected.concat(result.pending).filter(Boolean)
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return token
      } else {
        const dbUser = await db.user.findUnique({
          where: { id: token.sub }
        })

        if (dbUser) {
          token.email = dbUser.email
          token.name = dbUser.name
          token.image = dbUser.image
        }
      }

      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.sub
        session.user.email = token.email
        session.user.name = token.name
        session.user.image = token.image
      }

      return session
    }
  }
}
