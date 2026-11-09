'use client'

import { useState } from 'react'
import type { Brand } from '@/payload-types'
import { ButtonLink, Eyebrow, MediaImage, container } from './ui'
import { Icon } from './icons'

export function HomeHero({ slides }: { slides: Brand['heroSlides'] }) {
  const [active, setActive] = useState(0)
  const photos = slides ?? []
  return (
    <section
      className="relative isolate min-h-[670px] overflow-hidden bg-navy-deep text-white lg:h-[min(690px,calc(100svh-88px))] lg:min-h-[640px] lg:max-h-[820px]"
      aria-label="Vértice — novas perspectivas"
    >
      <div className="absolute inset-0 -z-20" data-parallax>
        {photos.length ? (
          photos.map((slide, i) => (
            <div
              key={slide.id || i}
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ${i === active ? 'opacity-100' : 'opacity-0'}`}
            >
              <MediaImage
                media={slide.image}
                priority={i === 0}
                sizes="100vw"
                className="object-[60%_center] lg:object-center"
              />
            </div>
          ))
        ) : (
          <div className="h-full bg-navy" />
        )}
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,28,42,.88)_0%,rgba(10,28,42,.68)_32%,rgba(10,28,42,.15)_72%,rgba(10,28,42,.06)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-navy/30 bg-gradient-to-t from-navy-deep/75 via-transparent to-navy-deep/10 lg:bg-transparent" />
      <div
        className={`${container} flex min-h-[670px] flex-col justify-center pt-16 pb-36 lg:h-full lg:min-h-0 lg:pt-5 lg:pb-20`}
      >
        <div className="hero-entrance max-w-[850px]">
          <Eyebrow light className="mb-8">
            Imóveis singulares. Escolhas conscientes.
          </Eyebrow>
          <h1 className="font-display text-[54px] leading-[1.02] font-normal tracking-[-.03em] sm:text-[70px] lg:text-[82px] xl:text-[90px]">
            Mais do que imóveis.
            <br />
            <em className="font-normal text-champagne-light">Novas perspectivas.</em>
          </h1>
          <p className="mt-7 max-w-[380px] text-[12px] leading-[1.9] font-light text-white/80 sm:text-[13px]">
            Curadoria, conhecimento e um olhar atento ao que importa.
            <br className="hidden sm:block" /> Conectamos o seu momento ao imóvel certo.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href="/comprar" variant="gold">
              Explore nossa curadoria
            </ButtonLink>
            <ButtonLink href="/sobre" variant="light" arrow={false}>
              Conheça a consultoria
            </ButtonLink>
          </div>
        </div>
      </div>
      <div
        className={`${container} absolute right-0 bottom-0 left-0 flex items-end justify-between gap-6 pb-9 sm:pb-10`}
      >
        <a
          href="#curadoria"
          className="group flex items-center gap-4 text-[9px] uppercase tracking-[.18em] text-white/75"
        >
          <span className="flex h-10 w-6 items-center justify-center rounded-full border border-white/40">
            <span className="h-2 w-px bg-champagne-light transition-transform group-hover:translate-y-1" />
          </span>
          Novos caminhos, logo abaixo
        </a>
        <div className="hidden items-center gap-5 md:flex">
          <span
            className="mr-6 text-right text-[9px] leading-5 tracking-[.07em] text-white/70"
            aria-live="polite"
          >
            {photos[active]?.caption || 'Arquitetura que transforma o viver.'}
            <br />
            <span className="text-[8px] uppercase tracking-[.17em] text-champagne-light">
              Fotografia de referência
            </span>
          </span>
          <span className="text-[10px]">0{active + 1}</span>
          <span className="h-px w-20 bg-white/25">
            <span
              className={`block h-px bg-champagne-light transition-all ${active === 0 ? 'w-1/3' : active === 1 ? 'w-2/3' : 'w-full'}`}
            />
          </span>
          <span className="text-[10px] text-white/50">0{photos.length || 1}</span>
        </div>
        {photos.length > 1 && (
          <div className="flex gap-2">
            <button
              aria-label="Fotografia anterior"
              className="flex size-10 items-center justify-center rounded-full border border-white/35 transition-colors hover:bg-white/15"
              onClick={() => setActive((active - 1 + photos.length) % photos.length)}
            >
              <Icon name="left" className="size-4" />
            </button>
            <button
              aria-label="Próxima fotografia"
              className="flex size-10 items-center justify-center rounded-full border border-white/35 transition-colors hover:bg-white/15"
              onClick={() => setActive((active + 1) % photos.length)}
            >
              <Icon name="arrow" className="size-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
