interface ContainerProps {
  children: React.ReactNode
}
export const Container = ({ children }: ContainerProps) => {
  return <div className="xl:mx-36 lg:mx-16 sx:mx-8 xs:mx-auto">{children}</div>
}
