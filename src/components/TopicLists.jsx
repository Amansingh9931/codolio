import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useState, useRef, useEffect } from "react"
import { useSheetStore } from "../store/useSheetStore"
import TopicItem from "./TopicItem"

export default function TopicList() {
  const { topics, addTopic, updateTopic, deleteTopic, reorderTopics } =
    useSheetStore()

  const [newTopic, setNewTopic] = useState("")
  const [editId, setEditId] = useState(null)
  const [editValue, setEditValue] = useState("")
  const editRef = useRef(null)

  useEffect(() => {
    editRef.current?.focus()
  }, [editId])

  const handleAddTopic = () => {
    if (!newTopic.trim()) return
    addTopic(newTopic)
    setNewTopic("")
  }

  const onDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) return

    // TOPICS
    if (source.droppableId === "topics") {
      const items = Array.from(topics)
      const [moved] = items.splice(source.index, 1)
      items.splice(destination.index, 0, moved)
      reorderTopics(items)
      return
    }

    // SUB-TOPICS
    if (source.droppableId.startsWith("subtopics-")) {
      const topicId = source.droppableId.replace("subtopics-", "")
      const topic = topics.find((t) => t.id === topicId)
      if (!topic) return

      const items = Array.from(topic.subTopics)
      const [moved] = items.splice(source.index, 1)
      items.splice(destination.index, 0, moved)
      useSheetStore.getState().reorderSubTopics(topicId, items)
      return
    }

    // QUESTIONS
    if (source.droppableId.startsWith("questions-")) {
      const [, topicId, subId] = source.droppableId.split("-")
      const topic = topics.find((t) => t.id === topicId)
      const sub = topic?.subTopics.find((s) => s.id === subId)
      if (!sub) return

      const items = Array.from(sub.questions)
      const [moved] = items.splice(source.index, 1)
      items.splice(destination.index, 0, moved)
      useSheetStore.getState().reorderQuestions(topicId, subId, items)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white font-sans p-8">
      {/* ADD TOPIC CARD */}
      <div
        className="
          bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/80
          border border-transparent
          rounded-2xl p-6 mb-10
          shadow-lg shadow-black/40
          backdrop-blur-md
          hover:border-orange-400/60 hover:shadow-orange-500/20
          transition-all duration-300
        "
      >
        <div className="flex gap-3">
          <input
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTopic()}
            placeholder="Add a topic..."
            className="
              flex-1 px-4 py-2 rounded-lg
              bg-[#0f172a]/70 border border-[#334155]
              text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
              transition-all duration-300
            "
          />
          <button
            onClick={handleAddTopic}
            disabled={!newTopic.trim()}
            className="
              px-6 py-2 rounded-lg font-semibold
              bg-gradient-to-r from-orange-500 to-pink-500
              text-black shadow-md
              disabled:opacity-40 disabled:cursor-not-allowed
              hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30
              transition-all duration-300
            "
          >
            + Add
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="topics">
          {(p) => (
            <div ref={p.innerRef} {...p.droppableProps}>
              {topics.map((topic, i) => (
                <Draggable key={topic.id} draggableId={topic.id} index={i}>
                  {(p) => (
                    <div ref={p.innerRef} {...p.draggableProps} className="mb-8">
                      {/* ENTIRE CARD IS DRAG HANDLE */}
                      <div
                        {...p.dragHandleProps}
                        className="
                          bg-gradient-to-br from-[#1e293b] to-[#0f172a]
                          border border-transparent
                          rounded-2xl
                          cursor-grab active:cursor-grabbing
                          hover:border-blue-400/60 hover:shadow-blue-500/20
                          shadow-md shadow-black/30
                          transition-all duration-300
                        "
                      >
                        {/* HEADER */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-[#334155]">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-500">☰</span>
                            {editId === topic.id ? (
                              <input
                                ref={editRef}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    updateTopic(topic.id, editValue)
                                    setEditId(null)
                                  }
                                  if (e.key === "Escape") setEditId(null)
                                }}
                                className="bg-[#020617] border border-[#1e293b] px-2 py-1 rounded-lg text-white"
                              />
                            ) : (
                              <span className="text-lg font-semibold tracking-wide">
                                {topic.title}
                              </span>
                            )}
                          </div>

                          <div className="flex gap-4 text-sm">
                            {editId === topic.id ? (
                              <button
                                onClick={() => {
                                  updateTopic(topic.id, editValue)
                                  setEditId(null)
                                }}
                                className="text-green-400 hover:text-green-300 transition"
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditId(topic.id)
                                  setEditValue(topic.title)
                                }}
                                className="text-blue-400 hover:text-blue-300 transition"
                              >
                                Edit
                              </button>
                            )}
                            <button
                              onClick={() => deleteTopic(topic.id)}
                              className="text-red-400 hover:text-red-300 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        <TopicItem topic={topic} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {p.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}