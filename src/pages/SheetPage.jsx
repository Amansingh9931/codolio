import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import TopicCard from "../components/TopicCard"
import { useSheetStore } from "../store/useSheetStore"

export default function SheetPage() {
  const { topics, moveItem, addItem } = useSheetStore()

  const handleDragEnd = (result) => {
    const { source, destination, type } = result
    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return

    let sourcePath, destPath

    if (type === "TOPIC") {
      sourcePath = { path: [source.index] }
      destPath = { path: [destination.index] }
    }

    moveItem(sourcePath, destPath)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f14] via-[#0f1623] to-[#0b0f14]">
      <div className="max-w-6xl mx-auto px-6 py-14">

        <h1 className="text-4xl font-extrabold mb-2">
          Strivers A2Z DSA Sheet
        </h1>
        <p className="text-gray-400 mb-10">
          Structured roadmap to master DSA
        </p>

        <button
          onClick={() => addItem([], "Topic")}
          className="mb-10 px-6 py-3 rounded-xl font-semibold
                     bg-orange-500 hover:bg-orange-600
                     shadow-lg hover:scale-[1.03]"
        >
          ➕ Add Topic
        </button>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="topics" type="TOPIC">
            {(prov) => (
              <div
                ref={prov.innerRef}
                {...prov.droppableProps}
                className="space-y-8"
              >
                {topics.map((t, i) => (
                  <TopicCard key={t.id} topic={t} index={i} />
                ))}
                {prov.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}
