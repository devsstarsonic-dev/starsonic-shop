// Ícones inline do protótipo, um lugar só. Cor via currentColor (herda text-*).
const S = ({ size = 16, children, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...p}>{children}</svg>
)
const F = ({ size = 16, children, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>{children}</svg>
)

export const Star = (p) => <F {...p}><path d="M12 2L14.5 8.5L21 9L16 13.5L17.5 20.5L12 17L6.5 20.5L8 13.5L3 9L9.5 8.5L12 2Z" /></F>
export const MusicNote = (p) => <F {...p}><path d="M9 19V6l12-3v13" /></F>
export const Play = (p) => <F {...p}><path d="M8 5v14l11-7z" /></F>
export const Zap = (p) => <F {...p}><path d="M13 10V3L4 14h7v7l9-11h-7z" /></F>
export const Search = (p) => <S {...p}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></S>
export const Orders = (p) => <S {...p}><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></S>
export const Heart = (p) => <S {...p}><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></S>
export const User = (p) => <S {...p}><path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></S>
export const Logout = (p) => <S {...p}><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></S>
export const ChevronDown = (p) => <S {...p}><path d="M6 9l6 6 6-6" /></S>
export const Dots = (p) => <S {...p}><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></S>
export const Download = (p) => <S {...p}><path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" /></S>
export const Check = (p) => <S {...p}><path d="M5 13l4 4L19 7" /></S>
export const Plus = (p) => <S {...p}><path d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></S>
export const Edit = (p) => <S {...p}><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></S>
export const Info = (p) => <S {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></S>
export const Share = (p) => <S {...p}><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684z" /></S>
export const Upload = (p) => <S {...p}><path d="M7 16a4 4 0 01-.88-7.9 5 5 0 019.9-1 5.5 5.5 0 015.7 6.8 5 5 0 01-1.7 3.1M12 12v9m0-9l-3 3m3-3l3 3" /></S>
export const Mic = (p) => <S {...p}><path d="M15 17h5l-1.4-1.4A2 2 0 0118 14v-3a6 6 0 00-4-5.6V5a2 2 0 10-4 0v.4C7.7 6.2 6 8.4 6 11v3.2c0 .5-.2 1-.6 1.4L4 17h5" /></S>

export const Google = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="#EA4335" d="M12 5c1.6 0 3.1.6 4.2 1.6l3.1-3.1C17.4 1.6 14.9.5 12 .5 7.4.5 3.4 3.1 1.4 7l3.6 2.8C6 7 8.7 5 12 5z" />
    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.5-.2-2.3H12v4.4h6.5c-.3 1.5-1.2 2.7-2.4 3.6l3.6 2.8c2.1-2 3.3-4.9 3.3-8.5z" />
    <path fill="#FBBC05" d="M5 14.2c-.2-.7-.4-1.4-.4-2.2 0-.8.1-1.5.4-2.2L1.4 7C.5 8.5 0 10.2 0 12s.5 3.5 1.4 5l3.6-2.8z" />
    <path fill="#34A853" d="M12 23.5c3 0 5.5-1 7.4-2.7l-3.6-2.8c-1 .7-2.3 1.1-3.8 1.1-3.3 0-6-2-6.9-5L1.4 17c1.9 3.9 5.9 6.5 10.6 6.5z" />
  </svg>
)
export const Apple = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
)
