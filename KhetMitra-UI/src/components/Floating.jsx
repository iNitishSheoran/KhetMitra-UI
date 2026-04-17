import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Share2, ThumbsUp, Send, Sparkles } from "lucide-react";

export default function Floating() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [language, setLanguage] = useState("hi");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const [isOn, setIsOn] = useState(false); // ✅ Motor Toggle State

  const chatEndRef = useRef(null);
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const handleCall = () => (window.location.href = "tel:+917988100765");

  const handleShare = () => {
    const text = encodeURIComponent("🌱 किसान मित्र, मेरी खेती के अनुभव को देखें! 🚜");
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, loading]);


  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMessage = { role: "user", content: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setLoading(true);

    try {
      const systemInstruction =
        language === "ml"
          ? "You are KhetMitra, a helpful farming assistant. Respond in Malayalam."
          : language === "hi"
          ? "You are KhetMitra, a helpful farming assistant. Respond in Hindi."
          : "You are KhetMitra, a helpful farming assistant. Respond in English.";

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: systemInstruction },
            ...chatMessages,
            userMessage,
          ],
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message || "API error");

      const botReply =
        data?.choices?.[0]?.message?.content ||
        (language === "hi"
          ? "माफ़ करें, अभी उत्तर उपलब्ध नहीं है।"
          : "Sorry, no response available right now.");

      setChatMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: `❌ Error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmitFeedback = () => {
    alert(
      `🙏 धन्यवाद ${name || "Farmer"}!\nFeedback: ${feedback}\nRating: ${rating}⭐`
    );
    setName("");
    setFeedback("");
    setRating(0);
    setIsFeedbackOpen(false);
  };


  return (
    <>
      {/* 🌟 Floating Buttons */}
      <div className="fixed bottom-6 right-1 flex flex-col items-center mr-0 gap-6 z-50">

        {/* ✅ MOTOR TOGGLE IMAGE + BUTTON ABOVE ASK KHETMITRA */}
        <div className="flex flex-col items-center">

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOn(!isOn)}
            className={`mt-2 px-5 py-2 rounded-xl text-white font-semibold shadow-lg
              ${isOn ? "bg-green-600" : "bg-red-600"}`}
          >
            {isOn ? "Turn OFF Motor" : "Turn ON Motor"}
          </motion.button>
        </div>
        {/* ✅ END OF ADDED CODE */}


        {/* Chatbot Button */}
        <motion.div
          className="relative flex flex-col items-center cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          onClick={() => setIsChatOpen(true)}
        >
          <span className="pointer-events-none absolute w-20 h-20 rounded-full border-4 border-purple-500 opacity-40 animate-ping" />
          <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 flex items-center justify-center shadow-2xl">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <p className="mt-2 text-sm font-semibold text-purple-700 text-center">
            Ask KhetMitra
          </p>
        </motion.div>

        {/* Call / Share / Feedback */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleCall}
            className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <Phone className="text-white w-6 h-6" />
          </button>

          <button
            onClick={handleShare}
            className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <Share2 className="text-white w-6 h-6" />
          </button>

          <button
            onClick={() => setIsFeedbackOpen(true)}
            className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <ThumbsUp className="text-white w-6 h-6" />
          </button>
        </div>
      </div>


      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-3xl shadow-2xl w-[90%] max-w-md flex flex-col h-[75vh] border border-purple-200"
            >
              <h2 className="text-2xl font-bold text-center text-purple-700 mb-2">
                🤖 KhetMitra Chatbot
              </h2>

              <div className="flex justify-center gap-3 my-2">
                {[
                  { code: "ml", label: "Malayalam" },
                  { code: "hi", label: "Hindi" },
                  { code: "en", label: "English" },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                      language === lang.code
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto border p-3 rounded-xl bg-gradient-to-b from-gray-50 to-gray-100 space-y-3 shadow-inner">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-2xl text-sm whitespace-pre-wrap shadow ${
                      msg.role === "user"
                        ? "bg-purple-100 self-end ml-auto"
                        : "bg-green-100 self-start"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
                {loading && (
                  <p className="text-center text-gray-500 animate-pulse">
                    ✍️ Typing...
                  </p>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="flex mt-3 gap-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={
                    language === "ml"
                      ? "നിങ്ങളുടെ ചോദ്യം എഴുതുക..."
                      : language === "hi"
                      ? "अपना प्रश्न लिखें..."
                      : "Type your question..."
                  }
                  className="flex-1 border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-inner"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 rounded-xl shadow hover:scale-105 transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => setIsChatOpen(false)}
                className="mt-3 text-sm text-gray-500 hover:text-gray-700 underline text-center"
              >
                ❌ Close Chat
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
