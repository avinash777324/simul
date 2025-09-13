import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function App() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Welcome to the What If…? Simulator!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: newMessages,
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "(No response)";

      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-comic">
      {/* background sparkle effect */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        <Sparkles className="w-full h-full text-purple-400 opacity-20" />
      </motion.div>

      <div className="w-full max-w-2xl bg-black/40 rounded-2xl shadow-lg p-6 backdrop-blur relative z-10">
        <h1 className="text-3xl font-bold mb-4 text-center">✨ What If…? Simulator</h1>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto mb-4 flex flex-col">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`relative p-3 rounded-2xl max-w-[80%] whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-indigo-600 self-end ml-auto text-right rounded-br-none"
                  : "bg-gray-800 self-start rounded-bl-none"
              }`}
            >
              {msg.content}
              {/* bubble tails */}
              {msg.role === "user" ? (
                <span className="absolute -bottom-2 right-2 w-0 h-0 border-l-8 border-l-indigo-600 border-t-8 border-t-transparent"></span>
              ) : (
                <span className="absolute -bottom-2 left-2 w-0 h-0 border-r-8 border-r-gray-800 border-t-8 border-t-transparent"></span>
              )}
            </motion.div>
          ))}
          {loading && <p className="text-gray-400">Thinking…</p>}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What if cats ruled the world?"
            className="flex-1 p-3 rounded-xl bg-gray-900 text-white border border-gray-700"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 rounded-xl hover:bg-purple-700 disabled:opacity-50"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}
