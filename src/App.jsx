import React, { useState } from 'react';
import axios from 'axios';

export default function RTCChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const completion = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are RTC Advising GPT. Answer using the latest RTC class data.' },
            ...newMessages
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const gptReply = completion.data.choices[0].message.content;
      setMessages([...newMessages, { role: 'assistant', content: gptReply }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Error fetching GPT reply.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">RTC Class Advisor</h1>
      <div className="border rounded p-4 h-96 overflow-y-auto mb-4 bg-white">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <p><strong>{msg.role === 'user' ? 'You' : 'Advisor'}:</strong> {msg.content}</p>
          </div>
        ))}
        {loading && <p><em>Advisor is typing...</em></p>}
      </div>
      <input
        className="border rounded p-2 w-full mb-2"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask about classes, dates, or instructors..."
      />
      <button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={handleSend} disabled={loading}>
        Send
      </button>
    </div>
  );
}
