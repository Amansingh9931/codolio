import { useState, useRef, useEffect } from "react"
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
      {/* ADD SUB TOPIC */}
      <div className="
        bg-[#020617] border border-[#1e293b]
        rounded-lg p-4 mb-6
        hover:border-blue-500/40
        transition-all
      ">
        <div className="flex gap-3">
          <input
            value={subInput}
            onChange={(e) => setSubInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && subInput.trim() &&
              (addSubTopic(topic.id, subInput), setSubInput(""))}
            placeholder="Add sub-topic"
            className="flex-1 px-3 py-2 bg-[#020617] border border-[#1e293b] rounded"
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

      {topic.subTopics.map((sub) => (
        <div
          key={sub.id}
          className="
            bg-[#020617] border border-[#1e293b]
            rounded-lg p-4 mb-6
            hover:border-purple-500/40
            hover:shadow-md hover:shadow-purple-500/10
            transition-all
          "
        >
          {/* SUB TOPIC HEADER */}
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
                className="bg-[#020617] border border-[#1e293b] px-2 py-1 rounded"
              />
            ) : (
              <h3 className="font-medium">{sub.title}</h3>
            )}

            <div className="flex gap-3 text-sm">
              {editSub === sub.id ? (
                <button
                  onClick={() => {
                    updateSubTopic(topic.id, sub.id, inputs[sub.id])
                    setEditSub(null)
                  }}
                  className="text-green-400 hover:text-green-300"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditSub(sub.id)
                    setInputs({ ...inputs, [sub.id]: sub.title })
                  }}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Edit
                </button>
              )}
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
                setInputs({ ...inputs, [`q-${sub.id}`]: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" &&
                inputs[`q-${sub.id}`]?.trim() &&
                (addQuestion(topic.id, sub.id, inputs[`q-${sub.id}`]),
                setInputs({ ...inputs, [`q-${sub.id}`]: "" }))}
              placeholder="Add question"
              className="flex-1 px-2 py-1 bg-[#020617] border border-[#1e293b] rounded text-sm"
            />
            <button
              onClick={() => {
                if (!inputs[`q-${sub.id}`]?.trim()) return
                addQuestion(topic.id, sub.id, inputs[`q-${sub.id}`])
                setInputs({ ...inputs, [`q-${sub.id}`]: "" })
              }}
              className="bg-green-500 text-black px-3 rounded hover:bg-green-600 transition"
            >
              Add
            </button>
          </div>

          {/* QUESTIONS */}
          {sub.questions.map((q) => (
            <div
              key={q.id}
              className="
                bg-[#020617] border border-[#1e293b]
                rounded-md px-3 py-2 mb-2
                flex justify-between items-center
                hover:border-emerald-500/40
                transition-all
              "
            >
              {editQ === q.id ? (
                <input
                  ref={editRef}
                  value={inputs[q.id]}
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
                  className="bg-[#020617] border border-[#1e293b] px-2 py-1 rounded w-full"
                />
              ) : (
                <span className="text-gray-300">{q.text}</span>
              )}

              <div className="flex gap-3 text-xs">
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
                  onClick={() =>
                    deleteQuestion(topic.id, sub.id, q.id)
                  }
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
