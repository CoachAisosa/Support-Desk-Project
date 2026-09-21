import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createTicket, reset} from '../features/ticket/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from "../components/BackButton"



function NewTicket() {
   const {user} = useSelector((state)=>state.auth)
   const {isError, isCreateSuccess, isLoading, message} =useSelector((state)=>state.tickets)

   const [name, setName] = useState(user.name)
   const [email, setEmail] = useState(user.email)
   const [product, setProduct] = useState('iPhone')
   const [description, setDescription] = useState('')

   const navigate = useNavigate()
   const dispatch = useDispatch()

   useEffect(()=>{
      if(isError){
         toast.error(message)
      }

      if(isCreateSuccess){
         dispatch(reset())
         navigate('/tickets')
      }

      // dispatch(reset())
   }, [dispatch, isError, isCreateSuccess, message, navigate])



   const onSubmit = (e)=>{
      e.preventDefault()
      dispatch(createTicket({product, description}))
   }

   if(isLoading){
     return  <Spinner />
   }

  return (
    <>
     <BackButton url='/' />
     <section className="heading">
      <h1>Create New Ticket</h1>
      <p>Please fill the form below</p>
     </section>

     <section className="form">
      <form onSubmit={onSubmit}>

         <div className="form-group">
               <label htmlFor="name">Customer Name</label>
               <input type="text" className="form-control" id='name' value={name} disabled/>
         </div>

         <div className="form-group">
               <label htmlFor="email">Customer Email</label>
               <input type="text" className="form-control" id='email' value={email} disabled/>
         </div>

         <div className="form-group">
              <label htmlFor="product">Product </label>
               <select name="product" id="product" value={product} onChange={(e)=>setProduct(e.target.value)}>
                    <option value="iPhone">iPhone</option>
                    <option value="Macbook Pro">Macbook Pro</option>
                    <option value="HP Elitebook">HP Elitebook</option>
                    <option value="HP Probook">HP Probook</option>
               </select>
         </div>

         <div className="form-group">
            <label htmlFor="description">Please describe the issue</label>
               <textarea 
                name="description" 
                id="description" 
                className='form-control'
                placeholder='Description'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
               ></textarea>
            </div>


         <div className="form-group">
             <button className="btn btn-block">Submit</button>
         </div>

      </form>
     </section>
    </>
  )
}

export default NewTicket
