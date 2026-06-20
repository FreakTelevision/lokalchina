import Navbar from "@/components/Navbar";

export default async function DefaultLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <Navbar locale={locale} />
      {children}
    </>
  );
}
