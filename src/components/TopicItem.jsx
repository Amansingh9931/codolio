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
    <div className="p-5">
      {/* ADD SUB-TOPIC */}
      <div
        className="
          bg-[#020617] border border-[#1e293b]
          rounded-lg p-4 mb-6
          hover:border-blue-500/40
          hover:shadow-lg hover:shadow-blue-500/10
          transition-all
        "
      >
        <div className="flex gap-3">
          <input
            value={subInput}
            onChange={(e) => setSubInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && subInput.trim()) {
                addSubTopic(topic.id, subInput)
                setSubInput("")
              }
            }}
            placeholder="Add sub-topic"
            className="
              flex-1 px-3 py-2
              bg-[#020617] border border-[#1e293b]
              rounded
              focus:outline-none focus:ring-2 focus:ring-blue-500
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
              bg-blue-500 text-black px-4 rounded
              hover:bg-blue-600
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
          <div ref={p.innerRef} {...p.droppableProps}>
            {topic.subTopics.map((sub, subIndex) => (
              <Draggable key={sub.id} draggableId={sub.id} index={subIndex}>
                {(p) => (
                  <div
                    ref={p.innerRef}
                    {...p.draggableProps}
                    {...p.dragHandleProps}
                    className="
                      bg-[#020617] border border-[#1e293b]
                      rounded-lg p-4 mb-6
                      cursor-grab active:cursor-grabbing
                      hover:border-purple-500/50
                      hover:shadow-xl hover:shadow-purple-500/10
                      hover:-translate-y-[1px]
                      transition-all
                    "
                  >
                    {/* SUB-TOPIC HEADER */}
                    <div className="flex justify-between mb-3">
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
                            bg-[#020617] border border-[#1e293b]
                            px-2 py-1 rounded
                            focus:ring-2 focus:ring-purple-500
                          "
                        />
                      ) : (
                        <h3 className="font-medium text-white">
                          {sub.title}
                        </h3>
                      )}

                      <div className="flex gap-3 text-sm">
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
                    <div className="flex gap-2 mb-3">
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
                          flex-1 px-2 py-1
                          bg-[#020617] border border-[#1e293b]
                          rounded text-sm
                          focus:ring-2 focus:ring-green-500
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
                          bg-green-500 text-black px-3 rounded
                          hover:bg-green-600 transition
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
                        <div ref={p.innerRef} {...p.droppableProps}>
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
                                    bg-[#020617] border border-[#1e293b]
                                    rounded-md px-3 py-2 mb-2
                                    cursor-grab active:cursor-grabbing
                                    hover:border-emerald-500/50
                                    hover:shadow-md hover:shadow-emerald-500/10
                                    hover:-translate-y-[1px]
                                    transition-all
                                  "
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-300">
                                      {q.text}
                                    </span>
                                    <div className="flex gap-3 text-xs">
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
