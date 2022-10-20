import { useState, useEffect } from 'react'
import { getQuotes } from './api/quotes'

type Quote = { text: string; author: string }

type ApiResponse = Quote[] | []

function App() {
  const [loading, setLoading] = useState(true)
  const [quotes, setQuotes] = useState<ApiResponse>([])
  const [quote, setQuote] = useState<Quote | null>()

  useEffect(() => {
    getQuotes({ setQuotes, setLoading })
  }, [])

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [quotes])

  const selectNewQuote = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }

  const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.text} - ${
      quote.author ? quote.author : 'Unknown'
    }`
    window.open(twitterUrl, '_blank')
  }

  if (loading || !quote) {
    return <div className="loader" id="loader"></div>
  }

  return (
    <div className="quote-container" id="quote-container">
      <div className="quote-text">
        <i className="fas fa-quote-left"></i>
        <span id="quote">{quote.text}</span>
      </div>
      <div className="quote-author">
        <span id="author">{quote.author ? quote.author : 'Unknown'}</span>
      </div>
      <div className="button-container">
        <button
          className="twitter-button"
          id="twitter"
          title="Tweet This!"
          onClick={() => tweetQuote()}
        >
          <i className="fab fa-twitter"></i>
        </button>
        <button id="new-quote" onClick={() => selectNewQuote()}>
          New Quote
        </button>
      </div>
    </div>
  )
}

export default App
