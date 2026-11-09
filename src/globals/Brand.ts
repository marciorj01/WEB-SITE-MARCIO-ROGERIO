import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access'
import { revalidateBrand } from '@/hooks/revalidate'

export const Brand: GlobalConfig = {
  slug: 'brand',
  label: 'Identidade e contato',
  admin: { group: 'Institucional' },
  access: { read: () => true, update: adminOnly },
  hooks: { afterChange: [revalidateBrand] },
  fields: [
    { name: 'name', label: 'Marca', type: 'text', defaultValue: 'Vértice' },
    { name: 'tagline', label: 'Assinatura', type: 'text', defaultValue: 'Consultoria imobiliária' },
    { name: 'demoNotice', label: 'Aviso de demonstração', type: 'textarea' },
    {
      name: 'whatsapp',
      label: 'WhatsApp real (código do país + DDD + número)',
      type: 'text',
      admin: { description: 'Deixe vazio até informar um contato verdadeiro.' },
      validate: (value: string | null | undefined) =>
        !value || /^\d{10,15}$/.test(value) || 'Use somente números, incluindo país e DDD.',
    },
    { name: 'email', label: 'E-mail de contato real', type: 'email' },
    { name: 'professionalRegistration', label: 'Registro profissional real', type: 'text' },
    { name: 'serviceLocation', label: 'Área de atuação real', type: 'text' },
    {
      name: 'heroSlides',
      label: 'Fotografias de abertura',
      type: 'array',
      maxRows: 5,
      fields: [
        { name: 'image', label: 'Fotografia', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', label: 'Legenda', type: 'text' },
      ],
    },
    {
      name: 'consultingImage',
      label: 'Imagem da consultoria',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'investImage', label: 'Imagem de investimentos', type: 'upload', relationTo: 'media' },
    { name: 'sellImage', label: 'Imagem de venda', type: 'upload', relationTo: 'media' },
    {
      name: 'aboutImage',
      label: 'Retrato profissional / imagem institucional',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'profileName', label: 'Nome profissional', type: 'text' },
    { name: 'profileRole', label: 'Posicionamento', type: 'text' },
    { name: 'biography', label: 'Trajetória profissional', type: 'textarea' },
    { name: 'philosophy', label: 'Filosofia de trabalho', type: 'textarea' },
  ],
}
