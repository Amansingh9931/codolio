import { create } from "zustand"
import { v4 as uuid } from "uuid"

export const useSheetStore = create((set) => ({
  topics: [
    {
      id: uuid(),
      title: "Networking Basics",
      subTopics: [
        {
          id: uuid(),
          title: "OSI Model",
          questions: [
            { id: uuid(), text: "What is the OSI model?" },
            { id: uuid(), text: "How many layers are in OSI?" },
            { id: uuid(), text: "Which layer handles encryption?" },
          ],
        },
        {
          id: uuid(),
          title: "TCP/IP",
          questions: [
            { id: uuid(), text: "Difference between TCP and UDP?" },
            { id: uuid(), text: "What is a socket?" },
          ],
        },
      ],
    },
    {
      id: uuid(),
      title: "Web Development",
      subTopics: [
        {
          id: uuid(),
          title: "HTML",
          questions: [
            { id: uuid(), text: "What is semantic HTML?" },
            { id: uuid(), text: "Difference between div and span?" },
          ],
        },
        {
          id: uuid(),
          title: "CSS",
          questions: [
            { id: uuid(), text: "What is Flexbox?" },
            { id: uuid(), text: "Grid vs Flexbox?" },
          ],
        },
        {
          id: uuid(),
          title: "JavaScript",
          questions: [
            { id: uuid(), text: "What is closure?" },
            { id: uuid(), text: "Difference between var, let, const?" },
          ],
        },
      ],
    },
  ],

  /* TOPIC */

  addTopic: (title) =>
    set((state) => ({
      topics: [...state.topics, { id: uuid(), title, subTopics: [] }],
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
              subTopics: t.subTopics.filter((s) => s.id !== subTopicId),
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
                      questions: [...s.questions, { id: uuid(), text }],
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
                        q.id === questionId ? { ...q, text } : q
                      ),
                    }
                  : s
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
}))
