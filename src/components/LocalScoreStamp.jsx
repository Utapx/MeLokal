import React from 'react'
import { useLanguage } from '../context/LanguageContext'

/**
 * Signature visual element: "passport stamp" style Local Score badge.
 * Dipakai berulang di DestinationCard & PlaceCard sebagai identitas visual.
 */
export default function LocalScoreStamp({ score, size = 'md' }) {
  const { t } = useLanguage()
  const sizes = {
    sm: 'w-12 h-12 text-[10px]',
    md: 'w-16 h-16 text-xs',
    lg: 'w-20 h-20 text-sm',
  }
  return (
    <div
      className={`stamp ${sizes[size]} flex flex-col items-center justify-center bg-paper/95 text-sawah-dark font-display font-semibold shadow-stamp select-none`}
      title={`${t('local_score')} (data simulasi/demo)`}
    >
      <span className="leading-none text-base md:text-lg">{score.toFixed(1)}</span>
      <span className="uppercase tracking-wide text-[8px] md:text-[9px] mt-0.5">{t('local_score')}</span>
    </div>
  )
}
