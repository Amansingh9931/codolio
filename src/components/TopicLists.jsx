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
    const { source, destination, draggableId } = result
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
    <div>
      {/* ADD TOPIC CARD */}
      <div className="
        bg-[#020617] border border-[#1e293b]
        rounded-xl p-4 mb-10
        hover:border-orange-500/50
        transition-all
      ">
        <div className="flex gap-3">
          <input
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTopic()}
            placeholder="Add new topic"
            className="
              flex-1 px-4 py-2 rounded-md
              bg-[#020617] border border-[#1e293b]
              text-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-orange-500
            "
          />
          <button
            onClick={handleAddTopic}
            disabled={!newTopic.trim()}
            className="
              px-5 rounded-md font-medium
              bg-orange-500 text-black
              disabled:opacity-40 disabled:cursor-not-allowed
              hover:bg-orange-600
              transition-all
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
                  <div
                    ref={p.innerRef}
                    {...p.draggableProps}
                    className="mb-8"
                  >
                  {/* ENTIRE CARD IS DRAG HANDLE */}
                  <div
                  {...p.dragHandleProps}
                  className="
                    bg-[#0f172a] border border-[#1e293b]
                    rounded-xl
                    cursor-grab active:cursor-grabbing
                    hover:border-blue-500/50
                    hover:shadow-lg hover:shadow-blue-500/10
                    transition-all
                  "
                >
                {/* HEADER */}
                <div className="flex justify-between items-center px-5 py-4 border-b border-[#1e293b]">
                  <div className="flex items-center gap-3">
                    {/* optional icon, purely visual */}
                      <span className="text-gray-400">☰</span>

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
                          className="bg-[#020617] border border-[#1e293b] px-2 py-1 rounded"
                        />
                      ) : (
                        <span className="text-lg font-semibold">
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
                className="text-green-400 hover:text-green-300"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditId(topic.id)
                    setEditValue(topic.title)
                  }}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteTopic(topic.id)}
                className="text-red-400 hover:text-red-300"
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
