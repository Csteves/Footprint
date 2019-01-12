import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateArticles, updateLocations } from '../../ducks/users';
import UserArticles from '../UsersCards/UserArticles';
import UserLocations from '../UsersCards/UserLocations';
import './User.css'

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

     deleteLocation = async (locationId) =>{
        const {id} = this.props.state;
        console.log(this.props.state)
        console.log(id)
        let res = await axios.delete(`/api/locations${id}/?locationId=${locationId}`);
        console.log(res.data)
        this.props.updateLocations(res.data)
    }

    render() {
        let { userArticles, loggedIn,userLocations } = this.props.state;
        if(!loggedIn){return<Redirect to='/' />}
        let news = !userArticles.length ?
            <h1>You have no saved articles.</h1>
            :
            userArticles.map((article, index) => {
                return (
                    <div className='user-article-container' key={index} >
                        <UserArticles
                            deleteArticle={this.deleteArticle}
                            article={article}
                        />
                    </div>
                )
            });
        let locations = !userLocations.length ?
            <h1>You have no saved Locations.</h1>
            :
            userLocations.map((location, index) => {
                return (
                    <div className='user-article-container' key={index} >
                        <UserLocations
                            deleteLocation={this.deleteLocation}
                            location={location}
                        />
                    </div>
                )
            });
        return (
            <div className='user-main-container'>

              <div className='user-body-container'>
                <div className="user-article-container scroll-bar">
                <div className="user-sub-head">
                    <h3>NEWS ARTICLES</h3>
                </div>
                    {news}
                </div>
                <div className='user-article-container scroll-bar'>
                <div className="user-sub-head">
                    <h3>LOCATIONS</h3>
                </div>
                    {locations}
                </div>
            </div>
        </div>
        );
    }
}
function mapStateToProps(state) {
    return { state: state.users }
}
export default connect(mapStateToProps, { updateArticles,updateLocations })(User);