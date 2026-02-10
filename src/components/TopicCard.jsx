import { useState } from "react"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { motion, AnimatePresence } from "framer-motion"
import SubTopic from "./SubTopic"
import { useSheetStore } from "../store/useSheetStore"

export default function TopicCard({ topic, index }) {
  const [open, setOpen] = useState(false)
  const { addItem } = useSheetStore()

  return (
    <Draggable draggableId={topic.id} index={index}>
      {(p) => (
        <motion.div
          ref={p.innerRef}
          {...p.draggableProps}
          layout
          transition={{ layout: { duration: 0.3 } }}
          className="glass hover-lift shadow-lg shadow-black/40 hover:shadow-2xl hover:shadow-orange-500/20"
        >
          <div
            {...p.dragHandleProps}
            onClick={() => setOpen(!open)}
            className="px-6 py-5 cursor-pointer flex items-center gap-3"
          >
            <span className="w-4 text-gray-400">
              {open ? "▼" : "▶"}
            </span>
            <span className="font-semibold">{topic.name}</span>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <Droppable droppableId={topic.id} type="SUB">
                  {(p) => (
                    <div
                      ref={p.innerRef}
                      {...p.droppableProps}
                      className="p-6 space-y-4 max-w-[95%] mx-auto"
                    >
                      <button
                        onClick={() => addItem([index], "SubTopic")}
                        className="px-4 py-2 bg-orange-500 rounded hover:bg-orange-600"
                      >
                        + SubTopic
                      </button>

                      {topic.subTopics.map((s, i) => (
                        <SubTopic
                          key={s.id}
                          sub={s}
                          path={[index, "subTopics", i]}
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
