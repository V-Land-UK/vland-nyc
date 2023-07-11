/* eslint-disable @next/next/no-img-element */
import {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  Fragment,
} from "react";
import Layout from "../defaults/Layout";
import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/Pagination";
import { GlobalContext } from "../context/GlobalContext";
import { API } from "../config/api";
import { PAGINATION_LIMIT } from "../config/meta";
import Ads from "../components/Ads";
import { min } from "moment";
import Preloader from "../components/Preloader";
import { data } from "autoprefixer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import NewsLetterPrompt from "../components/NewsLetterPrompt";
import axios from "axios";
import { getCookie } from "../lib/utils";

const qs = require("qs");

export default function Home({ articles, meta, ads }) {
  const page = useRef(meta.pagination.page);
  const scrollY = useRef(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showNLPrompt, setShowNLPrompt] = useState(false);
  const [userKnown, setUserKnown] = useState(false);
  const [hasMore, setHasMore] = useState(
    meta.pagination.pageCount > meta.pagination.page
  );
  const [queriesSent, setQueriesSent] = useState(0);
  
  const ref = useRef();
  
  
  useEffect(()=>{
    if(document){
      setUserKnown(getCookie("user-type") ? true:false);
    }
  },[])

  useEffect(()=>{
    const handleScroll = ()=>{

      if(scrollY.current < 400){
        
        scrollY.current = window.scrollY;
      }
      else{
        
        setShowNLPrompt(true);
       
      }
    }
    window.addEventListener("scroll", handleScroll, {passive:true})
    return ()=> window.removeEventListener("scroll",handleScroll);
  }, [])
  const handleClick = useCallback(async () => {
    if (loading || error) return;

    page.current += 1;
    const filters = qs.stringify(
      {
        populate: "*",
        pagination: {
          page: page.current,
          pageSize: PAGINATION_LIMIT,
        },
        sort: ["PublishDate:desc"],
      },
      { encodeValuesOnly: true }
    );
    setLoading(true);

    const fetchedArticles = await axios
      .get(`${API}/articles?${filters}`)
      .then((data) => {
        return data?.data;
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        return null;
      });

    if (fetchedArticles) {
      setHasMore(meta.pagination.pageCount > page.current);
      articles.push(...fetchedArticles.data);
      setQueriesSent((prev) => prev + 1);
      setLoading(false);
    }
  });

  useEffect(() => {
    if (!hasMore) {
      ref?.current?.classList.remove("hasMore");
    }
  }, [queriesSent]);

  //ads should be placed in specific places rather than every 15; some info needed in the api
  //to tell us sizing/position ?

  //random

  //let adIndex = 0;
  const articlesBeforeAd = 5;
  //let articlesBeforeAd = Math.floor(Math.random()*(articles.length - 10) + 10);

  const checkAds = (index) => {
    /*if(ads[adIndex] && (index + 1) % articlesBeforeAd === 0){
      
      articlesBeforeAd = Math.floor(Math.random()*(articles.length - (articlesBeforeAd + 5) )+ (articlesBeforeAd + 5));
      adIndex +=  1;
      return true;
    }
    else{
      return false;
    }*/

    if (ads[(index + 1) / articlesBeforeAd - 1] !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  // grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[10px] lg:gap-5 lg:gap-y-6
  const getAdsIndex = (index) => {
    //return adIndex - 1;
    return (index + 1) / articlesBeforeAd - 1;
  };

  return (
    <Layout>
      {articles.length > 0 ? (
        <>
          {/* <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[10px] lg:gap-5 lg:gap-y-6 "> */}
          <div className="cardList_ctnr relative hasMore" ref={ref}>
            {articles?.map((article, index) => (
              <Fragment key={index}>
                <ArticleCard article={article} index={index} />
                {/* Show Ads */}
                {ads.length > 0 &&
                  checkAds(index) &&
                  ads[getAdsIndex(index)].attributes.homeView && (
                    <Ads ad={ads[getAdsIndex(index)]} />
                  )}
              </Fragment>
            ))}
          </div>
          {hasMore && (
            <div className="block w-[100%] h-[8rem] text-center bg-gradient-to-t from-white">
              <button
                aria-label="load more articles"
                className={`hv-toggle inline-block w-[12rem] h-[4rem] mt-[2rem] text-primary bg-transparent border-4 border-primary cursor-pointer rounded-md text-lg ${
                  error ? "err_view" : ""
                }`}
                onClick={()=>{handleClick();}}
              >
                {loading ? (
                  <Preloader />
                ) : error ? (
                  <div className="inline-block align-left">
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="inline-block text-white w-[1rem] mr-[.6rem]"
                    />
                    <p className="inline-block text-white">Error</p>
                  </div>
                ) : (
                  "Read More"
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="py-[10vh] lg:py-[15vh] text-center text-primary text-3xl lg:text-4xl font-semibold px-6">
          No Articles Yet.
        </div>
      )}
      {showNLPrompt && (userKnown || <NewsLetterPrompt/>)}
      
      
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
