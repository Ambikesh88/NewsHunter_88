import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);

    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsHunter`;
        updateNews(); 
    }, [])
 

    // const handlePrevClick = async () => {
    //     setPage(page-1)
    //     updateNews();
    // }

    // const handleNextClick = async () => { 
    //     setPage(page+1)
    //     updateNews()
    // }

    const fetchMoreData = async () => {   
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1) 
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };
 
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px' ,marginTop:'90px' }}>NewsHunter - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>

            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News




















// import React,{useEffect,useState} from 'react'
// import NewsItem from './NewsItem'
// import Spinner from './Spinner';
// import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";

// const News=(props)=>  {
//    const [articles,setArticles]=useState([]);
//    const [loading,setLoading]=useState(true);
//    const [page,setPage]=useState(1);
//    const [totalResults,setTotalResults]=useState(0);


//      News.defaultProps = {
//         country: 'in',
//         pageSize: 8,
//         category: 'general',
//     }

//      News.propTypes = {
//         country: PropTypes.string,
//         pageSize: PropTypes.number,
//         category: PropTypes.string,
//     }
//     const capitalizeFirstLetter = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }
//     document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
//     // constructor(props) {
//     //     super(props);
//     //     // this.state = {
//     //     //     articles: [],
//     //     //     loading: true,
//     //     //     page: 1,
//     //     //     totalResults: 0
//     //     // }
//     // }

//     const updateNews=async()=> {
//       props.setProgress(10);
//         const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
//         //  this.setState({ loading: true });
//          setLoading(true)
//         let data = await fetch(url);
//         props.setProgress(30);
//         let parsedData = await data.json()
//         props.setProgress(70);
//         setArticles(parsedData.articles)
//         setTotalResults(parsedData.totalResults)
//         setLoading(false)
//         props.setProgress(100);
//         // this.setState({
//         //     articles: parsedData.articles,
//         //     totalResults: parsedData.totalResults,
//         //     loading: false, 
//         // })

//     }
//     useEffect(()=>{
//       this.updateNews();
//     },[])

//     // async componentDidMount() {
//     //     this.updateNews();
//     // }

//    const handlePrevClick = async () => {
//         setPage(page+1);
//         updateNews();
//     }

//     const handleNextClick = async () => {
//         setPage(page-1);
//         updateNews()
//     }

//     const fetchMoreData = async () => {  
//        await setPage(page+1);
//         const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pageSize=${props.pageSize}`;
//         let data = await fetch(url);
//         let parsedData = await data.json()
//         setArticles(articles.concat(parsedData.articles))
//         setTotalResults( parsedData.totalResults)
//         // this.setState({
//         //     articles: this.state.articles.concat(parsedData.articles),
//         //     totalResults: parsedData.totalResults
//         // })
//       };

    
//         return (
//             <>
//                 <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
//                 {loading && <Spinner />}
//                 <InfiniteScroll
//                     dataLength={articles.length}
//                     next={fetchMoreData}
//                     hasMore={articles.length !== totalResults}
//                     loader={<Spinner/>}
//                 > 
//                     <div className="container">
                         
//                     <div className="row">
//                         {articles.map((element,index) => {
//                             return <div className="col-md-4" key={index}>
//                                 <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
//                             </div>
//                         })}
//                     </div>
//                     </div> 
//                 </InfiniteScroll>

//             </>
//         )
    
// }

// export default News
























// import React, { Component } from 'react'
// import Newsitem from '../Newsitem'
// import Spinner from './Spinner';
// import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component" ;

// export class News extends Component {
  
//    static defaultProps={
//      country:'in',
//      pageSize:5,
//      category:'general'
//    }
//    static propTypes ={
//      country:PropTypes.string,
//      pageSize:PropTypes.number,
//      category:PropTypes.string


