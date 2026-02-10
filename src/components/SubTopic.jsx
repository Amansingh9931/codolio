import { useState } from "react"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { motion, AnimatePresence } from "framer-motion"
import QuestionRow from "./QuestionRow"
import { useSheetStore } from "../store/useSheetStore"

export default function SubTopic({ sub, path }) {
  const [open, setOpen] = useState(false)
  const { addItem } = useSheetStore()

  return (
    <Draggable draggableId={sub.id} index={path.at(-1)}>
      {(p) => (
        <motion.div
          ref={p.innerRef}
          {...p.draggableProps}
          layout
          className="glass p-4 shadow-md shadow-black/30 hover:shadow-lg hover:shadow-orange-500/10"
        >
          <div
            {...p.dragHandleProps}
            onClick={() => setOpen(!open)}
            className="cursor-pointer flex items-center gap-2"
          >
            <span className="w-4 text-gray-400">
              {open ? "▼" : "▶"}
            </span>
            <span className="font-medium">{sub.name}</span>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4"
              >
                <button
                  onClick={() => addItem(path, "Question")}
                  className="mb-3 px-3 py-1 bg-orange-500 rounded text-sm hover:bg-orange-600"
                >
                  + Question
                </button>

                <Droppable droppableId={sub.id} type="QUESTION">
                  {(p) => (
                    <div
                      ref={p.innerRef}
                      {...p.droppableProps}
                      className="space-y-2 pl-4 border-l border-white/10"
                    >
                      {sub.questions.map((q, i) => (
                        <QuestionRow
                          key={q.id}
                          q={q}
                          path={[...path, "questions", i]}
                        />
                      ))}
                      {p.placeholder}
                    </div>
                  )}
                </Droppable>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </Draggable>
  )
}
