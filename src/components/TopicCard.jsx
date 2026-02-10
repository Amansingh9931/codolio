import { useState } from "react"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import SubTopic from "./SubTopic"

export default function TopicCard({ topic, index }) {
  const [open, setOpen] = useState(true)

  return (
    <Draggable draggableId={topic.id} index={index}>
      {(prov) => (
        <div
          ref={prov.innerRef}
          {...prov.draggableProps}
          className="bg-white rounded-xl shadow-sm border"
        >
          {/* Topic Header */}
          <div
            {...prov.dragHandleProps}
            className="flex justify-between items-center px-5 py-4 cursor-pointer hover:bg-gray-50 rounded-t-xl"
            onClick={() => setOpen(!open)}
          >
            <h2 className="text-lg font-semibold">{topic.name}</h2>

            <div className="flex gap-3 text-gray-500">
              <button>✏</button>
              <button className="text-red-500">🗑</button>
            </div>
          </div>

          {/* Subtopics */}
          {open && (
            <Droppable droppableId={topic.id} type="SUB">
              {(prov) => (
                <div
                  ref={prov.innerRef}
                  {...prov.droppableProps}
                  className="px-5 pb-5 space-y-6"
                >
                  {topic.subTopics.map((s, i) => (
                    <SubTopic
                      key={s.id}
                      sub={s}
                      path={[index, "subTopics", i]}
                    />
                  ))}
                  {prov.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>
      )}
    </Draggable>
  )
}
