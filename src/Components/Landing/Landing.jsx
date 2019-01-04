import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateArticles,getNews} from '../../ducks/users';
import WhereCard from '../LandingCards/WhereCard';
import HowCard from '../LandingCards/HowCard';
import NewsCard from '../LandingCards/NewsCard';
import './Landing.css';


class Landing extends Component {
    constructor(props) {
        super(props);
        this.state={
            articles:[],
            openSnack:false,
            message:''
        }
        this.saveArticle = this.saveArticle.bind(this);
    }

    async componentDidMount(){
        await this.props.getNews();
    }

    async saveArticle(articleId){
        //once idustry user, account for type of user
        let {news} = this.props.state;
        let index = news.findIndex(article => article.guid === articleId);
        let article = news.splice(index,1);
        let {id} = this.props.state
        let{title,link,pubDate} = article[0];
        let res = await axios.post('/api/articles',{id,title,link,pubDate});
        console.log(res.data)
        this.openSnackBar(res.data.message)
        this.setState(state =>({...state,message:res.data.message}))
        this.props.updateArticles(res.data.usersArticles);
    }
    openSnackBar(message){
        if(message === 'Save Sucessful'){
            console.log('yooooo')
            this.setState({openSnack:true})
        }
    }
    handleClose = () => {
        this.setState({ openSnack: false });
        };
    render() {
        let {news,loading} = this.props.state;
        let articles = news.map((article,index) =>{
            return(
                <div className='article-container' key={index} >
                    <NewsCard
                    saveArticle={this.saveArticle}
                    title={article.title}
                    content={article.contentSnippet}
                    link={article.link}
                    date={article.pubDate}
                    id={article.guid}
                    message={this.state.message}
                    open={this.state.openSnack}
                    close={this.handleClose}

                    />
                </div>
            )
        })
        let gotNews = loading ? <h1>loading</h1>:articles;
        return (
            <div className='main-landing-container'>
            <div className="landing-head-wrapper" >
                <h1 >Step In Here,  Reduce Your Footprint Out There!</h1>
            </div>


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
             <div className='news-feed-title-wrapper'>
             <h1>Current Recycling News</h1>
             </div>
                {gotNews}
             </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{ state:state.users}
}
export default connect(mapStateToProps,{updateArticles,getNews})(Landing);