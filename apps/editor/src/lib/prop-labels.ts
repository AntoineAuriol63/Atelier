/** Nom lisible d'une propriété de style, pour les pastilles d'état et le panneau des tailles d'écran. Le nom CSS reste en infobulle. */
const LABELS: Record<string, string> = {
  display: "Affichage", flexDirection: "Direction", justifyContent: "Répartition", alignItems: "Alignement", gap: "Écart", rowGap: "Écart vertical", columnGap: "Écart horizontal", flexWrap: "Retour à la ligne", flexGrow: "Espace libre", flexShrink: "Si ça manque", order: "Ordre", gridTemplateColumns: "Colonnes", gridTemplateRows: "Lignes", gridAutoFlow: "Sens de la grille",
  width: "Largeur", height: "Hauteur", minWidth: "Largeur min.", maxWidth: "Largeur max.", minHeight: "Hauteur min.", maxHeight: "Hauteur max.", aspectRatio: "Ratio",
  paddingTop: "Remplissage haut", paddingRight: "Remplissage droit", paddingBottom: "Remplissage bas", paddingLeft: "Remplissage gauche", marginTop: "Marge haute", marginRight: "Marge droite", marginBottom: "Marge basse", marginLeft: "Marge gauche",
  fontFamily: "Police", fontSize: "Taille du texte", fontWeight: "Graisse", lineHeight: "Interligne", letterSpacing: "Espacement des lettres", textAlign: "Alignement du texte", textTransform: "Casse", textDecoration: "Décoration", color: "Couleur du texte", fontStyle: "Style du texte",
  background: "Fond", backgroundColor: "Couleur de fond", borderRadius: "Arrondi", borderWidth: "Épaisseur de bordure", borderColor: "Couleur de bordure", borderStyle: "Trait de bordure", borderTopWidth: "Bordure haute", borderRightWidth: "Bordure droite", borderBottomWidth: "Bordure basse", borderLeftWidth: "Bordure gauche", boxShadow: "Ombre", opacity: "Opacité", overflow: "Débordement",
  position: "Position", top: "Haut", right: "Droite", bottom: "Bas", left: "Gauche", zIndex: "Calque", transform: "Transformation", transition: "Transition", filter: "Filtre", cursor: "Curseur", objectFit: "Ajustement",
};
export function propLabel(prop: string): string { return LABELS[prop] ?? prop; }
