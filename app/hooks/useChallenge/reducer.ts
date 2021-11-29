/* eslint-disable no-case-declarations */
import TextToSpeech from "../../utils/services/textToSpeech"
import SpeechToText from "../../utils/services/speechToText"
import { stringsDifference, hightScoreWord } from "../../utils/compareStrings"
import { IChallengeState, ChallengeAction } from "."

export const reducer = (challenge: IChallengeState, action: ChallengeAction): IChallengeState => {
  const { challenges, index } = challenge
  console.log("action_action", action)
  switch (action.type) {
    case "setStatus":
      return { ...challenge, status: action.status }
    case "speechText":
      const challengeIndex = action.nextChallenge && index < challenges.length ? index + 1 : index
      TextToSpeech.tts.stop().then(() => TextToSpeech.tts.speak(challenges[challengeIndex]))
      return { ...challenge, status: "speaking", index: challengeIndex }
    case "voiceRecognizing":
      console.log("startRecognizing")
      SpeechToText.startRecognizing()
      return { ...challenge, status: "listening" }
    case "stopRecognizing":
      console.log("stopRecognizing")
      SpeechToText.stopRecognizing()
      return { ...challenge, status: "waiting" }
    case "speechResult":
      console.log("speechResultNE")
      const { word, score } = hightScoreWord(action.result, challenges[index])
      SpeechToText.stopRecognizing()
      return {
        ...challenge,
        status: "result",
        result: {
          text: word,
          score,
          difference: stringsDifference(word, challenges[index]),
        },
      }
    default:
      return challenge
  }
}
