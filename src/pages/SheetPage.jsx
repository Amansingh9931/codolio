import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import TopicCard from "../components/TopicCard"
import { useSheetStore } from "../store/useSheetStore"

export default function SheetPage() {
  const { topics, moveItem, addItem } = useSheetStore()

  const handleDragEnd = ({ source, destination, type }) => {
    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return

    let src, dst

    if (type === "TOPIC") {
      src = { path: [source.index] }
      dst = { path: [destination.index] }
    }

    if (type === "SUB") {
      const ti = topics.findIndex((t) => t.id === source.droppableId)
      src = { path: [ti, "subTopics", source.index] }
      dst = { path: [ti, "subTopics", destination.index] }
    }

    if (type === "QUESTION") {
      let ti = -1,
        si = -1
      topics.forEach((t, i) =>
        t.subTopics.forEach((s, j) => {
          if (s.id === source.droppableId) {
            ti = i
            si = j
          }
        })
      )
      src = { path: [ti, "subTopics", si, "questions", source.index] }
      dst = { path: [ti, "subTopics", si, "questions", destination.index] }
    }

    moveItem(src, dst)
  }

  return (
    <div className="min-h-screen px-6 py-14 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Strivers A2Z DSA Sheet</h1>
      <p className="text-gray-400 mb-8">
        Structured roadmap to master DSA
      </p>

      <button
        onClick={() => addItem([], "Topic")}
        className="mb-10 px-6 py-3 bg-orange-500 rounded-xl hover:bg-orange-600 transition"
      >
        + Add Topic
      </button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="topics" type="TOPIC">
          {(p) => (
            <div ref={p.innerRef} {...p.droppableProps} className="space-y-8">
              {topics.map((t, i) => (
                <TopicCard key={t.id} topic={t} index={i} />
              ))}
              {p.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
