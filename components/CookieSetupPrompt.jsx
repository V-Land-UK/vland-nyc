import {useEffect, useState, useRef,useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import DropDown from "./DropDown";
import { GlobalContext } from "../context/GlobalContext";
import { getCookie,setCookie,deleteCookie } from "../lib/utils";
import Link from "next/link";



const PreferenceToggle = ({cookieType})=>{
    const [preferenceState,setPreferenceState]= useState(true);
    const didMount = useRef(false);
    
    useEffect(()=>{
        
      getCookie(cookieType) ? setPreferenceState(true): setPreferenceState(false);
    },[cookieType])
    useEffect(()=>{
        if(didMount.current){
            if(preferenceState){
                setCookie(cookieType,`${Date.now()}`, {'max-age':2592000});
            }
            else{
                deleteCookie(cookieType);
            }
        }
    }, [preferenceState])
    const togglePreference = ()=>{
        if(!didMount.current) didMount.current = true;
        setPreferenceState((prev)=> prev ? false:true);
            
        

    }
    
    

    return(
        <div className="inline-block relative align-middle ml-8  h-[18px] w-[45px]" onClick={()=>{togglePreference()}}>
            <div className={`absolute h-[18px] w-[18px] origin-center rounded-[50%] z-20 ${preferenceState ? "translate-x-[27px] bg-primary": "left-[0%] bg-gray-400"}`}>

            </div>
            <div className={`absolute top-[18.45%]  z-10 w-[100%] h-[12px] rounded-[8px] ${preferenceState ? "bg-primary/40": "bg-gray-300"}`}></div>
        </div>
    )
}


const CookieSetupPrompt = ({bool=true})=>{
    const [ECtoggleActive,setECtoggleActive] = useState(false);
    const {Cookies} = useContext(GlobalContext);
    const contentRef = useRef(null);
    const [preferencesSet, setPreferencesSet] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [content, setContent] = useState({});
    
    const convertToSlug = (title)=>{
        const strList = title.split(' ');
        const slug = strList.join('-').toLowerCase();
        
        return slug;
    }
    useEffect(()=>{
        
        getCookie("preferences-set") ? setPreferencesSet(true):setPreferencesSet(false);
    },[preferencesSet])
   
    useEffect(()=>{
        
        if(Object.keys(Cookies).length){
           
            setContent(contentRef.current ? {...contentRef.current,vendors:(contentRef.current.vendors === "null"? null:contentRef.current.vendors)}: ({
                title: Cookies?.cookieTypes["optional-cookies"][0].title,
                slug: convertToSlug(Cookies?.cookieTypes["optional-cookies"][0].title),
                body: Cookies?.cookieTypes["optional-cookies"][0].body,
                vendors: (Cookies?.cookieTypes["optional-cookies"][0].vendors === "null"? null:Cookies?.cookieTypes["optional-cookies"][0].vendors)
            }
            ));
        }
    },[Object.keys(Cookies).length])
    const contentToggle = (contentObj) =>
    {
        contentRef.current = contentObj;
        setContent({...contentRef.current,vendors:(contentRef.current.vendors === "null"? null:contentRef.current.vendors), slug: convertToSlug(contentRef.current.title)});
    }

    const acceptEssentialOnly = ()=>{
        if(Object.keys(Cookies).length){
            for(var i =0; i < Cookies?.cookieTypes["optional-cookies"].length; i++){
                if(getCookie(convertToSlug(`${Cookies?.cookieTypes["optional-cookies"][i].title}`))) deleteCookie(convertToSlug(`${Cookies?.cookieTypes["optional-cookies"][i].title}`));
            }
        }
        setCookie("preferences-set",`${Date.now()}`, {"max-age":2592000});
        setPreferencesSet(true);

    }
    const openSettings = ()=>{
        setSettingsOpen(true);
    }
    const exitSettings = ()=>{
        setSettingsOpen(false);
    }
    const savePreferences = ()=>{
        setCookie("preferences-set",`${Date.now()}`, {"max-age":2592000});
        setPreferencesSet(true);
    }
    
   

    const toggleEC = ()=>{
        setECtoggleActive(() => {return ECtoggleActive ? false:true});

    };
    

    return(

        <div className={`${preferencesSet ? "hidden":"fixed"} w-screen h-screen bg-black/75 z-[9999] top-0`}>
            <div className="relative border-box pt-8 rounded-[6px] bg-white m-auto h-[90vw] w-[90%] lg:h-[50vw] max-h-[500px] max-w-[500px] lg:w-[50%] top-[15%] xl:w-[35%] xl:h-[35vw] lg:max-h-[550px] lg:max-w-[550px] lg:top-[10%]" role="alertdialog" aria-describedby="trust-policy-text" aria-label="We care about your privacy">
                <div className="relative w-[100%] max-h-[80%] overflow-scroll scroll-py-0">
                    <div className="relative w-[85%] lg:w-[80%] mt-8 mx-auto">
                        <h3 className="font-semibold text-primary mx-auto text-center text-md">We care about your privacy</h3>
                        <p className="text-xs mt-2">We and our partners store and/or access information on your device to help:</p>
                        <ul className="ml-5 list-outside mt-2 text-xs">
                            <li className="ml-2 mt-3">Provide you with the best possible service and experience when using our website</li>
                            <li className="ml-2 mt-3">Gain insight into how you use and interact with our content</li>
                            <li className="ml-2 mt-3">Personalise content and ads</li>
                        </ul>
                        <p className="text-xs mt-5">Cookies and similar technologies are used by us and selected companies strictly for this reason.</p>
                        <p className="text-xs mt-3">You may accept or make granular choices, including exercising your right to object to companies processing personal data based on legitimate interest instead of consent.These choices will be signaled to our partners and will not affect browsing data. {" "} <Link href="/privacy-policy" className="underline font-semibold">More Information</Link></p>
                        
                        <h4 className="font-semibold text-sm mt-3">Essential cookies</h4>
                        <div className="border-box pb-3 border-b-[1.25px] mt-2 border-gray-400 text-xs">
                            <p>These cookies are necessary for the website to work as intended and therefore cannot be switched off in our systems.They are usually only set in response to actions made by you which amount to a request for services,
                            such as setting your privacy preferences, logging in or filling in forms. 
                            You can set your browser to block or alert you about these cookies, but some parts of the site will not then work.
                            These cookies do not store any personally identifiable information.</p>
                            <div className="relative text-end w-[100%] mt-2">
                                
                                <p className="text-start w-[90%] inline-block align-top font-semibold" style={{marginBlockEnd:"0"}}>More information</p>
                            
                                
                                <button className={`w-[10%] text-center`} onClick={()=>{toggleEC()}}>
                                    <i className={`inline-block w-[12px] h-[12px] origin-center  border-black border-r-[2.5px] border-b-[2.5px] ${ECtoggleActive ? "rotate-[-135deg]": "rotate-45"}`}></i>
                                </button>
                                {ECtoggleActive && (
                                    <div className="mt-3 text-start text-xs">
                                        <p className="font-semibold">Enabling these cookies allows us to:</p>
                                        <ul className="list-outside ml-3 mt-2">
                                            
                                            <li className="mt-2">Manage the signup and general administration of creating or opening an
                                            account opening.</li>
                                            <li className="mt-2">Remember your Login details and prevent you from logging in every time
                                            you visit a new page on the site</li>
                                            <li className="mt-2">remember your details for future correspondence when you submit data through
                                            forms such as contact or comment details</li>
                                            <li className="mt-2">store and retain your site preferences on your mobile device or computer</li>
                                            
                                        </ul>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                        <h4 className="font-semibold text-sm mt-3">Optional cookies</h4>
                        <div className="border-box pb-3 border-b-[1.25px] mt-2 border-gray-400 text-xs">
                            <p>In some cases, this website uses cookies provided by trusted third parties that serve content or
                            render advertising and analytics services on this website.</p>
                            <p className="underline font-semibold cursor-pointer mt-3" onClick={()=>{openSettings()}}>Manage cookies</p>
                        </div>
                        
                    </div>
                </div>    
                <div className="absolute bg-white rounded-b-[6px] top-[80%] flex items-center w-[100%] text-center h-[20%] border-gray-400 border-t-[1.25px]">
                    <div className="mx-auto">
                        <button className="w-[9rem] rounded-[2.5px] border-box py-3 bg-primary mr-3 text-xs text-white" onClick={()=>{openSettings()}}>Show purposes</button>
                        <button className="w-[9rem] rounded-[2.5px] bg-primary border-box py-3 text-xs text-white" onClick={()=>{acceptEssentialOnly()}}>I Accept</button>
                    </div>
                </div>
            </div>
            <div className={`${settingsOpen ? "absolute":"hidden"} left-[50%] translate-x-[-50%] border-box pt-3 rounded-[6px] bg-white m-auto top-[18%] w-[90%] max-w-[600px] lg:w-[60%] xl:w-[45%] xl:max-w-[650px] lg:top-[12%]`}>
                <div className="relative border-black-400 border-b-[1.25px] border-box pb-2 rounded-t-[6px]">
                    <div className="relative inline-block w-[80%] xs:w-[90%]">

                        <img className="inline-block relative ml-3 mr-8 h-auto w-[6rem]" src="/Header.svg"/>
                    </div>
                    <button className="relative align-bottom w-[24px] h-[24px] rounded-[50%] border-black-300 border-[2px]" onClick={()=>{exitSettings()}}>
                            <FontAwesomeIcon icon={faXmark} className="w-[16px] h-[16px] m-auto"></FontAwesomeIcon>
                    </button>
                    

                </div>
                
                {Object.keys(Cookies).length && (
                    <div className="relative">
                        <div className="hidden sm:inline-block w-fit">
                            
                            <ul className="p-0 list-none bg-white font-semibold text-xs">
                                {Cookies?.cookieTypes["optional-cookies"].length && (
                                    Cookies?.cookieTypes["optional-cookies"].map((cookieType,index)=>(
                                        <li key={index} className="border-box cursor-pointer py-2 pr-3 border-black-300 border-b-[.8px]" onClick={()=>{contentToggle(cookieType)}}><p className="ml-3">{cookieType.title}</p></li>
                                     
                                    ))
                                )}
                            </ul>
                        

                        </div>
                        <div className="block sm:hidden w-[80%] mx-auto mt-10  h-[250px] overflow-y-scroll max-h-[500px]">
                            {Cookies?.cookieTypes["optional-cookies"].length && (
                                Cookies?.cookieTypes["optional-cookies"].map((cookieType,index)=>(
                                    <DropDown key={index} title={`${cookieType.title}`} className="relative text-black font-semiBold text-xs border-box cursor-pointer py-[10px] mb-3 bg-gray-50">
                                        <div className=" mt-3 font-semibold">
                                            <h3 className="inline-block text-sm w-fit">{cookieType.title}</h3>
                                            
                                            <PreferenceToggle cookieType={`${convertToSlug(cookieType.title)}`}/>
                                        </div>
                                        <p className="mt-3 text-xs">{cookieType.body}</p>

                                    
                                        {cookieType.vendors !== "null" && (
                                            <div className="mt-8">
                                                <h4 className="font-semibold text-sm">Vendor list</h4>
                                                <div className="relative mt-2">

                                                    {cookieType.vendors.map((vendor,index) =>(
                                                        
                                                        <DropDown key={index} title={`${vendor.title}`} className="relative  text-black font-semibold text-xs border-box border-gray-400 border-b-[1.25px] py-[10px] cursor-pointer">
                                                            <div className="text-xs">
                                                                <h5 className="mt-2">Parent Company</h5>
                                                                <p className="mt-2 font-normal text-xxs">{vendor.parent}</p>
                                                                <h5 className="mt-2">Default category</h5>
                                                                <p className="mt-2 font-normal text-xxs">{vendor.defaultCategory}</p>
                                                                {vendor.privacyPolicy &&(
                                                                    <div className="mt-2">
                                                                        <h5>Privacy policy</h5>
                                                                        <a className="mt-2 underline-none font-normal text-xxs">{vendor.privacyPolicy}</a>
                                                                    </div>
                                                                )}
                                                                {vendor.cookiePolicy &&(
                                                                    <div className="mt-2">
                                                                        <h5 className="mt-2">Cookie policy</h5>
                                                                        <a  className="mt-2  underline-none font-normal text-xxs">{vendor.cookiePolicy}</a>
                                                                    </div>
                                                                )}

                                                            </div>
                                                        </DropDown>
                                                    ))}
                                                </div>
                                                
                                            </div>
                                        )}
                        
                                    </DropDown>
                                ))
                            )}
                        </div>
                
                        <div className="hidden sm:inline-block border-box pr-[5%] align-top ml-5 relative h-[350px] max-h-[500px] overflow-y-scroll w-[70%]">
                            <div className=" mt-3 font-semibold">
                                <h3 className="inline-block text-sm w-fit">{content.title}</h3>
                                
                                <PreferenceToggle cookieType={`${content.slug}`}/>
                            </div>

                            <p className="mt-3 text-xs">{content.body}</p>

                            
                            {content.vendors && (
                                <div className="mt-8">
                                    <h4 className="font-semibold text-sm">Vendor list</h4>
                                    <div className="relative mt-2">

                                        {content.vendors.map((vendor,index) =>(
                                            
                                            <DropDown key={index} title={`${vendor.title}`} className="relative  text-black font-semibold text-xs border-box border-gray-400 border-b-[1.25px] py-[10px] cursor-pointer">
                                                <div className="text-xs">
                                                    <h5 className="mt-2">Parent Company</h5>
                                                    <p className="mt-2 font-normal text-xxs">{vendor.parent}</p>
                                                    <h5 className="mt-2">Default category</h5>
                                                    <p className="mt-2 font-normal text-xxs">{vendor.defaultCategory}</p>
                                                    {vendor.privacyPolicy &&(
                                                        <div className="mt-2">
                                                            <h5>Privacy policy</h5>
                                                            <a className="mt-2 underline-none font-normal text-xxs">{vendor.privacyPolicy}</a>
                                                        </div>
                                                    )}
                                                    {vendor.cookiePolicy &&(
                                                        <div className="mt-2">
                                                            <h5 className="mt-2">Cookie policy</h5>
                                                            <a  className="mt-2  underline-none font-normal text-xxs">{vendor.cookiePolicy}</a>
                                                        </div>
                                                    )}

                                                </div>
                                            </DropDown>
                                        ))}
                                    </div>
                                    
                                </div>
                            )}
                    
                        </div>
                
                    </div>
                )}
                
                
                <div className="relative bg-white rounded-b-[6px] border-t-[1.25px] border-black-300 border-box py-5">
                    <div className="inline-block  text-start w-[50%] h-[40px]">
                        <button className="border-box px-2 py-3 bg-primary h-fit w-fit text-white ml-3 text-xs text-center rounded-[2px]" onClick={()=>{savePreferences()}}>Save preferences</button>
                    </div>
                    <div className="inline-block  text-end w-[50%] h-[40px]">
                        <button className="border-box px-2 py-3 h-fit bg-primary w-fit text-white mr-3 text-xs text-center rounded-[2px]" onClick={()=>{acceptEssentialOnly()}}>Accept only essential</button>
                    </div>
                   
                    

                </div>

            </div>
        </div>
    );
    
    

}

export default CookieSetupPrompt