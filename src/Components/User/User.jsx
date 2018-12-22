import React, { Component } from 'react';
import UserArticles from '../UsersCards/UserArticles';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateArticles } from '../../ducks/users';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.deleteArticle = this.deleteArticle.bind(this);
    }

    async deleteArticle(articleId) {
        let { userArticles } = this.props.state;
        let index = userArticles.findIndex(article => article.id === articleId);
        let article = userArticles.splice(index, 1);
        let { id } = this.props.state;
        let article_id = article[0].id;
        let res = await axios.delete(`/api/articles${id}/?article_id=${article_id}`);

        this.props.updateArticles(res.data);
    }
    render() {
        let { userArticles, loggedIn } = this.props.state;
        if(!loggedIn){return<Redirect to='/' />}
        let news = !userArticles.length ?
            <h1>You have no saved articles.</h1>
            :
            userArticles.map((article, index) => {
                return (
                    <div className='article-container' key={index} >
                        <UserArticles
                            deleteArticle={this.deleteArticle}
                            title={article.title}
                            link={article.link}
                            date={article.pubDate}
                            id={article.id}
                        />
                    </div>
                )
            });
        return (
            <div>
                <h1> im a user</h1>
                {news}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return { state: state.users }
}
export default connect(mapStateToProps, { updateArticles })(User);