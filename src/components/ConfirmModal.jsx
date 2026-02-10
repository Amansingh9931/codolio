export default function ConfirmModal({
  title,
  value,
  onChange,
  onConfirm,
  onClose,
}) {
  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="glass w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-semibold text-lg text-white mb-4">{title}</h3>

        {onChange && (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onConfirm()}
            autoFocus
            className="w-full bg-white/20 border border-white/30 text-white px-3 py-2 rounded-lg mb-4 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 placeholder-white/60"
            placeholder="Enter text..."
          />
        )}

        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 rounded-lg transition font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}