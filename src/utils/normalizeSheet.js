import { v4 as uuid } from "uuid"

export function normalizeSheet(apiData) {
  const map = {}

  apiData.questions.forEach((q) => {
    if (!map[q.topic]) {
      map[q.topic] = {
        id: uuid(),
        name: q.topic,
        subTopics: {},
      }
    }

    if (!map[q.topic].subTopics[q.subTopic]) {
      map[q.topic].subTopics[q.subTopic] = {
        id: uuid(),
        name: q.subTopic,
        questions: [],
      }
    }

    map[q.topic].subTopics[q.subTopic].questions.push({
      id: uuid(),
      title: q.title,
      difficulty: q.questionId.difficulty,
      platform: q.questionId.platform,
      link: q.questionId.problemUrl,
      solved: q.isSolved,
    })
  })

  return Object.values(map).map((t) => ({
    ...t,
    subTopics: Object.values(t.subTopics),
  }))
}
