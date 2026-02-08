import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useState } from "react"
import { useSheetStore } from "../store/useSheetStore"
import TopicItem from "./TopicItem"

export default function TopicList() {
  const { topics, addTopic, updateTopic, deleteTopic, reorderTopics } = useSheetStore()

  const [newTopic, setNewTopic] = useState("")
  const [editId, setEditId] = useState(null)
  const [editValue, setEditValue] = useState("")

  const onDragEnd = (result) => {
    if (!result.destination) return
    const items = Array.from(topics)
    const [moved] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, moved)
    reorderTopics(items)
  }

  return (
    <div>
      {/* ADD TOPIC */}
      <div className="flex gap-2 mb-6">
        <input
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="New topic name"
          className="flex-1 px-4 py-2 bg-black border rounded text-white"
        />
        <button
          onClick={() => {
            if (!newTopic.trim()) return
            addTopic(newTopic)
            setNewTopic("")
          }}
          className="px-4 bg-orange-500 rounded text-black font-medium"
        >
          Add Topic
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="topics">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {topics.map((topic, index) => (
                <Draggable key={topic.id} draggableId={topic.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      {/* Topic Header */}
                      <div className="flex items-center gap-2 mb-2">
                        <div {...provided.dragHandleProps} className="cursor-move">☰</div>

                        {editId === topic.id ? (
                          <>
                            <input
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="flex-1 px-2 py-1 bg-black border rounded text-white"
                            />
                            <button
                              onClick={() => {
                                updateTopic(topic.id, editValue)
                                setEditId(null)
                              }}
                              className="text-green-400"
                            >
                              Save
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="flex-1 font-semibold text-white">
                              {topic.title}
                            </span>
                            <button
                              onClick={() => {
                                setEditId(topic.id)
                                setEditValue(topic.title)
                              }}
                              className="text-blue-400"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteTopic(topic.id)}
                              className="text-red-400"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>

                      <TopicItem topic={topic} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
