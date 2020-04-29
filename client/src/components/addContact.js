import React, { Component } from 'react'
import Modal from "react-modal";
import axios from 'axios'
Modal.setAppElement("#root");


class AddModal extends Component {
  
    
  state = {
      modalIsOpen: false,

        name: "",
        tel: "",
        mail: "",
    

    };
   
    componentDidMount() {
      this.props.el &&
        this.setState({
          name: this.props.el.name,
          mail: this.props.el.mail,
          tel: this.props.el.tel,
          id: this.props.el._id,
        });
    }


addEditContact=()=>{
  if (Object.values(this.state).indexOf("") === -1) {
    this.props.el? 
    axios.put(`/modify/${this.props.el._id}`,{
      name:this.state.name,
      mail:this.state.mail,
      tel:this.state.tel
    }).then(this.props.getallcontacts)
    :
    this.AddNewContact()
  
}else alert("Wrong : One or more Inputs are empty !")
}

AddNewContact=()=>{
  this.props.addcontact(this.state);
  this.setState({
      name:"",
      mail:"",
      tel:""
  })
}
    openModal = () => this.setState({ modalIsOpen: true });
    closeModal = () => this.setState({ modalIsOpen: false });
   



    handleAdd = e =>
      this.setState({
        [e.target.name]: e.target.value 
    });
    
   
    render() {
 
      return (
        <div>
          <button className="addbut"  onClick={this.openModal}>{this.props.el?  "Update": "Add New Contact" }</button>
          <Modal
            className="add-modal"
            isOpen={this.state.modalIsOpen}
          >

            
            <h2>{this.props.el?  "Edit Contact": "Add New Contact" }</h2>
              <label>Name</label>
              <input
               onChange={this.handleAdd} 
               type="text"
                name="name" 
                value={this.state.name}
                />
              <label>Mail</label>
              <input
                onChange={this.handleAdd}
                type="email"
                name="mail"
                value={this.state.mail}
              />
              <label>Phone</label>
              <input 
              onChange={this.handleAdd} 
              type="number"
               name="tel" 
               value={this.state.tel} />
              <div className="form-btn-container">
                <button className="btn btn-modal" onClick={()=>{this.addEditContact();this.closeModal()}}>{this.props.el?  "Update": "Add" }</button>
                <button className="btn btn-modal" onClick={this.closeModal}>
                  Close
                </button>
              </div>
  
          </Modal>
        </div>
      );
    }
  }

  export default AddModal;
