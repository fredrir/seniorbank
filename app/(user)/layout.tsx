import NavBar from "@/components/organisms/NavBar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-4xl px-2 md:px-0">{children} </div>
    </>
  );
}
