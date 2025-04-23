export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="mx-auto max-w-4xl px-2 md:px-0">{children} </div>
    </>
  );
}
