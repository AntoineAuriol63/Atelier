/** Racine des sites publiés : un document nu, tout le reste (styles, polices, balises) vient de la page rendue. */
export default function PublishedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
