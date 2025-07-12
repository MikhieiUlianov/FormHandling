export default function Input({ label, id, error, ...props }) {
  return (
    <div className="control no-margin" key={id}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div className="contro-error">{error && <p>{error}</p>}</div>
    </div>
  );
}
