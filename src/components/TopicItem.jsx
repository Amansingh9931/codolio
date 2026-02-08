import { useState } from "react"
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

  const [newSub, setNewSub] = useState("")
  const [editSub, setEditSub] = useState(null)
  const [editQuestion, setEditQuestion] = useState(null)
  const [inputs, setInputs] = useState({})

  return (
    <div className="ml-6 border-l border-zinc-700 pl-4 mb-6">
      {/* ADD SUB-TOPIC */}
      <div className="flex gap-2 mb-4">
        <input
          value={newSub}
          onChange={(e) => setNewSub(e.target.value)}
          placeholder="Add sub-topic"
          className="flex-1 px-3 py-1 bg-black border rounded text-white"
        />
        <button
          onClick={() => {
            if (!newSub.trim()) return
            addSubTopic(topic.id, newSub)
            setNewSub("")
          }}
          className="bg-blue-500 px-3 rounded text-black"
        >
          Add
        </button>
      </div>

      {topic.subTopics.map((sub) => (
        <div key={sub.id} className="mb-4">
          {/* SUB-TOPIC HEADER */}
          <div className="flex gap-2 items-center mb-2">
            {editSub === sub.id ? (
              <>
                <input
                  value={inputs[sub.id]}
                  onChange={(e) =>
                    setInputs({ ...inputs, [sub.id]: e.target.value })
                  }
                  className="flex-1 px-2 py-1 bg-black border rounded text-white"
                />
                <button
                  onClick={() => {
                    updateSubTopic(topic.id, sub.id, inputs[sub.id])
                    setEditSub(null)
                  }}
                  className="text-green-400"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="font-medium text-white flex-1">
                  {sub.title}
                </span>
                <button
                  onClick={() => {
                    setEditSub(sub.id)
                    setInputs({ ...inputs, [sub.id]: sub.title })
                  }}
                  className="text-blue-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSubTopic(topic.id, sub.id)}
                  className="text-red-400"
                >
                  Delete
                </button>
              </>
            )}
          </div>

          {/* ADD QUESTION */}
          <div className="flex gap-2 mb-2 ml-4">
            <input
              value={inputs[`q-${sub.id}`] || ""}
              onChange={(e) =>
                setInputs({ ...inputs, [`q-${sub.id}`]: e.target.value })
              }
              placeholder="Add question"
              className="flex-1 px-2 py-1 bg-black border rounded text-white text-sm"
            />
            <button
              onClick={() => {
                addQuestion(topic.id, sub.id, inputs[`q-${sub.id}`])
                setInputs({ ...inputs, [`q-${sub.id}`]: "" })
              }}
              className="bg-green-500 px-2 rounded text-black text-sm"
            >
              Add
            </button>
          </div>

          {/* QUESTIONS */}
          <ul className="ml-8 list-disc text-zinc-300 text-sm">
            {sub.questions.map((q) => (
              <li key={q.id} className="flex gap-2 items-center">
                {editQuestion === q.id ? (
                  <>
                    <input
                      value={inputs[q.id]}
                      onChange={(e) =>
                        setInputs({ ...inputs, [q.id]: e.target.value })
                      }
                      className="flex-1 px-2 py-1 bg-black border rounded text-white"
                    />
                    <button
                      onClick={() => {
                        updateQuestion(topic.id, sub.id, q.id, inputs[q.id])
                        setEditQuestion(null)
                      }}
                      className="text-green-400"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex-1">{q.text}</span>
                    <button
                      onClick={() => {
                        setEditQuestion(q.id)
                        setInputs({ ...inputs, [q.id]: q.text })
                      }}
                      className="text-blue-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteQuestion(topic.id, sub.id, q.id)}
                      className="text-red-400"
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
