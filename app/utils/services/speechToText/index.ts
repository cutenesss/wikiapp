import Voice from "@react-native-community/voice"

interface ISpeechToText {
  startListener?: () => void
  finishListener?: () => void
  errorListener?: (text: any) => void
  partialListener?: (text: string[]) => void
  pitchListener?: (value: any) => void
  resultListener: (text: string[]) => void
}

const initSpeechToText = async ({
  startListener = () => undefined,
  finishListener = () => undefined,
  errorListener = () => undefined,
  partialListener = () => undefined,
  pitchListener = () => undefined,
  resultListener,
}: ISpeechToText) => {
  // const services = await Voice.getSpeechRecognitionServices()
  // console.log(services)
  Voice.onSpeechStart = startListener
  Voice.onSpeechEnd = finishListener
  Voice.onSpeechError = errorListener
  Voice.onSpeechPartialResults = (e: any) => partialListener(e.value)
  Voice.onSpeechVolumeChanged = (e: any) => pitchListener(e.value)
  Voice.onSpeechResults = (e: any) => resultListener(e.value)
}

const finishSpeechToText = () => {
  Voice.destroy()
    .then(Voice.removeAllListeners)
    .catch((e) => console.log("finishSpeechToText", e))
}

const startRecognizing = async (language = "en-GB") => {
  try {
    await Voice.start("en-GB", {
      // RECOGNIZER_ENGINE: "services",
      EXTRA_PARTIAL_RESULTS: true,
      EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 10000,
      EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 10000,
    })
    await Voice.isRecognizing()
    await Voice.getSpeechRecognitionServices()
  } catch (error) {
    console.error("Error on voice start", error)
  }
}

const stopRecognizing = async () => {
  try {
    await Voice.stop()
    await Voice.cancel()
  } catch (error) {
    console.error("Error on voice stop", error)
  }
}

export default {
  initSpeechToText,
  finishSpeechToText,
  startRecognizing,
  stopRecognizing,
}
