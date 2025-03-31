export function NavigationHeader({ children }: { children: React.ReactNode }) {
  return <div className="absolute top-0 left-0">
    { children }
  </div>
}