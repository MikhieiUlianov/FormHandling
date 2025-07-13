//hook must be called nested.
//inside component which is wrapped by form itself
import { useFormStatus } from "react-dom";

export default function Submit() {
  const { pending } = useFormStatus();
  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </p>
  );
}
