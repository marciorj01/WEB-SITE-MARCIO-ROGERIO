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
    { name: 'name', label: 'Marca', type: 'text', defaultValue: 'Marcio Rogério' },
    { name: 'tagline', label: 'Assinatura', type: 'text', defaultValue: 'Corretor de Imóveis' },
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
    {
      name: 'professionalRegistration',
      label: 'Registro profissional real',
      type: 'text',
      defaultValue: 'CRECI F-59.138-F',
    },
    { name: 'serviceLocation', label: 'Área de atuação real', type: 'text' },
    {
      name: 'heroVideo',
      label: 'Vídeo principal do Banner (opcional)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Faça upload de um arquivo de vídeo (MP4 ou WebM) para rodar como fundo dinâmico do banner.',
      },
    },
    {
      name: 'heroVideoUrl',
      label: 'Ou URL externa do vídeo (MP4)',
      type: 'text',
      admin: {
        description: 'Exemplo: link direto para um vídeo MP4 na nuvem ou pasta local.',
      },
    },
    {
      name: 'heroSlides',
      label: 'Slides de abertura (Fotos ou Vídeos de Empreendimentos)',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'mediaType',
          label: 'Tipo de mídia',
          type: 'select',
          defaultValue: 'image',
          options: [
            { label: 'Fotografia', value: 'image' },
            { label: 'Vídeo (MP4)', value: 'video' },
          ],
        },
        {
          name: 'image',
          label: 'Fotografia',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'video',
          label: 'Arquivo de Vídeo (MP4)',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'videoUrl',
          label: 'Ou link direto do vídeo (MP4)',
          type: 'text',
        },
        { name: 'caption', label: 'Legenda / Nome do Empreendimento', type: 'text' },
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
    { name: 'profileName', label: 'Nome profissional', type: 'text', defaultValue: 'Marcio Rogério' },
    { name: 'profileRole', label: 'Posicionamento', type: 'text', defaultValue: 'Corretor de Imóveis' },
    { name: 'biography', label: 'Trajetória profissional', type: 'textarea' },
    { name: 'philosophy', label: 'Filosofia de trabalho', type: 'textarea' },
  ],
}
