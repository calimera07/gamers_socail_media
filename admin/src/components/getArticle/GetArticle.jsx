import React, { Component } from 'react';
import { dp} from "../../assets";

import axios from 'axios';

import './getarticle.css'
export default class GetArticle extends Component {
    
    articleObj = {
        _id: '',
        caption: '',
        image:'',
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

        this.setArticleVal(data);
      };

      setArticleVal = (data) => {
         this.articleObj = {
            _id: data._id,
            caption: data.caption,
            image:data.image,
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
            articles: []
        };

        this.deleteArticle = this.deleteArticle.bind(this);
    }

    componentDidMount() {
      this.getArticles();
    }

    getArticles() {
        const headers = { 'Content-Type': 'application/json' }

        const endpoint = 'http://localhost:8800/api/article';

        axios.get(endpoint, { headers })
        .then(response => {
            this.setState({
                articles: response.data
            });
        })
        .catch((error) => {
            console.log(error);
        })        
    }

    deleteArticle(id) {
        axios.delete('http://localhost:8800/api/article/delete/' + id)
            .then((res) => {
                alert('Article blocked!')
                this.getArticles();
            }).catch((error) => {
                console.log(error)
           })
    }

    


    
    refreshPage() {
        window.location.reload(false);
    }


   


    render() {
        const { articles } = this.state;
        return (
            <>
                   
                <ul className="list-group mt-3">
                <li class="list-group-item active" aria-current="true">All items</li>

                    {articles.map((data) => (
                    
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
                            <button className="badge bg-danger rounded-pill" onClick={this.deleteArticle.bind(this, data._id)}>Block</button>
                        </li>
                    ))}
                </ul>

                      
            </>    
        )
    }

}