//    }
//    capitalizeFirstLetter=(string)=>{
//      return string.charAt(0).toUpperCase()+string.slice(1);
//    }
//   constructor(props){
//     super(props);
//     // console.log("Hello I am a constructor from news component");
//     this.state={
//       articles:[],
//       loading:false,
//       page:1,
//       totalResults:0
//     }
//     document.title=`${this.capitalizeFirstLetter(props.category)} - NewsMonkey`
//   }
//   async updateNews(pageNo){
//     const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey={props.apiKey} &page=${this.state.page }&pageSize=${props.pageSize}`;
//     this.setState({loading:true});
//     let data=await fetch(url);
//     let parsedData= await data.json(); 
//     console.log(parsedData);
//     this.setState({articles:parsedData.articles ,
//        totalResults:parsedData.totalResults,
//        loading:true
//       })
//   }
//   async componentDidMount(){
//     // console.log("cdm");
//     // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey={props.apiKey} &page=1&pageSize=${props.pageSize}`;
//     // this.setState({loading:true});
//     // let data=await fetch(url);
//     // let parsedData= await data.json();
//     // console.log(parsedData);
//     // this.setState({articles:parsedData.articles ,
//     //    totalResults:parsedData.totalResults,
//     //    loading:false
//     //   })
//      this.updateNews();
//   }
//   handlePrevClick=async()=>{
//     console.log("previous");
//   //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey={props.apiKey} &page=${this.state.page -1}&pageSize=${props.pageSize}`;
//   //   this.setState({loading:true}); //for spinner
//   //   let data=await fetch(url);
//   //   let parsedData= await data.json();
//   //   console.log(parsedData);
//   //   console.log("next");
//   //   this.setState({
//   //     page:this.state.page -1,
//   //     articles:parsedData.articles,
//   //     loading:false
//   // })
  
//     await this.setState({page:this.state.page - 1});
//   this.updateNews();

// }

//   handleNextclick=async()=>{
//     // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize))){
//     // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey={props.apiKey} &page=${this.state.page +1}&pageSize=${props.pageSize}`;
//     // this.setState({loading:true});
//     // let data=await fetch(url);
//     // let parsedData= await data.json();
//     // console.log(parsedData);
//     // console.log("next");
//     // this.setState({
//     //   page:this.state.page +1,
//     //   articles:parsedData.articles,
//     //   loading:false


//     // })
//     console.log("next");
//     await this.setState({page:this.state.page +1})
//     this.updateNews();
//   }
  
//   fetchMoreData=async()=>{
//     await this.setState({page:this.setState.page + 1})
//     const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey={props.apiKey} &page=${this.state.page  }&pageSize=${props.pageSize}`;
//      this.setState({loading:true});
//     let data=await fetch(url);
//     let parsedData= await data.json();
//     console.log(parsedData);
//     this.setState({
//       articles:this.state.articles.concat(parsedData.articles) ,
//        totalResults:parsedData.totalResults,
//        loading:false
//       })
    
//   }



  

//   render() {
//     return (
//       <>
//         <h1 className='text-center' style={{margin:'35px 0px'}}>NewsMonkey -Top  {this.capitalizeFirstLetter(props.category)} Headlines </h1>
//        {/* {this.state.loading && <Spinner/>} */}
//        <InfiniteScroll
//           dataLength={this.state.articles.length}
//           next={this.fetchMoreData}
//           hasMore={this.state.articles.length!==this.state.totalResults}
//           loader={<Spinner/>}
//           >
        
    
//         <div className="container">
//         <div className='row'>
//           {this.state.articles.map((element,index)=>{
//           return <div className="col-md-4" key={index}>
//           <Newsitem title={element.title}  description={element.description} imageUrl={element.urlToImage} newsurl={element.url}  author={element.author} date={element.publishedAt} source={element.source.name} />
//           </div>
//           })}

//           {/* <div className="col-md-4">
//           <Newsitem title="mytitle" description="mydesc" />
//           </div>
//           <div className="col-md-4">
//           <Newsitem title="mytitle" description="mydesc" />
//           </div>   */}
//           {/*  for slicing =>   element.title?element.title.slice(0,45):"" */}
//       </div>
//       {/* <div className="container d-flex justify-content-between" >
//       <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
//       <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>

//       </div> */}
//       </div>
//       </InfiniteScroll>
//       </>
//     )
//   }
// }

// export default News