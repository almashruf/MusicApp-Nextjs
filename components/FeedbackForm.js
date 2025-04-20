import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { submitFeedback } from "../utils/submitFeedback";

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const user = useAuth();

  const handleSubmit = async () => {
    if (!user) return alert("Login to submit feedback.");
    await submitFeedback(user.uid, feedback);
    alert("Feedback submitted!");
    setFeedback("");
  };

  return (
    <div className="p-4">
      <textarea
        className="textarea"
        placeholder="Enter your feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button className="btn mt-2" onClick={handleSubmit}>
        Submit Feedback
      </button>
    </div>
  );
}