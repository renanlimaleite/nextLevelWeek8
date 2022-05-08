import { useState } from 'react'

import BugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { FeedbackContentStep } from './Steps/FeedbackContentStep'
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep'
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: BugImageUrl,
      alt: 'Imagem de um insento'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Imagem de um bolão de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm () {
  const [feedbackType, setFeedbacktype] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestartFeedback () {
    setFeedbackSent(false)
    setFeedbacktype(null)
  }

  return (
    <div
      className="bg-zinc-900 p-4 relative
      rounded-2xl mb-4 flex flex-col items-center shadow-lg
      w-[calc(100vw-2rem)] md:w-auto">
      { feedbackSent
        ? (
          <FeedbackSuccessStep
            onFeedbackRestartRequested={handleRestartFeedback}
          />
          )
        : (
          <>
            {!feedbackType
              ? (
                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbacktype} />
                )
              : (
                <FeedbackContentStep
                  feedbacktype={feedbackType}
                  onFeedbackRestartRequested={handleRestartFeedback}
                  onFeedbackSent={() => setFeedbackSent(true)}
                />
                )
            }
          </>
          )
      }
      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela
        <a
          className="underline underline-offset-2"
          target="_blank"
          href="https://rocketseat.com.br" rel="noreferrer"> Rocketseat</a>
      </footer>
    </div>
  )
}
