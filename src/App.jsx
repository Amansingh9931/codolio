import TopicList from "./components/TopicLists"

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-8">
          Interactive Question Sheet
        </h1>
        <TopicList />
      </div>
    </div>
  )
}
