import React, { Component } from 'react'
import './App.css';
import Cards from"./components/cards";
import axios from 'axios';
import AddContact from './components/addContact'
export class App extends Component {
state={
  contact:[]
}



//lors du lancement de la  page web afficher tout les contacts 
componentDidMount(){
  this.getallcontacts()
}



getallcontacts=()=>
axios.get('/contacts').then((res)=>{
 this.setState({
contact:res.data

  })
})


postcontact=(newcontact)=>
axios.post('/add_contact',newcontact).then(this.getallcontacts())

deletecontact=(id)=>
axios.delete( `/delete/${id}`).then(this.getallcontacts())

// editcontact=(contact)=>
// axios.put( `/modify/${contact._id}`,{
//   name:contact.name,
//   mail:contact.mail,
//   tel:contact.tel
// }).then(this.getallcontacts())


  render() {
    return (
      <div>
        <h1>Contact List</h1>
        <AddContact  addcontact={this.postcontact} getallcontacts={this.getallcontacts()} />
        <div className="name">
        {this.state.contact.map((el,i)=> <Cards key={i} person={el} deletecontact={this.deletecontact} editcontact={this.editcontact} />)}
       </div>
       
      </div>
    )
  }
}

export default App


