import React, { Component } from 'react';
import UserArticles from '../UsersCards/UserArticles';
import {connect} from 'react-redux';
import axios from 'axios';

class User extends Component {
    constructor(props) {
        super(props);

    }

    async deleteArticle(articleId){
        console.log(this.props);
        // let {userArticles} = this.props;
        // let index = userArticles.findIndex(article => article.guid === articleId);
        // let article = userArticles.splice(index,1);
        // let {id} = this.props.state;
        // let{title} = article[0];
        // let res = axios.delete(`/api/articles${id}/?title=${title}`);
        // console.log(res.data)
    }
    render() {
        console.log(this.props.state)
        let {userArticles} = this.props.state;
        let news = userArticles.map((article,index) => {
            return(
                <div className='article-container' key={index} >
                <UserArticles
                deleteArticle={this.deleteArticle}
                title={article.title}
                link={article.link}
                date={article.pubDate}
                id={article.guid}
                />
            </div>
            )
        })
        return (
            <div>
                <h1> im a user</h1>
                {news}
            </div>
        );
    }
}
function mapStateToProps(state){
    return{state}
}
export default connect(mapStateToProps)(User);