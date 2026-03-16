export default function Button({ label, color, onClick, isActive = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`color-button${isActive ? ' active' : ''}`}
      style={{ backgroundColor: color }}
    >
      {label}
    </button>
  )
}
