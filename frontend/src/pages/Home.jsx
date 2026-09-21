import {Link} from 'react-router-dom'
import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa'

function Home() {
  return (
   <>
    <div className="heading">
      <h1>
        <FaQuestionCircle/> What help do you need?
      </h1>

      <p>
          please choose from the option below
      </p>
    </div>

    <Link to='/new-ticket' className="btn btn-reverse btn-block" >
      <FaQuestionCircle/> Create New Ticket
    </Link>

     <Link to='/tickets' className="btn btn-reverse btn-block">
       <FaTicketAlt/> View My Ticket
    </Link>
   </>
  )
}

export default Home
