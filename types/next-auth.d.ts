import 'next-auth'

declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface User {
    id: string
    email: string | null
    name: string | null
    image: string | null
  }

  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      id: string
      email: string | null
      name: string | null
      image: string | null
    }
  }
}

declare module 'next-auth/jwt' {
  // eslint-disable-next-line no-unused-vars
  interface JWT {
    sub: string
    email: string | null
    name: string | null
    picture: string | null
    image: string | null
  }
}
