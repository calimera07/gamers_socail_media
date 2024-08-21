import React, { Component } from 'react';
import axios from 'axios';
import './getpost.css'
import { dp} from "../../assets";


export default class GetPost extends Component {
    
    postObj = {
        _id: '',
        image:'',
        caption: '',
        userDetails:'',
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

        this.setPostVal(data);
      };

      setPostVal = (data) => {
         this.postObj = {
            _id: data._id,
            caption: data.caption,
            report: data.report,
            image:data.image
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
            posts: []
        };

        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount() {
      this.getPosts();
    }

    getPosts() {
        const headers = { 'Content-Type': 'application/json' }

        const endpoint = 'http://localhost:8800/api';

        axios.get(endpoint, { headers })
        .then(response => {
            this.setState({
                posts: response.data
            });
        })
        .catch((error) => {
            console.log(error);
        })        
    }

    deletePost(id) {
        axios.delete('http://localhost:8800/api/delete/' + id)
            .then((res) => {
                alert('Post blocked!')
                this.getPosts();
            }).catch((error) => {
                console.log(error)
           })
    }

    


    
    refreshPage() {
        window.location.reload(false);
    }


   


    render() {
        const { posts } = this.state;
        return (
            <>

                <ul className="list-group">

                <li class="list-group-item active" aria-current="true">All posts</li>

                    {posts.map((data) => (
                    
                        <li key={data._id} className="list-group-item d-flex justify-content-between align-items-start">
                              <img src={data.userDetails.image || dp } alt="profileImage" className="post__dp roundimage" />
                            <div className='name'>{data.userDetails.name}</div>
                            <div className="ms-2 me-auto">
                                <div className='cap'>
                               <div className="fw-bold">{data.caption}</div>
                               </div>
                            </div>

                            <div className="fw-bold">{data.image?.src && <img src={data.image?.src} alt="post_image" className="post__image" />}</div>
                            <div className="hi">
                            <span class="badge rounded-pill bg-danger"><div className="fw-bold">{data.report.length}</div></span>
                                </div>
                            &nbsp;
                            <button className="badge bg-danger rounded-pill" onClick={this.deletePost.bind(this, data._id)}>Block</button>
                        </li>
                    ))}
                </ul>

                      
            </>    
        )
    }

}