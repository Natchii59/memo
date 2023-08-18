export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='container flex h-screen w-screen flex-col items-center justify-center'>
      {children}
    </div>
  )
}
