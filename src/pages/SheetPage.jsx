import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import TopicCard from "../components/TopicCard"
import { useSheetStore } from "../store/useSheetStore"

export default function SheetPage() {
  const { topics } = useSheetStore()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Strivers A2Z DSA Sheet</h1>
        <p className="text-gray-600 mt-1">
          Master DSA with structured practice
        </p>
      </div>

      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="topics" type="TOPIC">
          {(prov) => (
            <div
              ref={prov.innerRef}
              {...prov.droppableProps}
              className="space-y-6"
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
  )
}
