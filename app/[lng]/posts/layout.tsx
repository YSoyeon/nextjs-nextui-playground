'use client';

export default function Layout({
  children,
  sections,
}: {
  children: React.ReactNode;
  sections: React.ReactNode;
}) {
  return (
    <section>
      {children}
      {sections}
    </section>
  );
}
