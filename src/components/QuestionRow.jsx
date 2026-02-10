import { Draggable } from "@hello-pangea/dnd"
import { motion } from "framer-motion"

export default function QuestionRow({ q, path }) {
  return (
    <Draggable draggableId={q.id} index={path.at(-1)}>
      {(prov) => (
        <motion.div
          ref={prov.innerRef}
          {...prov.draggableProps}
          {...prov.dragHandleProps}
          layout
          whileHover={{ scale: 1.02, y: -2 }}
          className="px-4 py-3 rounded-lg bg-black/30
                     border border-white/10 hover:border-orange-500/40"
        >
          <p className="text-sm font-medium">{q.title}</p>
          <span className="text-xs text-gray-500">
            {q.platform} · {q.difficulty}
          </span>
        </motion.div>
      )}
    </Draggable>
  )
}
