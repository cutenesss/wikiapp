const letterPairs = (str: string): string[] => {
  return str.replace(/[^a-zA-Z1-9]/g, "").split("")
}

// const intersection = (pairs1: string[], pairs2: string[]) => {
//   const matchPairs: string[] = []
//   pairs1.reduce((pairsReference, pair) => {
//     const index = pairsReference.indexOf(pair)
//     index >= 0 && matchPairs.push(pairsReference.splice(index, 1).join(""))
//     return pairsReference
//   }, pairs2)
//   return matchPairs
// }
const intersection = (pairs1: string[], pairs2: string[]) => {
  const matchPairs: string[] = []
  pairs1.forEach((wordReference, index) => {
    if (index < pairs2.length) {
      if (wordReference === pairs2[index]) matchPairs.push(wordReference)
    }
  })
  return matchPairs
}

export const isMatchWithoutOrder = (str1: string, reference: string) => {
  let isContain = true
  reference
    .toUpperCase()
    .split(" ")
    .forEach((word) => {
      if (!str1.toLocaleUpperCase().includes(word)) isContain = false
    })
  return isContain
}

export const calResult = (str1: string, str2: string) => {
  // if (isMatchWithoutOrder(str1, str2)) return 1
  // console.log("===>>>Roottttt", str1, str2);
  let res = 0
  const pairs1 = letterPairs(str1.toUpperCase())
  const pairs2 = letterPairs(str2.toUpperCase())
  const union = pairs1.length + pairs2.length
  const wordSt1 = str1.toUpperCase().split(" ")
  const wordSt2 = str2.toUpperCase().split(" ")

  wordSt1.forEach((wordReference, index) => {
    if (index < wordSt2.length) {
      const matchString = intersection(wordReference.split(""), wordSt2[index].split(""))
      res = res + matchString.length
    }
  })
  return (2 * res) / union
}

export const compareString = (str1: string, str2: string) => {
  // if (isMatchWithoutOrder(str1, str2)) return 1
  // console.log("===>>>Roottttt", str1, str2)
  const pairs1 = letterPairs(str1.toUpperCase())
  const pairs2 = letterPairs(str2.toUpperCase())
  const union = pairs1.length + pairs2.length
  const matchString = intersection(pairs1, pairs2)
  // console.log("===>>>intersection", matchString)
  return (2 * matchString.length) / union
}

export const compareSentence = (noiseSentence: string, reference: string) => {
  // console.log('compareSentence', noiseSentence, reference)
  let trimedSentence = ""
  const arrayNoise = noiseSentence.trim().split(" ")
  const arrayRefercence = reference.trim().split(" ")
  arrayRefercence.map((wordReference) => {
    const similarWordObj = arrayNoise.reduce(
      (highScore, word) => {
        const score = compareString(word, wordReference)
        return score >= highScore.score ? { word, score } : highScore
      },
      { word: "", score: 0 },
    )
    trimedSentence = trimedSentence + similarWordObj.word + " "
    return null
  })
  return { trimedSentence: trimedSentence.trim(), score: calResult(trimedSentence, reference) }
}

export const stringsDifference = (strToCheck: string, reference: string) => {
  const matchStrs: { str: string; matches: boolean }[] = []
  strToCheck
    .toUpperCase()
    .split("")
    .reduce((strsReference, str) => {
      const index = strsReference.indexOf(str)
      matchStrs.push({
        str: index >= 0 ? strsReference.splice(index, 1).join("") : str,
        matches: index >= 0,
      })
      return strsReference
    }, reference.toUpperCase().split(""))
  return matchStrs
}

export const hightScoreWord = (str: string[], reference: string) => {
  // console.log('hightScoreWord', str, reference)
  return str.reduce(
    (highScore, word) => {
      const resultCompare = compareSentence(word, reference)
      return resultCompare.score >= highScore.score
        ? { word: resultCompare.trimedSentence, score: resultCompare.score }
        : highScore
    },
    { word: "", score: 0 },
  )
}
