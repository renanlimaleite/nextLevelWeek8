import { ArrowLeft } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { FeedbackType, feedbackTypes } from '..'
import { api } from '../../../lib/api'
import { CloseButton } from '../../CloseButton'
import { Loading } from '../../Loading'
import { ScreenshotButton } from '../ScreenshotButton'

type FeedBackContentStepProps = {
  feedbacktype: FeedbackType
  onFeedbackRestartRequested: () => void
  onFeedbackSent: () => void
}

export function FeedbackContentStep ({
  feedbacktype,
  onFeedbackRestartRequested,
  onFeedbackSent
}: FeedBackContentStepProps
) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  const feedbackTypeInfo = feedbackTypes[feedbacktype]

  async function handleSubmitFeedback (event: FormEvent) {
    event.preventDefault()

    setIsSendingFeedback(true)

    await api.post('/feedbacks', {
      type: feedbacktype,
      comment,
      screenshot
    })

    setIsSendingFeedback(false)
    onFeedbackSent()
  }

  return (
    <>
      <header>
        <button
          type="button"
          onClick={onFeedbackRestartRequested}
          className="top-5 left-5 absolute text-zinc-400
          hover:text-zinc-100">
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          onChange={(event) => setComment(event.target.value)}
          placeholder="Conte com detalhes o que está acontecendo..."
          className="min-w-[304px] w-full min-h-[112px] text-sm
          placeholder-zinc-400 text-zinc-100 border-zinc-600
          bg-transparent rounded-md focus:border-brand-500
          focus:ring-brand-500 focus:ring-1 resize-none
          focus:outline-none scrollbar scrollbar-thumb-zinc-700
          scrollbar-thumb-700 scrollbar-track-transparent"
        />
        <footer className="flex mt-2 gap-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTok={setScreenshot}
          />
          <button
            type="submit"
            disabled={!comment.length || isSendingFeedback}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1
            flex justify-center items-center text-sm hover:bg-brand-300
            focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors
            disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}
