import { Droppable, Draggable } from "@hello-pangea/dnd"
import { useSheetStore } from "../store/useSheetStore"
import { useState } from "react"

export default function TopicItem({ topic }) {
  const {
    addSubTopic,
    updateSubTopic,
    deleteSubTopic,
    addQuestion,
    updateQuestion,
    deleteQuestion,
  } = useSheetStore()

  const [newSub, setNewSub] = useState("")
  const [newQ, setNewQ] = useState({})
  const [editQ, setEditQ] = useState(null)
  const [inputs, setInputs] = useState({})

  const handleAddSub = () => {
    if (!newSub.trim()) return
    addSubTopic(topic.id, newSub)
    setNewSub("")
  }

  const handleAddQ = (subId) => {
    if (!newQ[subId]?.trim()) return
    addQuestion(topic.id, subId, newQ[subId])
    setNewQ({ ...newQ, [subId]: "" })
  }

  return (
    <div className="p-6">
      {/* SUBTOPICS */}
      <Droppable droppableId={`subtopics-${topic.id}`} type="SUBTOPIC">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-6">
            {topic.subTopics.map((sub, subIndex) => (
              <Draggable key={sub.id} draggableId={sub.id} index={subIndex}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={provided.draggableProps.style}
                    className="bg-[#1e293b]/60 rounded-xl p-4 shadow-md"
                  >
                    <div {...provided.dragHandleProps} className="flex justify-between items-center mb-3">
                      <span className="font-semibold">{sub.title}</span>
                      <button
                        onClick={() => deleteSubTopic(topic.id, sub.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    </div>

                    {/* QUESTIONS */}
                    <Droppable droppableId={`questions-${topic.id}-${sub.id}`} type="QUESTION">
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
                          {sub.questions.map((q, qIndex) => (
                            <Draggable key={q.id} draggableId={q.id} index={qIndex}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={provided.draggableProps.style}   // <-- fixes z-index
                                  className="
                                    rounded-xl px-4 py-3
                                    bg-black/30
                                    border border-white/10
                                    cursor-grab active:cursor-grabbing
                                    hover:border-emerald-500/40
                                    hover:shadow-lg hover:shadow-emerald-500/10
                                    hover:-translate-y-[1px]
                                    transition-all
                                  "
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-200">
                                      {editQ === q.id ? (
                                        <input
                                          value={inputs[q.id] || ""}
                                          onChange={(e) =>
                                            setInputs({ ...inputs, [q.id]: e.target.value })
                                          }
                                          onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                              updateQuestion(topic.id, sub.id, q.id, inputs[q.id])
                                              setEditQ(null)
                                            }
                                            if (e.key === "Escape") setEditQ(null)
                                          }}
                                          className="bg-[#020617] border border-[#1e293b] px-2 py-1 rounded-lg text-white"
                                        />
                                      ) : (
                                        q.text
                                      )}
                                    </span>
                                    <div className="flex gap-4 text-xs">
                                      {editQ === q.id ? (
                                        <button
                                          onClick={() => {
                                            updateQuestion(topic.id, sub.id, q.id, inputs[q.id])
                                            setEditQ(null)
                                          }}
                                          className="text-green-400 hover:text-green-300"
                                        >
                                          Save
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => {
                                            setEditQ(q.id)
                                            setInputs({ ...inputs, [q.id]: q.text })
                                          }}
                                          className="text-blue-400 hover:text-blue-300"
                                        >
                                          Edit
                                        </button>
                                      )}
                                      <button
                                        onClick={() => deleteQuestion(topic.id, sub.id, q.id)}
                                        className="text-red-400 hover:text-red-300"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>

                    {/* ADD QUESTION */}
                    <div className="flex gap-2 mt-3">
                      <input
                        value={newQ[sub.id] || ""}
                        onChange={(e) => setNewQ({ ...newQ, [sub.id]: e.target.value })}
                        onKeyDown={(e) => e.key === "Enter" && handleAddQ(sub.id)}
                        placeholder="Add a question..."
                        className="flex-1 px-3 py-1 rounded-lg bg-[#0f172a]/70 border border-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                      />
                      <button
                        onClick={() => handleAddQ(sub.id)}
                        disabled={!newQ[sub.id]?.trim()}
                        className="px-4 py-1 rounded-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* ADD SUBTOPIC */}
      <div className="flex gap-2 mt-6">
        <input
          value={newSub}
          onChange={(e) => setNewSub(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddSub()}
          placeholder="Add a subtopic..."
          className="flex-1 px-3 py-2 rounded-lg bg-[#0f172a]/70 border border-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
        />
        <button
          onClick={handleAddSub}
          disabled={!newSub.trim()}
          className="px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-black shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
        >
          + Add
        </button>
      </div>
    </div>
  )
}