import { use, useActionState, useOptimistic } from "react";

import { OpinionsContext } from "../store/opinions-context";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  //arg #1 the state which must be updated optimisticly
  //arg #2 the function which will be invoked be react, but at the point of time it is defined by you.
  //this second arg accept previous state as a first arg, and other args are our own.

  //this hook return state, which we passed as a first arg to this hook,
  //  and the function which will be trigger our second arg

  const [optimisticVotes, setVotesOptimistically] = useOptimistic(
    votes,
    //every args passed to "setVotesOptimistically" will be passed automatically
    (prevVotes, mode) => (mode === "up" ? prevVotes + 1 : prevVotes - 1)
  );

  //"setVotesOptimistically" can be called in any "formAction"
  //because it is temporarily state,
  //which is shown on the UI whiles the form,
  //the invoked of this optimistic function, is beeing submited

  async function upvoteAction() {
    setVotesOptimistically("up");
    await upvoteOpinion(id);
  }

  async function downvoteAction() {
    setVotesOptimistically("down");
    await downvoteOpinion(id);
  }

  const [upvoteFormState, upvoteFormAction, upvotePending] =
    useActionState(upvoteAction);
  const [downvoteFormState, downvoteFormAction, downvotePending] =
    useActionState(downvoteAction);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button
          formAction={upvoteFormAction}
          disabled={upvotePending || downvotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        <button
          formAction={downvoteFormAction}
          disabled={upvotePending || downvotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
