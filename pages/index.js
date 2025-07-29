import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput(""); // clear input

    // Send the message to your API
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      // Add AI response to the chat
      setMessages([...newMessages, { role: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div>
   
    <div style={styles.container}>
      <h1 style={styles.title}>🧠  Clara Bot</h1>
      <br />
      <div style={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div key={idx} style={msg.role === "user" ? styles.userMsg : styles.botMsg}>
            <strong>{msg.role === "user" ? "You" : "ClaraBot"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>Send</button>
      </div>
    </div>
    <p style={styles.footerText}>
      Your Mental Health Wellness Expert | Created by Joseph Crown
    </p>
    
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    minHeight: "640px",
    margin: "40px auto",
    padding: "15px",
    fontFamily: "'Montserrat', 'Lato', Arial, sans-serif",
    background: "linear-gradient(135deg, #2d0b4e 0%, #3a1c71 50%, #5f2c82 100%)",
    borderRadius: "18px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    position: "relative",
    overflow: "hidden",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#fff",
    fontWeight: 700,
    fontSize: "2.2rem",
    letterSpacing: "1px",
    marginTop: "0",
  },
  chatBox: {
    //flex: 1,
    height: "520px",
    borderRadius: "18px",
    padding: "30px 30px 20px 30px",
    overflowY: "auto",
    marginBottom: "10px",
    background: "rgba(34, 17, 51, 0.85)",
    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  userMsg: {
    alignSelf: "flex-end",
    background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
    color: "#2d0b4e",
    borderRadius: "16px 16px 4px 16px",
    padding: "12px 18px",
    margin: "0 0 0 60px",
    fontWeight: 500,
    fontSize: "1.05rem",
    boxShadow: "0 2px 8px 0 rgba(67,233,123,0.08)",
    maxWidth: "70%",
    wordBreak: "break-word",
  },
  botMsg: {
    alignSelf: "flex-start",
    background: "linear-gradient(90deg, #ff6aab 0%, #a685fa 100%)",
    color: "#fff",
    borderRadius: "16px 16px 16px 4px",
    padding: "12px 18px",
    margin: "0 60px 0 0",
    fontWeight: 500,
    fontSize: "1.05rem",
    boxShadow: "0 2px 8px 0 rgba(166,133,250,0.08)",
    maxWidth: "70%",
    wordBreak: "break-word",
  },
  inputArea: {
    display: "flex",
    gap: "14px",
    background: "rgba(34, 17, 51, 0.92)",
    borderRadius: "0 0 18px 18px",
    padding: "18px 30px",
    alignItems: "center",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    padding: "13px 16px",
    fontSize: "1.1rem",
    border: "none",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    borderRadius: "8px",
    outline: "none",
    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
    transition: "background 0.2s",
  },
  button: {
    padding: "13px 28px",
    fontSize: "1.1rem",
    background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
    color: "#2d0b4e",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 2px 8px 0 rgba(67,233,123,0.12)",
    padding: "10px",
    fontSize: "16px",
    borderWidth: '1px',
    borderColor: '#CCCCCC',
    backgroundColor: '#f8f8f8',
    color: '#000000',
    borderStyle: 'hidden',
    borderRadius: '7px',
    boxShadow: '0px 0px 5px rgba(66,66,66,0.29)',
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#7d4ca3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  footerText: {
    textAlign: "center",
    marginTop: "10px",
    fontSize: "20px",
    color: "White",
    fontFamily: "'Montserrat', 'Lato', Arial, sans-serif",
  }
};
