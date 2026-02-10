export default function ConfirmModal({
  title,
  value,
  onChange,
  onConfirm,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-[360px] rounded-xl p-5">
        <h3 className="font-semibold mb-3">{title}</h3>

        {onChange && (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-4"
          />
        )}

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-sm">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-indigo-600 text-white px-4 py-1.5 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
