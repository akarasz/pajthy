export const Button = ({ text, disabled, onClick }) => (
  <button onClick={onClick} className="big" disabled={disabled}>
    {text}
  </button>)