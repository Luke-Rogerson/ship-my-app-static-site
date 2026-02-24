export const BRAND_NAME = 'Ship My App'

export const CONTACT_LINKS = {
  linkedin: 'https://www.linkedin.com/in/YOUR_HANDLE/',
  whatsapp: 'https://wa.me/YOURNUMBER',
  telegram: 'https://t.me/YOURHANDLE',
} as const

export const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
} as const

export const NAV_ITEMS = [
  { label: 'Offer', href: '#offer' },
  { label: 'Blueprint', href: '#blueprint' },
  { label: 'Packages', href: '#packages' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
] as const
