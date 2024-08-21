import React, { Component } from 'react';
import axios from 'axios';
import { dp} from "../../assets";

import './GetUser.css'

export default class GetUser extends Component {
    
    userObj = {
        _id: '',
        name: '',
        profileImage:'',
        report:''
    }

    state = {
        modalIsOpen: false,
        secondModalIsOpen: false
      };
    
      openModal = (data) => {
        this.setState({ 
            modalIsOpen: true 
        });

        this.setUserVal(data);
      };

      setUserVal = (data) => {
         this.userObj = {
            _id: data._id,
            name: data.name,
            profileImage:data.profileImage,
            report: data.report
        }
      }
    
      closeModal = () => {
        this.setState({ modalIsOpen: false });
      };
    
      openSecondModal = () => {
        this.setState({ secondModalIsOpen: true });
      };
    
      closeSecondModal = () => {
        this.setState({ secondModalIsOpen: false });
      };
      
      

    constructor(props) {
        super(props)

        this.state = {
            users: []
        };

        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
      this.getUsers();
    }

    getUsers() {
        const headers = { 'Content-Type': 'application/json' }

        const endpoint = 'http://localhost:8800/api/users';

        axios.get(endpoint, { headers })
        .then(response => {
            this.setState({
                users: response.data
            });
        })
        .catch((error) => {
            console.log(error);
        })        
    }

    deleteUser(id) {
        axios.delete('http://localhost:8800/api/user/delete/' + id)
            .then((res) => {
                alert('User blocked!')
                this.getUsers();
            }).catch((error) => {
                console.log(error)
           })
    }

    


    
    refreshPage() {
        window.location.reload(false);
    }


   


    render() {
        const { users } = this.state;
        return (
            <>

                <ul className="list-group">

                <li class="list-group-item active" aria-current="true">All users</li>

                    {users.map((data) => (
                    
                        <li key={data._id} className="list-group-item d-flex justify-content-between align-items-start">
                            <img src={data.profileImage || dp } alt="profileImage" className="post__dp roundimage" />
                            <div className="ms-2 me-auto">
                             <div className='name'>
                                   {data.name}</div>
                              

                            </div>
                           
                            &nbsp;
                            <button className="badge bg-danger rounded-pill" onClick={this.deleteUser.bind(this, data._id)}>Block</button>
                        </li>
                    ))}
                </ul>

                      
            </>    
        )
    }

}