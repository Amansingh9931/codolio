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
      {(prov) => (
        <motion.div
          ref={prov.innerRef}
          {...prov.draggableProps}
          layout
          className="glass p-4"
        >
          <div
            {...prov.dragHandleProps}
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <motion.span
              animate={{ rotate: open ? 90 : 0 }}
              className="text-gray-400"
            >
              ▶
            </motion.span>
            <h3 className="text-sm font-semibold">{sub.name}</h3>
            <span className="ml-auto text-xs text-gray-500">
              {sub.questions.length} questions
            </span>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <button
                  onClick={() => addItem(path, "Question")}
                  className="mb-3 px-3 py-1.5 bg-orange-500 hover:bg-orange-600
                             text-xs rounded"
                >
                  ➕ Add Question
                </button>

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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </Draggable>
  )
}
