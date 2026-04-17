import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { BASE_URL } from "../config";

export default function AdminAllHelp() {
  const [requests, setRequests] = useState([]);
  const [answerMap, setAnswerMap] = useState({});
  const [submittedMap, setSubmittedMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [messageMap, setMessageMap] = useState({});

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const fetchAllRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/help/all`, {
        withCredentials: true,
      });

      console.log("Admin");
      // Filter out requests that already have answers
      const unansweredRequests = res.data.filter((req) => !req.answer);
      setRequests(unansweredRequests);

      const initialAnswers = {};
      const submittedStatus = {};
      unansweredRequests.forEach((req) => {
        initialAnswers[req._id] = req.answer || "";
        submittedStatus[req._id] = !!req.answer;
      });

      setAnswerMap(initialAnswers);
      setSubmittedMap(submittedStatus);
    } catch (err) {
      console.error("Failed to fetch help requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (id, value) => {
    if (submittedMap[id]) return; // prevent editing after submission
    setAnswerMap((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitAnswer = async (id) => {
    const answer = answerMap[id];
    if (!answer.trim()) return alert("Answer cannot be empty.");

    try {
      await axios.patch(
        `${BASE_URL}/help/answer/${id}`,
        { answer },
        { withCredentials: true }
      );

      setSubmittedMap((prev) => ({ ...prev, [id]: true }));
      setMessageMap((prev) => ({ ...prev, [id]: "✅ Answer submitted!" }));

      // Remove request from state after 3 seconds
      setTimeout(() => {
        setMessageMap((prev) => {
          const newMap = { ...prev };
          delete newMap[id];
          return newMap;
        });

        setRequests((prev) => prev.filter((req) => req._id !== id));
      }, 3000);
    } catch (err) {
      console.error("Error submitting answer:", err);
      setMessageMap((prev) => ({
        ...prev,
        [id]: "❌ Failed to submit answer.",
      }));

      setTimeout(() => {
        setMessageMap((prev) => {
          const newMap = { ...prev };
          delete newMap[id];
          return newMap;
        });
      }, 3000);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#0B3D2E] text-white pt-[6rem] pb-[6rem]">
        {loading ? (
          // ✅ Loader here
          <div className="flex justify-center items-center h-[60vh]">
            <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-[#2ECC71]"></div>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-[#2ECC71] text-center mb-8">
              Admin – All Help Requests
            </h2>

            <div className="space-y-6">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="bg-white text-black rounded-xl shadow-md p-6 mx-[3rem] space-y-2"
                >
                  <p className="text-lg font-semibold text-[#0B3D2E]">
                    🧑‍🌾 {req.name}
                  </p>
                  <p className="text-sm text-gray-700 italic">
                    📧 {req.email} | 📞 {req.phoneNo}
                  </p>
                  <p className="text-sm text-gray-600">
                    🌍 {req.state}, {req.district}
                  </p>
                  <p className="text-md mt-2">
                    <span className="font-semibold text-[#2ECC71]">Help:</span>{" "}
                    {req.help}
                  </p>

                  {req.imageUrl && (
                    <a
                      href={`${BASE_URL}/${req.imageUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      📎 View Attachment
                    </a>
                  )}

                  <div className="mt-4">
                    <label className="block font-medium text-gray-800 mb-1">
                      Answer:
                    </label>
                    <textarea
                      className="w-full p-2 rounded border border-gray-300 bg-[#f3f3f3]"
                      rows="3"
                      value={answerMap[req._id] ?? ""}
                      onChange={(e) =>
                        handleAnswerChange(req._id, e.target.value)
                      }
                      disabled={submittedMap[req._id]} // cannot edit after submission
                    />

                    {messageMap[req._id] && (
                      <p className="text-center text-base font-semibold text-[#2ECC71] mt-4 animate-pulse tracking-wide">
                        {messageMap[req._id]}
                      </p>
                    )}

                    <p className="text-xs text-gray-500 text-right">
                      Submitted: {new Date(req.createdAt).toLocaleString()}
                    </p>

                    <button
                      onClick={() => handleSubmitAnswer(req._id)}
                      disabled={submittedMap[req._id]}
                      className={`mt-2 font-bold px-4 py-2 rounded transition ${
                        submittedMap[req._id]
                          ? "bg-green-500 text-white cursor-not-allowed"
                          : "bg-[#2ECC71] hover:bg-[#27ae60] text-white"
                      }`}
                    >
                      {submittedMap[req._id]
                        ? "Answer Submitted"
                        : "Submit Answer"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
