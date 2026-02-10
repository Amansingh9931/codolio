import { Draggable } from "@hello-pangea/dnd"


export default function QuestionRow({ q }) {
  return (
    <Draggable draggableId={q.id} index={0}>
      {(prov) => (
        <div
          ref={prov.innerRef}
          {...prov.draggableProps}
          {...prov.dragHandleProps}
          className="flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg"
        >
          <div>
            <p className="text-sm font-medium">{q.title}</p>
            <span className="text-xs text-gray-500">
              {q.platform} · {q.difficulty}
            </span>
          </div>

          <div className="flex gap-3 text-gray-400 text-sm">
            <button>✏</button>
            <button className="text-red-500">🗑</button>
          </div>
        </div>
      )}
    </Draggable>
  )
}
