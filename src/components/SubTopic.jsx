import { useState } from "react"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import QuestionRow from "./QuestionRow"
import ConfirmModal from "./ConfirmModal"
import { useSheetStore } from "../store/useSheetStore"


export default function SubTopic({ sub, path }) {
  return (
    <Draggable draggableId={sub.id} index={path.at(-1)}>
      {(prov) => (
        <div ref={prov.innerRef} {...prov.draggableProps}>
          {/* Subtopic title */}
          <div
            {...prov.dragHandleProps}
            className="flex justify-between items-center mb-3"
          >
            <h3 className="text-sm font-semibold text-gray-700">
              {sub.name}
            </h3>

            <div className="flex gap-2 text-xs text-gray-400">
              <button>✏</button>
              <button className="text-red-500">🗑</button>
            </div>
          </div>

          {/* Questions */}
          <Droppable droppableId={sub.id} type="QUESTION">
            {(prov) => (
              <div
                ref={prov.innerRef}
                {...prov.droppableProps}
                className="space-y-2"
              >
                {sub.questions.map((q, i) => (
                  <QuestionRow
                    key={q.id}
                    q={q}
                    path={[...path, "questions", i]}
                  />
                ))}
                {prov.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}
