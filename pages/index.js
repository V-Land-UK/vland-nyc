/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState, useRef, useCallback, Fragment } from "react";
import Layout from "../defaults/Layout";
import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/Pagination";
import { GlobalContext } from "../context/GlobalContext";
import { API } from "../config/api";
import { PAGINATION_LIMIT } from "../config/meta";
import Ads from "../components/Ads";
import { min } from "moment";
import useFetch from "../hooks/useFetch.js";
import Preloader from "../components/Preloader";
import { data } from "autoprefixer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const qs = require("qs");

export default function Home({ articles, meta, ads }) {
  
  

  const [page,setPage] = useState(meta.pagination.page + 1);
  
  const {loading,Articles,error, hasMore,queriesSent} = useFetch(page);
  
  const ref = useRef();
  


  
  const handleObserver = useCallback((node)=>{
    if(loading)return;
    
    setPage(prev => prev + 1);
    

    
    
    


  });



  useEffect(()=>{
    
    
    if(hasMore){
      ref.current.style.maxHeight  = `${ref.current.clientHeight*(page)}px`;
    }
    else{
      ref.current.removeAttribute("maxHeight");
      ref.current.classList.remove("cardGrid__list");
    }
    
    Articles.length && articles.push(...Articles);
    
    



  }, [queriesSent])

  

 

  

  const articlesBeforeAd = 15;

  const checkAds = (index) => {
    if (ads[(index + 1) / articlesBeforeAd - 1] !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  // grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[10px] lg:gap-5 lg:gap-y-6
  const getAdsIndex = (index) => {
    return (index + 1) / articlesBeforeAd - 1;
  };

  return (
    <Layout>
      {articles.length > 0 ? (
        <>
          
          {/* <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[10px] lg:gap-5 lg:gap-y-6 "> */}
          <div className="cardList_ctnr relative" ref={ref}>
            {articles?.map((article, index) => (
            
                  <Fragment key={index}>
                    <ArticleCard article={article} index={index}/>
                    {/* Show Ads */}
                    {ads.length > 0 && checkAds(index) && (
                      <Ads ad={ads[getAdsIndex(index)]} />
                    )}
                  </Fragment>
            ))}
        
            
            
          </div>
          {hasMore && (
            <div className="block w-[100%] h-[8rem] text-center bg-gradient-to-t from-white">
                <button aria-label="load more articles" className={`hv-toggle inline-block w-[12rem] h-[4rem] mt-[2rem] text-primary bg-transparent border-4 border-primary cursor-pointer rounded-md text-lg ${error ? "err_view": ""}`} onClick={handleObserver}>{loading ? 
                (
                  <Preloader />
                ): error ? (
                  <div className="inline-block align-left">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="inline-block text-white w-[1rem] mr-[.6rem]"/>
                    <p className="inline-block text-white">Error</p>
                  </div>
                ) : "Read More"}</button>
            </div>
          )}
        
          
          
          
        </>

        
      ) : (
        <div className="py-[10vh] lg:py-[15vh] text-center text-primary text-3xl lg:text-4xl font-semibold px-6">
          No Articles Yet.
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req, res, query }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=15, stale-while-revalidate=59"
  );

  const { page } = query;

  //Get data for articles
  const filters = qs.stringify(
    {
      populate: "*",
      pagination: {
        pageSize: PAGINATION_LIMIT,
        page: page || "1",
      },
      sort: ["PublishDate:desc"],
    },
    { encodeValuesOnly: true }
  );

  const response = await fetch(`${API}/articles?${filters}`);

  const data = await response.json();

  // get ads
  const adsResponse = await fetch(`${API}/ads?populate=*`);
  const ads = await adsResponse?.json();

  //Only show past and current posts
  const visible_articles = data?.data?.filter((article) => {
    const publishedDate = new Date(article?.attributes?.PublishDate);
    const currentDate = new Date();

    return publishedDate <= currentDate;
  });

  //Sort articles by published date
  const sorted_articles = visible_articles?.sort((a, b) => {
    const dateA = new Date(a?.attributes?.PublishDate);
    const dateB = new Date(b?.attributes?.PublishDate);
    return dateB - dateA;
  });

  return {
    props: {
      articles: sorted_articles,
      meta: data?.meta,
      ads: ads?.data,
    },
  };
}
