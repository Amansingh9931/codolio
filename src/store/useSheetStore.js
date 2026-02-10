import { create } from "zustand"
import { v4 as uuid } from "uuid"
import data from "../data/sheet.json"
import { normalizeSheet } from "../utils/normalizeSheet"

export const useSheetStore = create((set) => ({
  topics: normalizeSheet(data.data),

  addItem: (path, type) =>
    set((state) => {
      let ref = state.topics
      path.forEach((p) => (ref = ref[p]))

      if (type === "Topic") {
        ref.push({ id: uuid(), name: "New Topic", subTopics: [] })
      }

      if (type === "SubTopic") {
        ref.subTopics.push({
          id: uuid(),
          name: "New SubTopic",
          questions: [],
        })
      }

      if (type === "Question") {
        ref.questions.push({
          id: uuid(),
          title: "New Question",
          difficulty: "Easy",
          platform: "LeetCode",
          solved: false,
        })
      }

      return { topics: [...state.topics] }
    }),

  moveItem: (source, dest) =>
    set((state) => {
      let from = state.topics
      source.path.slice(0, -1).forEach((i) => (from = from[i]))
      const [item] = from.splice(source.path.at(-1), 1)

      let to = state.topics
      dest.path.slice(0, -1).forEach((i) => (to = to[i]))
      to.splice(dest.path.at(-1), 0, item)

      return { topics: [...state.topics] }
    }),
}))
