import React from 'react'
import Sentiment from 'sentiment'
import { useState } from 'react';

const SentimentApp = () => {

    const [text, setText] = useState("");
  const [result, setResult] = useState(null);
    const sentiment = new Sentiment()
  const analyzeSentiment = () => {
    const analysis = sentiment.analyze(text);
    setResult(analysis);
  };
  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Rating Sentiment Analyzer</h1>
      
      <textarea
        className="w-full p-3 border rounded mb-3"
        rows="4"
        placeholder="Write your review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={analyzeSentiment}
        className="bg-blue-600 text-black b-2 px-4 py-2 rounded"
      >
        Analyze
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <p><strong>Score:</strong> {result.score}</p>
          <p>
            Sentiment:{" "}
            {result.score > 0 ? "😊 Positive" : result.score < 0 ? "😞 Negative" : "😐 Neutral"}
          </p>
        </div>
      )}
    </div>
  )
}

export default SentimentApp