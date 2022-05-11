import { IFeedbacksRepository } from "../repositories/feedbacks-repository"

type SubmitFeedbackUseCaseRequest = {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: IFeedbacksRepository
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })
  }
}