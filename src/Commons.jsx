export const Button = ({ text, className, disabled, onClick }) => {
  const classes = ["big"]
  if (className) {
    classes.push(className)
  }

  return (
    <button onClick={onClick} className={classes.join(" ")} disabled={disabled}>
      {text}
    </button>)
}