import { useState, useEffect } from 'react'
import { format, subDays, addDays, parseISO } from 'date-fns'
import { fetchEventsByDate } from './services/sportsApi'
import './App.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [attendedEvents, setAttendedEvents] = useState([])
  const [error, setError] = useState(null)

  // Load attended events from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('attendedEvents')
    if (saved) {
      setAttendedEvents(JSON.parse(saved))
    }
  }, [])

  // Save attended events to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('attendedEvents', JSON.stringify(attendedEvents))
  }, [attendedEvents])

  const fetchEvents = async (date) => {
    setLoading(true)
    setError(null)
    
    try {
      // Using the sports API service with mock data for demonstration
      const eventsData = await fetchEventsByDate(date, 'mock')
      setEvents(eventsData)
    } catch (err) {
      console.error('Error fetching events:', err)
      setError('Failed to fetch events. Please try again.')
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents(selectedDate)
  }, [selectedDate])

  const handleDateChange = (direction) => {
    if (direction === 'prev') {
      setSelectedDate(prev => subDays(prev, 1))
    } else {
      setSelectedDate(prev => addDays(prev, 1))
    }
  }

  const markAsAttended = (event) => {
    const attendedEvent = {
      ...event,
      attendedDate: new Date().toISOString(),
      loggedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    }
    
    setAttendedEvents(prev => {
      const filtered = prev.filter(e => e.id !== event.id)
      return [...filtered, attendedEvent]
    })
  }

  const removeFromAttended = (eventId) => {
    setAttendedEvents(prev => prev.filter(e => e.id !== eventId))
  }

  const isEventAttended = (eventId) => {
    return attendedEvents.some(e => e.id === eventId)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🏟️ Pass Sport</h1>
        <p>Record and log the sporting events you attend</p>
      </header>

      <main className="main">
        <section className="date-selector">
          <button onClick={() => handleDateChange('prev')} className="date-btn">
            ← Previous
          </button>
          <div className="current-date">
            <h2>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h2>
          </div>
          <button onClick={() => handleDateChange('next')} className="date-btn">
            Next →
          </button>
        </section>

        <section className="events-section">
          <h3>Events on {format(selectedDate, 'MMM d, yyyy')}</h3>
          
          {loading && <div className="loading">Loading events...</div>}
          {error && <div className="error">{error}</div>}
          
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className={`event-card ${isEventAttended(event.id) ? 'attended' : ''}`}>
                <div className="event-header">
                  <span className="sport-badge">{event.sport}</span>
                  <span className="league">{event.league}</span>
                </div>
                
                <h4 className="event-title">{event.title}</h4>
                
                <div className="event-details">
                  <p><strong>Time:</strong> {event.time}</p>
                  <p><strong>Venue:</strong> {event.venue}</p>
                  <p><strong>Teams:</strong> {event.homeTeam} vs {event.awayTeam}</p>
                </div>
                
                <div className="event-actions">
                  {isEventAttended(event.id) ? (
                    <button 
                      onClick={() => removeFromAttended(event.id)}
                      className="btn btn-secondary"
                    >
                      Remove from Log
                    </button>
                  ) : (
                    <button 
                      onClick={() => markAsAttended(event)}
                      className="btn btn-primary"
                    >
                      Mark as Attended
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {events.length === 0 && !loading && (
            <div className="no-events">
              <p>No events found for this date.</p>
            </div>
          )}
        </section>

        <section className="attended-section">
          <h3>Your Event Log ({attendedEvents.length})</h3>
          
          {attendedEvents.length === 0 ? (
            <div className="no-attended">
              <p>You haven't logged any events yet. Mark events as attended to see them here!</p>
            </div>
          ) : (
            <div className="attended-events">
              {attendedEvents.map(event => (
                <div key={`${event.id}-${event.attendedDate}`} className="attended-event">
                  <div className="attended-event-header">
                    <span className="sport-badge">{event.sport}</span>
                    <span className="logged-date">{format(parseISO(event.loggedDate), 'MMM d, yyyy')}</span>
                  </div>
                  
                  <h4>{event.title}</h4>
                  <p className="event-summary">
                    {event.league} • {event.venue} • {event.time}
                  </p>
                  
                  <button 
                    onClick={() => removeFromAttended(event.id)}
                    className="btn btn-small"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
