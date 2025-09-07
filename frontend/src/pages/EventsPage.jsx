import React from 'react'
import Header from '../components/Header'
import EventCard from '../components/EventCard'

const EventsPage = () => {
  return (
    <div>
        <Header activeHeading={4}/>
        <EventCard active={true}/> 
    </div>
  )
}

export default EventsPage