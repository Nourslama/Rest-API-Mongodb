
import React, { Component } from 'react'
import AddContact from './addContact'

export class cards extends Component {
state={
  show:false
}



    render() {
        return (
<>
<div class="container">
      <div class="our-team">
          
        <div class="picture">{this.props.person.name[0].toUpperCase()} </div>  
        <div class="team-content">
          <h3 class="name">{this.props.person.name}</h3>
          <h4 class="title">{this.props.person.mail}</h4>
        <h4 class="title">{this.props.person.tel}</h4>
        </div>
        <div class="social">
          
         <AddContact  el={this.props.person} editcont={this.props.editcontact}/> 
           <button onClick={()=>window.confirm(`Are you sure you wish to delete ${this.props.person.name}?`)&&this.props.deletecontact(this.props.person._id)}>DELETE</button>
        </div>
      </div>
    </div>
        
  </>  
)}
}
export default cards

