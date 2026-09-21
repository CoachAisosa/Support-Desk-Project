import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getTicket, reset, closeTicket} from '../features/ticket/ticketSlice'
import { getNotes, createNote, reset as noteReset } from '../features/note/noteSlice'
import Spinner from '../components/Spinner'
import { BackButton } from '../components/BackButton'
import NoteItem  from '../components/NoteItem'
import { FaPlus } from 'react-icons/fa'
import Modal from 'react-modal'


const customStyle = {
    content: {
        width: 'calc(100% - 30px)',
        maxWidth: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

Modal.setAppElement('#root')

const Ticket = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [noteText, setNoteText] = useState('')

    const {ticket, isLoading, isSuccess, isError, message } = useSelector((state)=>state.tickets)
    const {notes, isLoading: notesIsLoading}  = useSelector((state)=>state.notes)

const params = useParams()
const dispatch = useDispatch()
const navigate = useNavigate()

const {ticketId} = useParams()

useEffect(()=>{
    if(isError){
        toast.error(message)
    }

    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
}, [isError, message, ticketId, dispatch])

// Close ticket
const onTicketClose = ()=>{
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
}

if(isLoading || notesIsLoading) {
    return <Spinner />
}

if(isError) {
    return <h3>Something Went Wrong</h3>
}


// open and close modal
const openModal = ()=> setIsModalOpen(true)
const closeModal = ()=> setIsModalOpen(false)

//submit note function
const onNoteSubmit = (e) => {
    e.preventDefault()
   dispatch(createNote({noteText, ticketId}))
    closeModal()
    setNoteText('')
}

  return (
  <div className="ticket-page">
      <header className="ticket-header">
          <BackButton url='/tickets' />
          <h2>
              TicketID: {ticket._id}
              <span className={`status status-${ticket.status}`}>{ticket.status}</span>
          </h2>
          <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
          <h3>Product: {ticket.product}</h3>

          <hr />
          <div className="ticket-desc">
              <h3>Description of Issue</h3>
              <p>{ticket.description}</p>
          </div>

          <h2>Notes</h2>
      </header>
   
    {ticket.status !== 'closed' && (
      <button onClick={openModal} className="btn">
        <FaPlus />
        Add Note
      </button>
    )}

    <Modal 
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyle}
        contentLabel='Add Note'
    >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>X</button>

        <form onSubmit={onNoteSubmit}>
            <div className="form-group">
                <textarea 
                name="NoteText" 
                id="NoteText" 
                className='form-control'
                placeholder='Note Text'
                value={noteText}
                onChange={(e)=>setNoteText(e.target.value)}
                ></textarea>
            </div>

            <div className="form-group">
                <button className='btn' type='submit'>Submit</button>
            </div>

        </form>
        
    </Modal>



      {notes.map((note)=>(
    <NoteItem key={note._id} note={note}/>
       ))}


      {ticket.status !== 'closed' && (
          <button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>
      )}
      
  </div>
  )
  
}
export default Ticket
