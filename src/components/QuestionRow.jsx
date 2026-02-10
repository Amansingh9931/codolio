import { Draggable } from "@hello-pangea/dnd"
import { motion } from "framer-motion"

export default function QuestionRow({ q, path }) {
  return (
    <Draggable draggableId={q.id} index={path.at(-1)}>
      {(p) => (
        <motion.div
          ref={p.innerRef}
          {...p.draggableProps}
          {...p.dragHandleProps}
          layout
          whileHover={{ scale: 1.02, y: -2 }}
          className="px-4 py-3 rounded-lg bg-black/30
                     border border-white/10
                     shadow-sm shadow-black/30
                     hover:shadow-xl hover:shadow-orange-500/20
                     hover:bg-black/40 transition"
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
