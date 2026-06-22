// ── Palette extracted from loggd.life (verified from its compiled CSS) ──────────
// Brand green is the signature color; backgrounds are dark navy; orange is the
// warm accent. Change these in one place to re-skin the whole app.
export const colors = {
  green: '#00C758', // primary brand color
  teal: '#00BB7F', // secondary / success-ish
  orange: '#F99C00', // warm accent
  greenDeep: '#004E3B', // deep green for the active-tab pill

  background: '#0B1222', // app background (dark navy)
  surface: '#1E2939', // cards / elevated surfaces
  surfaceLow: '#101828', // lower surface / tab bar
  surfaceHigh: '#252E4A', // hovered / selected surface

  onDark: '#FFFFFF', // primary text on dark
  muted: '#9AA4B2', // secondary / muted text
  outline: '#364153', // borders / dividers
} as const;
