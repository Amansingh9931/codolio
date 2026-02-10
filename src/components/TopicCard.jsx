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
      {(prov) => (
        <motion.div
          ref={prov.innerRef}
          {...prov.draggableProps}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass hover-lift"
        >
          {/* Header ALWAYS visible */}
          <div
            {...prov.dragHandleProps}
            onClick={() => setOpen(!open)}
            className="flex justify-between items-center px-6 py-5 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <motion.span
                animate={{ rotate: open ? 90 : 0 }}
                className="text-gray-400"
              >
                ▶
              </motion.span>
              <h2 className="text-lg font-semibold group-hover:text-orange-400">
                {topic.name}
              </h2>
            </div>

            <span className="text-xs text-gray-400">
              {topic.subTopics.length} subtopics
            </span>
          </div>

          {/* Collapsible body */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <Droppable droppableId={topic.id} type="SUB">
                  {(prov) => (
                    <div
                      ref={prov.innerRef}
                      {...prov.droppableProps}
                      className="px-6 pb-6 space-y-6"
                    >
                      <button
                        onClick={() => addItem([index], "SubTopic")}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600
                                   text-sm rounded-lg"
                      >
                        ➕ Add Sub-Topic
                      </button>

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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </Draggable>
  )
}
