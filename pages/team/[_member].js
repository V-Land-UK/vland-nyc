import axios from "axios";
import request from "../../utils/request.util";
import { API, BASE_URL, SITE_URL } from "../../config/api";
import { GlobalContext } from "../../context/GlobalContext";
import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Back from "../../components/Back";
import Layout from "../../defaults/Layout";
import Recommendation from "../../components/Recommendation";
import AnimatedLink from "../../components/AnimatedLink";
import Icon from "../../components/Icon";
import Carousel from "../../components/Carousel";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const parse = require("html-react-parser");

const qs = require("qs");
const Member = ({member,categories}) =>{
    const twitter = "https://twitter.com";
    const instagram = "https://instagram.com";
    const facebook = "https://facebook.com";
    const linkedin = "https://www.linkedin.com/in";
    const [mobileView, setMobileView] = useState(false);
 
    const isAuthor = categories?.length > 0;
   
    useEffect(() => {
        if (window.screen.availWidth < 500) {
          setMobileView(true);
        } else {
          setMobileView(false);
        }
    }, [mobileView]);

    return (
        <Layout
          title="Meet The Team"
          desc="The V-Land UK team are a bunch of like-minded vegan writers, bloggers, influencers, designers etc who are dedicated to bringing you the best vegan content from around the UK"
        >
          <Back />
          <main className="mt-4">
            
    
            {mobileView ? (
              <section className="grid grid-cols-1  gap-y-14  mt-10">
                {member &&
                 
                    <motion.div
                      
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="w-full flex flex-col gap-2 bg-white rounded-xl drop-shadow-md"
                    >
                      <div className="flex items-center space-x-10 px-3 lg:px-7 py-5 ">
                        <div className="w-[50%] ">
                          <img
                            src={`${
                              
                              member?.attributes?.image?.data?.attributes?.formats
                                ?.small?.url ||
                              member?.attributes?.image?.data?.attributes?.formats
                                ?.medium?.url ||
                              member?.attributes?.image?.data?.attributes?.formats
                                ?.large?.url ||
                              member?.attributes?.image?.data?.attributes?.formats
                                ?.thumbnail?.url ||
                              "/Placeholder.png"
                            }`}
                            alt={member?.attributes?.name || "member"}
                            className="w-full h-full aspect-square rounded-full object-cover"
                          />
                        </div>
    
                        <div className="flex flex-col space-y-2">
                          <h2 className="text-[1.563rem] text-primary font-bold mt-4 lg:mt-7">
                            {member?.attributes?.name || "member"}
                          </h2>
                          <p className="text-[0.8rem] mt-2 text-gray-400 poppins">
                            {member?.attributes?.pronouns}
                          </p>
                          <p className="text-[1.25rem] font-semibold poppins">
                            {member?.attributes?.position}
                          </p>
    
                          <div className="flex gap-2">
                            {member?.attributes?.twitter && (
                              <Icon
                                url={`${twitter}/${member?.attributes?.twitter}`}
                              >
                                <FaTwitter size={12} />
                              </Icon>
                            )}
                            {member?.attributes?.linkedin && (
                              <Icon
                                url={`${linkedin}/${member?.attributes?.linkedin}`}
                              >
                                <FaLinkedinIn size={12} />
                              </Icon>
                            )}
                            {member?.attributes?.facebook && (
                              <Icon
                                url={`${facebook}/${member?.attributes?.facebook}`}
                              >
                                <FaFacebookF size={12} />
                              </Icon>
                            )}
    
                            {member?.attributes?.instagram && (
                              <Icon
                                url={`${instagram}/${member?.attributes?.instagram}`}
                              >
                                <FaInstagram size={12} />
                              </Icon>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-neutral-800 font-medium poppins text-[1rem] py-5">
                        {parse(member?.attributes?.bio)}
                      </div>
                    </motion.div>
                }
              </section>
            ) : (
              <section className="w-[80%] mx-auto grid grid-cols-1  gap-y-16  mt-10">
                {member &&
                  
                    <motion.div
                      
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="w-full flex flex-col gap-2 bg-white rounded-xl drop-shadow-md"
                    >
                      <div className="flex items-center space-x-10 px-3 lg:px-7 py-5 ">
                        <div className="w-[35%]">
                          <img
                            src={`${
                              
                              member?.attributes?.image?.data?.attributes?.formats
                                ?.small?.url ||
                              member?.attributes?.image?.data?.attributes?.formats
                                ?.medium?.url ||
                              member?.attributes?.image?.data?.attributes?.formats
                                ?.large?.url ||
                              member?.attributes?.image?.data?.attributes?.formats
                                ?.thumbnail?.url ||
                              "/Placeholder.png"
                            }`}
                            alt={member?.attributes?.name || "member"}
                            className="w-9/12 aspect-square rounded-full object-cover"
                          />
                        </div>
                        <div className="w-[65%]">
                          <div className="flex flex-col ">
                            <h2 className="text-[1.563rem] md:text-[1.953rem] text-primary font-bold mt-4 lg:mt-7">
                              {member?.attributes?.name || "member"}
                            </h2>
                            <p className="text-[1rem] text-gray-400 poppins">
                              {member?.attributes?.pronouns}
                            </p>
                            <p className="text-[1.25rem] mt-1 font-semibold poppins">
                              {member?.attributes?.position}
                            </p>
                            <div className="text-neutral-800 font-medium poppins text-[1rem] leading-relaxed py-5">
                              {parse(member?.attributes?.bio)}
                            </div>
                            <div className="flex gap-2">
                              {member?.attributes?.twitter && (
                                <Icon
                                  url={`${twitter}/${member?.attributes?.twitter}`}
                                >
                                  <FaTwitter size={20} />
                                </Icon>
                              )}
                              {member?.attributes?.linkedin && (
                                <Icon
                                  url={`${linkedin}/${member?.attributes?.linkedin}`}
                                >
                                  <FaLinkedinIn size={20} />
                                </Icon>
                              )}
                              {member?.attributes?.facebook && (
                                <Icon
                                  url={`${facebook}/${member?.attributes?.facebook}`}
                                >
                                  <FaFacebookF size={20} />
                                </Icon>
                              )}
    
                              {member?.attributes?.instagram && (
                                <Icon
                                  url={`${instagram}/${member?.attributes?.instagram}`}
                                >
                                  <FaInstagram size={20} />
                                </Icon>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                }
              </section>
            )}
            {isAuthor ?(
                <section className={`${mobileView ? "w-full": "w-[80%] mx-auto"} mt-8`}>
                    <h1 className="text-center text-primary font-bold text-[1.953rem] md:text-[2.441rem] tracking-[-0.0009em]">All articles by {member?.attributes?.name?.split(' ').length ? member?.attributes?.name?.split(' ')[0]: member?.attributes?.name}</h1>
                    {categories?.filter((cat)=>
                      cat?.attributes?.name !== "Ad Feature" && cat?.attributes?.name?.toLowerCase() !== "sponsored"
                    )?.map((cat,index)=>(
                      <Carousel key={index} member={member} cat={cat}></Carousel>
                      
                    ))}
                </section>
            ):""}
          </main>
        </Layout>
      );

}
export async function getStaticPaths()
{
    const {data} = await request.get(`/teams`);
    const paths = data?.data?.map((current)=> ({
        params: {_member: current.attributes.name}
    }));

    return {paths, fallback: "blocking"};
}

export async function getStaticProps({params})
{
    const {_member} = params;

    const filter = qs.stringify({
        filters:{
            name:{
                $eq:_member,
            }
        },
        populate:"*"
    });
    const category_query = `query ArticlesViaCategories($filtervarOne: CategoryFiltersInput, $filtervarTwo: ArticleFiltersInput){
                                  categories(filters:$filtervarOne){
                                    data{
                                      
                                      attributes{
                                        name
                                        articles(filters:$filtervarTwo, sort:"publishedAt:DESC"){
                                          data{
                                            id
                                           
                                          }
                                        }
                                      }
                                    }
                                  }
    }`;
 
    const currentDate = new Date().toISOString();
    const category_query_variables = {
      filtervarOne:{
        articles:{
          author:{
            fullname:{
              eq:_member
            }
          }
         

          

        },
        and:{
          articles:{
            PublishDate:{
              lt: currentDate
            }
          }
        }
       
      },
      filtervarTwo:{
        author:{
          fullname:{
            eq:_member
          }
        }
      }

    }
    

    const response = await fetch(`/teams?${filter}`);
    const data = await response.json();
    const auxiliaryResponse = await fetch(`${BASE_URL}/graphql`,{
      method:"POST",
      mode:"cors",
      cache:"no-cache",
      credentials:"same-origin",
      headers:{
        "Content-Type":"application/json"
      },
      redirect:"follow",
      referrerPolicy:"no-referrer",
      
      body: JSON.stringify({query: category_query, variables:category_query_variables}),
     
      

    });
    const auxiliaryData = await auxiliaryResponse.json();
    
    

   
   
    return{
        props:{
            member:data?.data?.length && data?.data[0] || null,
            categories: auxiliaryData?.data?.categories?.data || null,
        }
        

    };
}

export default Member;
