import { create } from "zustand"
import data from "../data/sheet.json"
import { normalizeSheet } from "../utils/normalizeSheet"

export const useSheetStore = create((set) => ({
  topics: normalizeSheet(data.data),

  editItem: (path, value) =>
    set((state) => {
      let ref = state.topics
      for (let i = 0; i < path.length - 1; i++) {
        ref = ref[path[i]]
      }
      ref[path.at(-1)] = value
      return { topics: [...state.topics] }
    }),

  deleteItem: (path) =>
    set((state) => {
      let ref = state.topics
      for (let i = 0; i < path.length - 1; i++) {
        ref = ref[path[i]]
      }
      ref.splice(path.at(-1), 1)
      return { topics: [...state.topics] }
    }),

  moveItem: (source, destination) =>
    set((state) => {
      let from = state.topics
      source.path.slice(0, -1).forEach((i) => (from = from[i]))
      const [item] = from.splice(source.path.at(-1), 1)

      let to = state.topics
      destination.path.slice(0, -1).forEach((i) => (to = to[i]))
      to.splice(destination.path.at(-1), 0, item)

      return { topics: [...state.topics] }
    }),
}))
