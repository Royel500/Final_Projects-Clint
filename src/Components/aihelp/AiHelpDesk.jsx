// AiHelpDesk.jsx
import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { FaRobot, FaSpinner } from 'react-icons/fa';

export default function AiHelpDesk() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [raw, setRaw] = useState(null);

  const axioss = useAxios();

  // how long the "thinking" delay should be (ms)
  const THINKING_DELAY = 3000;

  // Static common answers
  const commonAnswers = [
    { keywords: ['hi', 'hello', 'hey'], answer: 'Hello 👋! How can I help you today?' },
    { keywords: ['how are you', 'how r u', 'how are u'], answer: "I'm doing great, thanks for asking! 😊 How can I assist you?" },
    { keywords: ['help me', 'need help', 'support'], answer: 'Sure! Please tell me what issue you are facing with parcels, riders, or payments.' },
    { keywords: ['parcel status', 'track', 'where is my parcel'], answer: 'You can track your parcel using the tracking number in the "Track Parcel" section.' },
    { keywords: ['parcel ','parcels','', 'how i can send a parcels', ''], answer: 'You can send parcels go to send parcel section in the top of the page.' },
    { keywords: ['payment', 'paid', 'invoice'], answer: 'All payments are secure and can be viewed in your Payment History.' },
    { keywords: ['rider', 'delivery person'], answer: 'Riders are assigned automatically based on your location and service center.' },
    { keywords: ['return', 'cancel'], answer: 'To cancel or return a parcel, go to the Dashboard My Parcel action section and select the parcel to manage.' },
    { keywords: ['support', 'help'], answer: 'For any help, you can contact our support team via the "About Us" page or chat with us here.' },
  ];


  const getStaticAnswer = (queryText) => {
    const lowerQuery = queryText.toLowerCase();
    for (let item of commonAnswers) {
      if (item.keywords.some(k => lowerQuery.includes(k))) {
        return item.answer;
      }
    }
    return null; // No static match
  };

  const wait = (ms) => new Promise(res => setTimeout(res, ms));

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setAnswer('');
    setRaw(null);

    const start = Date.now();

    // Check static answers first
    const staticAnswer = getStaticAnswer(query);
    if (staticAnswer) {
      // show "thinking" then reveal static answer
      setAnswer('Deep Thinking...');
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, THINKING_DELAY - elapsed);
      await wait(remaining);
      setAnswer(staticAnswer);
      setLoading(false);
      return;
    }

    // No static answer -> call API, but keep "thinking" visible for a small delay
    setAnswer('Deep Thanking...');
    try {
      const res = await axioss.post('/api/ai-search', { query });

      const final = res.data?.success
        ? res.data.answer
        : (res.data?.message || 'Sorry make it more easy for get right message.');

      if (res.data?.success) setRaw(res.data);

      // ensure "Thinking..." is visible at least THINKING_DELAY ms
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, THINKING_DELAY - elapsed);
      await wait(remaining);

      setAnswer(final);
    } catch (err) {
      console.error(err);
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, THINKING_DELAY - elapsed);
      await wait(remaining);
      setAnswer('Server error while searching.');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === 'Enter') handleSearch(); };

  return (
    <div className='my-20'>
        <h1 className='text-center text-4xl'>Hi ! I am AI Your Assistant </h1>
        <p className='text-center my-5'>Describe your symptoms and receive instant AI-powered <br />
            analysis with personalized proper recommendations.
             Professional  guidance at your fingertips.</p>
      <div className='flex gap-2 justify-center items-center '>
        <span> <FaRobot></FaRobot> </span> <span className='text-center text-2xl'>AI-Powered Parcel tracking Analysis</span>
      </div>

      <div style={{ maxWidth: 860, margin: '20px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
        <h3 style={{ marginBottom: 8 }}>AI Helpdesk</h3>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about parcels, users, riders, payments..."
          onKeyDown={handleKey}
          style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', marginBottom: 8 }}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className='bg-green-400 rounded-xl'
            onClick={handleSearch} disabled={loading} style={{ padding: '8px 14px' }}>
            {loading ? 'Thinking ...' : 'Search'}
          </button>
          <button
            className='bg-green-400 rounded-xl'
            onClick={() => { setQuery(''); setAnswer(''); setRaw(null); }} style={{ padding: '8px 14px' }}>
            Clear
          </button>
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, whiteSpace: 'pre-wrap', background: '#fafafa', padding: 12, borderRadius: 6, border: '1px solid #eee' }}>
            {loading ? <FaSpinner className='animate-spin' size={18} style={{ marginTop: 2 }} /> : <FaRobot size={20} color="#555" style={{ marginTop: 2 }} />}
            <span style={{ whiteSpace: 'pre-wrap' }}>
              {answer || 'Results will appear here.'}
            </span>
          </div>
        </div>

        {raw && (
          <details style={{ marginTop: 12 }}>
            <summary>Show raw response</summary>
            <pre style={{ maxHeight: 240, overflow: 'auto' }}>{JSON.stringify(raw, null, 2)}</pre>
          </details>
        )}
      </div>
    </div>
  );
}
