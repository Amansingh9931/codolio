import { create } from "zustand"
import { v4 as uuid } from "uuid"

export const useSheetStore = create((set) => ({
  topics: [],

  /* TOPIC */

  addTopic: (title) =>
    set((state) => ({
      topics: [
        ...state.topics,
        { id: uuid(), title, subTopics: [] },
      ],
    })),

  updateTopic: (topicId, title) =>
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topicId ? { ...t, title } : t
      ),
    })),

  deleteTopic: (topicId) =>
    set((state) => ({
      topics: state.topics.filter((t) => t.id !== topicId),
    })),

  reorderTopics: (topics) => set({ topics }),

  /* SUB-TOPIC */

  addSubTopic: (topicId, title) =>
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topicId
          ? {
              ...t,
              subTopics: [
                ...t.subTopics,
                { id: uuid(), title, questions: [] },
              ],
            }
          : t
      ),
    })),

  updateSubTopic: (topicId, subTopicId, title) =>
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topicId
          ? {
              ...t,
              subTopics: t.subTopics.map((s) =>
                s.id === subTopicId ? { ...s, title } : s
              ),
            }
          : t
      ),
    })),

  deleteSubTopic: (topicId, subTopicId) =>
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topicId
          ? {
              ...t,
              subTopics: t.subTopics.filter(
                (s) => s.id !== subTopicId
              ),
            }
          : t
      ),
    })),

  /* QUESTION */

  addQuestion: (topicId, subTopicId, text) =>
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topicId
          ? {
              ...t,
              subTopics: t.subTopics.map((s) =>
                s.id === subTopicId
                  ? {
                      ...s,
                      questions: [
                        ...s.questions,
                        { id: uuid(), text },
                      ],
                    }
                  : s
              ),
            }
          : t
      ),
    })),

  updateQuestion: (topicId, subTopicId, questionId, text) =>
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topicId
          ? {
              ...t,
              subTopics: t.subTopics.map((s) =>
                s.id === subTopicId
                  ? {
                      ...s,
                      questions: s.questions.map((q) =>
                        q.id === questionId
                          ? { ...q, text }
                          : q
                      ),
                    }
                  : s
              ),
            }
          : t
      ),
    })),
    
  reorderSubTopics: (topicId, subTopics) =>
  set((s) => ({
    topics: s.topics.map((t) =>
      t.id === topicId ? { ...t, subTopics } : t
    ),
  })),

reorderQuestions: (topicId, subId, questions) =>
  set((s) => ({
    topics: s.topics.map((t) =>
      t.id === topicId
        ? {
            ...t,
            subTopics: t.subTopics.map((s2) =>
              s2.id === subId ? { ...s2, questions } : s2
            ),
          }
        : t
    ),
  })),

  deleteQuestion: (topicId, subTopicId, questionId) =>
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topicId
          ? {
              ...t,
              subTopics: t.subTopics.map((s) =>
                s.id === subTopicId
                  ? {
                      ...s,
                      questions: s.questions.filter(
                        (q) => q.id !== questionId
                      ),
                    }
                  : s
              ),
            }
          : t
      ),
    })),
}))
