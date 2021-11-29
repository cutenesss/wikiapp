import { useReducer, useEffect } from "react"
import TextToSpeech from "../../utils/services/textToSpeech"
import SpeechToText from "../../utils/services/speechToText"
import { reducer } from "./reducer"

export type StatusType =
  | "countdown"
  | "speaking"
  | "waiting"
  | "listening"
  | "result"
  | "timeout"
  | "error"

export type ResultType = {
  text: string
  score: number
  difference: { str: string; matches: boolean }[]
}

export type ChallengeAction =
  | { type: "setStatus"; status: StatusType }
  | { type: "speechText"; nextChallenge?: boolean }
  | { type: "voiceRecognizing" }
  | { type: "stopRecognizing" }
  | { type: "speechResult"; result: string[] }
  | { type: "nextChallenge" }

export interface IChallengeState {
  status: StatusType
  result: ResultType
  challenges: string[]
  index: number
}

export const useChallenge = (
  challenges: string[],
): [IChallengeState, React.Dispatch<ChallengeAction>] => {
  const initialState: IChallengeState = {
    status: "countdown",
    result: {
      text: "",
      score: 0,
      difference: [],
    },
    challenges,
    index: 0,
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    TextToSpeech.initTextToSpeech({
      finishListener: () => dispatch({ type: "setStatus", status: "waiting" }),
    })
    return () => {
      TextToSpeech.finishTextToSpeech()
    }
  }, [])

  useEffect(() => {
    SpeechToText.initSpeechToText({
      resultListener: (result: string[]) => {
        console.log("result_result", result)
        dispatch({ type: "speechResult", result: result })
      },
      pitchListener: (speed: any) => {
        console.log("pitchListener", speed)
      },
      errorListener: (error: any) => {
        console.log("errorListener", error)
      },
    })
    return () => {
      SpeechToText.finishSpeechToText()
    }
  }, [])

  return [state, dispatch]
}
