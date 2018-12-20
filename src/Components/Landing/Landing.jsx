import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateArticles} from '../../ducks/users';
import WhereCard from '../LandingCards/WhereCard';
import HowCard from '../LandingCards/HowCard';
import NewsCard from '../LandingCards/NewsCard';
import UserArticles from '../UsersCards/UserArticles';
import User from '../User/User';
import './Landing.css';


class Landing extends Component {
    constructor(props) {
        super(props);
        this.state={
            articles:[],
            loggedIn:props.state.loggedIn,
        }
        this.saveArticle = this.saveArticle.bind(this);
    }

    async componentDidMount(){
        //add loading indicator
       let res = await axios.get("/api/news");
            console.log(res.data);
            let newsCopy = [...res.data.items];
            this.setState({articles:newsCopy});
    }
    //finish save article function

    async saveArticle(articleId){
        //once idustry user, account for type of user
        //Switch articles to redux state
        let {articles} = this.state;
        let index = articles.findIndex(article => article.guid === articleId);
        let article = articles.splice(index,1);
        let {id} = this.props.state
        let{title,link,pubDate} = article[0];
        let res = await axios.post('/api/articles',{id,title,link,pubDate});
        this.props.updateArticles(res.data.usersArticles);
    }


    render() {
        let {articles,loggedIn} = this.state;
        let news = articles.map((article,index) =>{
            return(
                <div className='article-container' key={index} >
                    <NewsCard
                    saveArticle={this.saveArticle}
                    title={article.title}
                    content={article.contentSnippet}
                    link={article.link}
                    date={article.pubDate}
                    id={article.guid}
                    />
                </div>
            )
        })
        return (
            <div className='main-landing-container'>
             <h1 >Step In Here,  Reduce Your Footprint Out There!</h1>

             <div className='landing-how-wrapper' >
             <Link to='/how'>
                <HowCard/>
             </Link>

              </div>
             <div className='landing-where-wrapper' >
             <Link to='/where' >
                <WhereCard/>
             </Link>

             </div>
             <div className='landing-news-feed-wrapper' >
             <h1>Current Recycling News</h1>
                {news}
             </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{state}
}
export default connect(mapStateToProps,{updateArticles})(Landing);