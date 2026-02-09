import { useState, useRef, useEffect } from "react"
import { Droppable, Draggable } from "@hello-pangea/dnd"
import { useSheetStore } from "../store/useSheetStore"

export default function TopicItem({ topic }) {
  const {
    addSubTopic,
    updateSubTopic,
    deleteSubTopic,
    addQuestion,
    updateQuestion,
    deleteQuestion,
  } = useSheetStore()

  const [subInput, setSubInput] = useState("")
  const [editSub, setEditSub] = useState(null)
  const [editQ, setEditQ] = useState(null)
  const [inputs, setInputs] = useState({})
  const editRef = useRef(null)

  useEffect(() => {
    editRef.current?.focus()
  }, [editSub, editQ])

  return (
    <div className="p-6 space-y-6">
      {/* ADD SUB-TOPIC */}
      <div
        className="
          rounded-2xl p-4
          bg-gradient-to-br from-[#020617] to-[#020617]/80
          border border-white/5
          backdrop-blur
          hover:border-blue-500/40
          hover:shadow-xl hover:shadow-blue-500/10
          transition-all
        "
      >
        <div className="flex gap-3">
          <input
            value={subInput}
            onChange={(e) => setSubInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && subInput.trim()) {
                addSubTopic(topic.id, subInput)
                setSubInput("")
              }
            }}
            placeholder="Add sub-topic"
            className="
              flex-1 px-4 py-2
              rounded-xl
              bg-black/30
              border border-white/10
              text-sm
              focus:outline-none
              focus:ring-2 focus:ring-blue-500/50
              placeholder:text-gray-400
            "
          />
          <button
            onClick={() => {
              if (!subInput.trim()) return
              addSubTopic(topic.id, subInput)
              setSubInput("")
            }}
            disabled={!subInput.trim()}
            className="
              px-5 rounded-xl
              bg-gradient-to-r from-blue-500 to-blue-600
              text-black text-sm font-medium
              hover:brightness-110
              disabled:opacity-40
              transition-all
            "
          >
            Add
          </button>
        </div>
      </div>

      {/* SUB-TOPICS */}
      <Droppable droppableId={`subtopics-${topic.id}`} type="SUBTOPIC">
        {(p) => (
          <div ref={p.innerRef} {...p.droppableProps} className="space-y-6">
            {topic.subTopics.map((sub, subIndex) => (
              <Draggable key={sub.id} draggableId={sub.id} index={subIndex}>
                {(p) => (
                  <div
                    ref={p.innerRef}
                    {...p.draggableProps}
                    {...p.dragHandleProps}
                    className="
                      rounded-2xl p-5
                      bg-gradient-to-br from-[#020617] to-[#020617]/70
                      border border-white/5
                      backdrop-blur
                      cursor-grab active:cursor-grabbing
                      hover:border-purple-500/40
                      hover:shadow-2xl hover:shadow-purple-500/10
                      hover:-translate-y-[2px]
                      transition-all
                    "
                  >
                    {/* SUB-TOPIC HEADER */}
                    <div className="flex justify-between items-center mb-4">
                      {editSub === sub.id ? (
                        <input
                          ref={editRef}
                          value={inputs[sub.id]}
                          onChange={(e) =>
                            setInputs({ ...inputs, [sub.id]: e.target.value })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              updateSubTopic(topic.id, sub.id, inputs[sub.id])
                              setEditSub(null)
                            }
                            if (e.key === "Escape") setEditSub(null)
                          }}
                          className="
                            px-3 py-1 rounded-lg
                            bg-black/30 border border-white/10
                            focus:ring-2 focus:ring-purple-500/50
                          "
                        />
                      ) : (
                        <h3 className="font-semibold tracking-wide">
                          {sub.title}
                        </h3>
                      )}

                      <div className="flex gap-4 text-xs">
                        <button
                          onClick={() => {
                            setEditSub(sub.id)
                            setInputs({ ...inputs, [sub.id]: sub.title })
                          }}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteSubTopic(topic.id, sub.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* ADD QUESTION */}
                    <div className="flex gap-3 mb-4">
                      <input
                        value={inputs[`q-${sub.id}`] || ""}
                        onChange={(e) =>
                          setInputs({
                            ...inputs,
                            [`q-${sub.id}`]: e.target.value,
                          })
                        }
                        onKeyDown={(e) => {
                          if (
                            e.key === "Enter" &&
                            inputs[`q-${sub.id}`]?.trim()
                          ) {
                            addQuestion(topic.id, sub.id, inputs[`q-${sub.id}`])
                            setInputs({
                              ...inputs,
                              [`q-${sub.id}`]: "",
                            })
                          }
                        }}
                        placeholder="Add question"
                        className="
                          flex-1 px-3 py-2
                          rounded-xl
                          bg-black/30
                          border border-white/10
                          text-sm
                          focus:ring-2 focus:ring-emerald-500/50
                        "
                      />
                      <button
                        onClick={() => {
                          if (!inputs[`q-${sub.id}`]?.trim()) return
                          addQuestion(topic.id, sub.id, inputs[`q-${sub.id}`])
                          setInputs({
                            ...inputs,
                            [`q-${sub.id}`]: "",
                          })
                        }}
                        className="
                          px-4 rounded-xl
                          bg-gradient-to-r from-emerald-500 to-emerald-600
                          text-black text-sm font-medium
                          hover:brightness-110
                          transition-all
                        "
                      >
                        Add
                      </button>
                    </div>

                    {/* QUESTIONS */}
                    <Droppable
                      droppableId={`questions-${topic.id}-${sub.id}`}
                      type="QUESTION"
                    >
                      {(p) => (
                        <div ref={p.innerRef} {...p.droppableProps} className="space-y-3">
                          {sub.questions.map((q, qIndex) => (
                            <Draggable
                              key={q.id}
                              draggableId={q.id}
                              index={qIndex}
                            >
                              {(p) => (
                                <div
                                  ref={p.innerRef}
                                  {...p.draggableProps}
                                  {...p.dragHandleProps}
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
                                      {q.text}
                                    </span>
                                    <div className="flex gap-4 text-xs">
                                      <button
                                        onClick={() => {
                                          setEditQ(q.id)
                                          setInputs({
                                            ...inputs,
                                            [q.id]: q.text,
                                          })
                                        }}
                                        className="text-blue-400 hover:text-blue-300"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() =>
                                          deleteQuestion(
                                            topic.id,
                                            sub.id,
                                            q.id
                                          )
                                        }
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
                          {p.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                )}
              </Draggable>
            ))}
            {p.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
