import Layout from "../defaults/Layout.jsx";
import Back from "../components/Back.jsx";
import { useState, useEffect, useRef} from "react";
import DropDown from "../components/DropDown.jsx";


const PrivacyPolicy = ()=>
{
    const sub_titles = ["Definitions and interpretation", "Scope of this privacy policy", "Data collected", "How we collect data",
    "Data that is given to us By you","Data that is collected automatically", "Our use of Data", "Keeping Data secure",
    "Data retention", "Your rights", "Links to other websites", "Changes of business ownership and control", "General",
    "Changes to this privacy policy"];
    const elRef = useRef(null);
    const anchors = useRef(null);
    const sxns = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    
    const handleScroll = ()=>{
        
        setScrollY(window.scrollY);
       
    }


    useEffect(()=>{
       
        window.addEventListener('scroll', handleScroll);
       
       

        
    },[])
    useEffect(()=>{
        if(!elRef.current){
            return;
        }
        if(!anchors.current) anchors.current = document.querySelectorAll("a[id='sxn-anchor']");
        if(!sxns.current) sxns.current = document.querySelectorAll("section[id]");
        
        let id;
        for(var i = sxns.current.length - 1; i >= 0; i--){
            if(scrollY >= sxns.current[i].offsetTop){
                
                anchors.current[i].classList.add("font-semibold");
                anchors.current[i].classList.add("text-primary");
                
                id = sxns.current[i].getAttribute('id');
                break;


            }

        }
        [...anchors.current].filter(anchor => anchor.getAttribute("href") !== `#${id}`)
        .forEach((anchor)=>{
            if(anchor.classList.contains('font-semibold')){
                anchor.classList.remove('font-semibold');
                anchor.classList.remove('text-primary');
            }
        });
      
      
            
        if(scrollY + elRef.current.getBoundingClientRect().height >= elRef.current.parentElement.getBoundingClientRect().height){
            
            elRef.current.style.width = "100%"
            elRef.current.style.position = "absolute";
            elRef.current.style.bottom = "0";
        }
        else{
           
            elRef.current.style.position = "fixed";
            elRef.current.style.width = '17%';
            elRef.current.style.removeProperty("bottom");
        }
       

    },[scrollY])
  
    const convert2Slug = (str)=>
    {
        
        const str_list = str.toLowerCase().split(" ");
        return str_list.join("-");
    }
    return(
        <Layout title="Privacy Policy">
            
            <main className="poppins xs:text-sm md:text-base font-normal lg:pt-6 lg:pb-[20vh] flex">
                
                <section className="main_content w-[60%] float-left ml-[20%] pr-[3%] hidden lg:block">
                    <h1 className="text-3xl lg:text-3xl font-bold mt-4 lg:mt-7">
                        Privacy Policy
                    </h1>
                    <p className="mt-10"><span className="italic pr-2">Effective starting:</span>01 January, 2023</p>
                    <div className="border-box py-3 mt-5 border-y-[1.2px] border-gray-300 align-center">
                        This privacy policy applies between you, the User of this Website, and , the owner and provider
                        of this Website. V-Land Magazine Limited takes the privacy of your information very seriously. This privacy policy applies
                        to our use of any and all Data collected by us or provided by you in relation to your use of the Website.

                        <span className="block mt-8 font-bold">Please read this privacy policy carefully.</span>
                    </div>
                    <section id="sxn_definitions-and-interpretation" className="mt-10">
                        <h2 className="text-2xl lg:text-2xl font-semibold">Definititons and interpretation</h2>
                        <ol className=" ml-5 mt-3 list-decimal list-outside">
                            <li><p className="ml-2">In this privacy policy, the following definitions are used:</p>
                                <table className="mt-5 border-2 border-black-500">
                                    <tbody>
                                        <tr>
                                            <th className="align-center w-fit border-box border-r-2 border-b-2 border-black-500 px-2 bg-[#F8F8F8]">Data</th>
                                            <td className="align-center w-fit border-box border-b-2 border-black-500 px-2 bg-[#F8F8F8]">collectively all information that you submit to via the Website. This definition incorporates, where applicable, the definitions provided in the Data Protection Laws;</td>
                                        </tr>
                                        <tr>
                                            <th className="align-center w-fit border-box border-r-2 border-b-2 border-black-500 px-2 ">Data Protection Laws</th>
                                            <td className="align-center w-fit border-box border-b-2 border-black-500 px-2">any applicable law relating to the processing of personal Data, including but not limited to the GDPR,
        and any national implementing and supplementary laws, regulations and secondary legislation;</td>
                                        </tr>
                                        <tr>
                                            <th className="align-center w-fit border-box border-r-2 border-b-2 border-black-500 px-2 bg-[#F8F8F8]">GDPR</th>
                                            <td className="align-center w-fit border-box border-b-2 border-black-500 px-2 bg-[#F8F8F8]">the USA General Data Protection Regulation;</td>
                                        </tr>
                                        <tr>
                                            <th className="align-center w-fit border-box border-r-2 border-b-2 border-black-500 px-2">V-Land Magazine Limited, we {" "}<span className="font-normal">or</span>{" "} us</th>
                                            <td className="align-center w-fit border-box border-b-2 border-black-500 px-2">V-Land Magazine Limited, a company incorporated in England and Wales with registered number 14199544 whose registered office is at 16 Roberts Road, Hertfordshire, WD18 0AY;</td>
                                        </tr>
                                        <tr>
                                            <th className="align-center w-fit border-box border-r-2 border-b-2 border-black-500 px-2 bg-[#F8F8F8]">User{" "}<span className="font-normal">or</span>{" "}you</th>
                                            <td className="align-center w-fit border-box border-b-2 border-black-500 px-2 bg-[#F8F8F8]">any third party that accesses the Website and is not either (i) employed by V-Land Magazine Limited
        and acting in the course of their employment or (ii) engaged as a consultant or otherwise providing
        services to and accessing the Website in connection with the provision of such services;</td>
                                        </tr>
                                        <tr>
                                            <th className="align-center w-fit border-box border-r-2 border-b-2 border-black-500 px-2">Website</th>
                                            <td className="align-center w-fit border-box border-b-2 border-black-500 px-2">the website that you are currently using, and any sub-domains of this site unless www.v-landuk.com
        expressly excluded by their own terms and conditions.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                            <li className="mt-7">
                                <p className="ml-2">In this privacy policy, unless the context requires a different interpretation:</p>
                                <ol className="list-[lower-alpha] ml-10 pl-5 mt-3 list-outside">
                                    <li className="mb-3"><p className="ml-2">the singular includes the plural and vice versa;</p></li>
                                    <li className="mb-3"><p className="ml-2">references to sub-clauses, clauses, schedules or appendices are to sub-clauses, clauses,
                                         schedules or appendices of this privacy policy;</p>
                                    </li>
                                    <li className="mb-3"><p className="ml-2">a reference to a person includes firms, companies, government entities, trusts and partnerships</p></li>
                                    <li className="mb-3"><p className="ml-2">&quot;including&quot; is understood to mean &quot;including without limitation&quot;</p></li>
                                    <li className="mb-3"><p className="ml-2">reference to any statutory provision includes any modification or amendment of it;</p></li>
                                    <li className="mb-3"><p className="ml-2">the headings and sub-headings do not form part of this privacy policy.</p></li>

                                </ol>
                            </li>
                        </ol>
                    </section>
                    <section id = "sxn_scope-of-this-privacy-policy" className="mt-10">

                        <h2 className="text-2xl lg:text-2xl font-semibold">Scope of this privacy policy</h2>
                        <ol className="ml-5 mt-3 list-decimal list-outside" start="3">
                            <li><p className="ml-2">This privacy policy applies only to the actions of and Users with respect to this Website.
                            It does not extend to any websites that can be accessed from this
                            Website including, but not limited to, any links we may provide to social media websites.</p>
                            </li>
                            <li className="mt-3"><p className="ml-2">For purposes of the applicable Data Protection Laws, is the &quot;data controller&quot;.
                             This means that V-Land Magazine Limited determines the purposes for which, and the manner in which, your Data is processed.</p>
                            </li>
                        </ol>
                    </section>
                    <section id = "sxn_data-collected" className="mt-10">
                        <h2 className="text-2xl font-semibold">Data collected</h2>
                        <ol className="ml-5 mt-3 list-decimal list-outside" start="5">
                            <li>
                                <p className="ml-2">We may collect the following Data, which includes personal Data, from you:</p>
                                <ol className="mt-3 ml-10 list-[lower-alpha] list-outside">
                                    <li><p className="ml-2">name</p></li>
                                    <li><p className="ml-2">contact information such as email addresses and telephone numbers</p></li>
                                </ol>
                                <p className="mt-3 ml-2 inline-block">In each case, in accordance with this privacy policy.</p>
                            </li>
                        </ol>

                    </section>
                    <section id="sxn_how-we-collect-data" className="mt-10">
                        <h2 className="font-semibold text-2xl">How we collect Data</h2>
                        <ol className="ml-5 mt-3 list-decimal list-outside" start="6">
                            <li>
                                <p className="ml-2">We collect Data in the following ways:</p>
                                <ol className="mt-3 ml-10 list-[lower-alpha] list-outside">
                                    <li><p className="ml-2">Data is given to us by you</p></li>
                                    <li><p className="ml-2">Data is collected automatically</p></li>

                                </ol>
                            </li>
                        </ol>
                    </section>
                    <section id="sxn_data-that-is-given-to-us-by-you" className="mt-10">
                        <h2 className="font-semibold text-2xl">Data that is given to us by you</h2>
                        <ol className="mt-3 ml-5 list-decimal list-outside" start ="7">
                            <li><p className="ml-2">V-Land Magazine Limited will collect your Data in a number of ways, for example:</p>
                                <ol className="list-[lower-alpha] mt-3 ml-10 list-outside">
                                    <li><p className="ml-2">when you contact us through the Website, by telephone, post, e-mail or through any other means</p></li>
                                    <li><p className="ml-2">when you elect to receive marketing communications from us</p></li>
                                </ol>
                                <p className="ml-2 mt-3 inline-block">in each case, in accordance with this privacy policy.</p>
                                
                            </li>
                        </ol>
                    </section>
                    <section id="sxn_data-that-is-collected-automatically" className="mt-10">
                        <h2 className="font-semibold text-2xl">Data that is collected automatically</h2>
                        <ol className="mt-3 list-decimal list-outside ml-5" start="8">
                            <li><p className="ml-2">To the extent that you access the Website, we will collect your Data automatically, for example:</p>
                                <ol className="list-[lower-alpha] mt-3 ml-10 list-outside">
                                    <li><p className="ml-2">we automatically collect some information about your visit to the Website. This information helps us to make
improvements to Website content and navigation, and includes your IP address, the date, times and frequency with
which you access the Website and the way you use and interact with its content.</p></li>

                                </ol>
                            </li>
                        </ol>
                    </section>
                    <section id="sxn_our-use-of-data" className="mt-10">
                        <h2 className="text-2xl font-semibold">Our use of Data</h2>
                        <ol className="list-decimal ml-5 mt-3 list-outside" start="9">
                            <li><p className="ml-2">Any or all of the above Data may be required by us from time to time in order to provide you with the best possible
                            service and experience when using our Website. Specifically, Data may be used by us for the following reasons:</p>
                                <ol className="mt-3 ml-10 list-[lower-alpha] list-outside">
                                    <li><p className="ml-2">transmission by email of marketing materials that may be of interest to you</p></li>
                                </ol>
                                <p className="ml-2 mt-3">in each case, in accordance with this privacy policy.</p>
                            </li>
                            <li><p className=" mt-3 ml-2">We may use your Data for the above purposes if we deem it necessary to do so for our legitimate interests. If you are
                            not satisfied with this, you have the right to object in certain circumstances (see the section headed &quot;Your rights&quot;
                            below).</p></li>
                            <li className="mt-3"><p className="ml-2">For the delivery of direct marketing to you via e-mail, we&apos;ll need your consent, whether via an opt-in or soft-opt-in:</p>
                                <ol className="list-[lower-alpha] list-outside mt-3 ml-10">
                                    <li className="mb-3"><p className="ml-2">soft opt-in consent is a specific type of consent which applies when you have previously engaged with us (for
                                    example, you contact us to ask us for more details about a particular product/service, and we are marketing similar
                                    products/services). Under &quot;soft opt-in&quot; consent, we will take your consent as given unless you opt-out.</p></li>
                                    <li className="mb-3"><p className="ml-2">for other types of e-marketing, we are required to obtain your explicit consent; that is, you need to take positive
                                    and affirmative action when consenting by, for example, checking a tick box that we&apos;ll provide.</p></li>
                                    <li className="mb-3"><p className="ml-2">if you are not satisfied with our approach to marketing, you have the right to withdraw consent at any time. To
                                    find out how to withdraw your consent, see the section headed &quot;Your rights&quot; below.</p></li>
                                </ol>
                            </li>

                        </ol>
                    </section>
                    <section id="sxn_keeping-data-secure" className="mt-10">
                        <h2 className="font-semibold text-2xl">
                            Keeping Data secure
                        </h2>
                        <ol className="ml-6 mt-3 list-decimal list-outside"  start="12">
                            <li><p className="ml-2">We will use technical and organisational measures to safeguard your Data, for example:</p>
                                <ol className="mt-3 ml-10 list-[lower-alpha] list-outside">
                                    <li className="mb-3"><p className="ml-2">access to your account is controlled by a password and a user name that is unique to you.</p></li>
                                    <li><p className="ml-2">we store your Data on secure servers.</p></li>
                                </ol>
                            </li>
                            <li className="mt-3"><p className="ml-2">We are certified to Strapi. This family of standards helps us manage your Data and keep it secure.</p></li>
                            <li className="mt-3"><p className="ml-2">Technical and organisational measures include measures to deal with any suspected data breach. If you suspect any
                            misuse or loss or unauthorised access to your Data, please let us know immediately by contacting us via this e-mail
                            address:{" "}<a href="mailto:contact@v-landmagazine.com" className="underline">contact@v-landmagazine.com.</a></p></li>
                            <li className="mt-3"><p className="ml-2">If you want detailed information from Get Safe Online on how to protect your information and your computers and
                            devices against fraud, identity theft, viruses and many other online problems, please visit www.getsafeonline.org. Get
                            Safe Online is supported by HM Government and leading businesses.</p></li>
                        </ol>
                    </section>
                    <section id="sxn_data-retention" className="mt-10">
                        <h2 className="font-semibold text-2xl">Data retention</h2>
                        <ol className="mt-3 ml-6 list-outside list-decimal" start="16">
                            <li><p className="ml-2">Unless a longer retention period is required or permitted by law, we will only hold your Data on our systems for the
                            period necessary to fulfil the purposes outlined in this privacy policy or until you request that the Data be deleted.</p></li>
                            <li className="mt-3"><p className="ml-2">Even if we delete your Data, it may persist on backup or archival media for legal, tax or regulatory purposes.</p></li>
                        </ol>
                    </section>
                    <section id="sxn_your-rights" className="mt-10">
                        <h2 className="text-2xl font-semibold">Your rights</h2>
                        <ol className="mt-3 ml-6 list-outside list-decimal" start="18">
                            <li><p className="ml-2">You have the following rights in relation to your Data:</p>
                                <ol className="list-[lower-alpha] list-outside ml-10 mt-3">
                                    <li><p className="ml-2"><span className="font-bold">Right to access{" "}</span> - the right to request (i) copies of the information we hold about you at any time, or (ii) that we
                                    modify, update or delete such information. If we provide you with access to the information we hold about you,
                                    we will not charge you for this, unless your request is &quot;manifestly unfounded or excessive.&quot; Where we are legally
                                    permitted to do so, we may refuse your request. If we refuse your request, we will tell you the reasons why.</p></li>
                                    <li><p className="ml-2"><span className="font-bold">Right to correct{" "}</span>- the right to have your Data rectified if it is inaccurate or incomplete.</p></li>
                                    <li><p className="ml-2"><span className="font-bold">Right to erase{" "}</span>the right to request that we delete or remove your Data from our systems.</p></li>
                                    <li><p className="ml-2"><span className="font-bold">Right to restrict our use of your data{" "}</span> - the right to &quot;block&quot; us from using your Data or limit the way in which
                                        we can use it.</p></li>
                                    <li><p className="ml-2"><span className="font-bold">Right to data portability{" "}</span> - the right to request that we move, copy or transfer your Data.</p></li>
                                    <li><p className="ml-2"><span className="font-bold">Right to object{" "}</span> - the right to object to our use of your Data including where we use it for our legitimate interests.</p></li>
                                </ol>
                            </li>
                            <li className="mt-3"><p className="ml-2">To make enquiries, exercise any of your rights set out above, or withdraw your consent to the processing of your Data
                            (where consent is our, legal basis for processing your Data), please contact us via this e-mail address:{" "}<a href="mailto:contact@v-landmagazine.com" className="underline">contact@v-landmagazine.com.</a></p></li>
                            <li className="mt-3"><p className="ml-2">If you are not satisfied with the way a complaint you make in relation to your Data is handled by us, you may be able
                            to refer your complaint to the relevant data protection authority. For the USA, this is the Information Commissioner&apos;s
                            Office (ICO). The ICO&apos;s contact details can be found on their website at https://ico.org.uk/.</p></li>
                            <li className="mt-3"><p className="ml-2">It is important that the Data we hold about you is accurate and current. Please keep us informed if your Data changes
                            during the period for which we hold it.</p></li>
                        </ol>
                    </section>
                    <section id="sxn_links-to-other-websites" className="mt-10">
                        <h2 className="font-semibold text-2xl">Links to other websites</h2>
                        <ol className="list-decimal list-outside mt-3 ml-6" start="22">
                            <li><p className="ml-2">This Website may, from time to time, provide links to other websites. We have no control over such websites and are
                        not responsible for the content of these websites. This privacy policy does not extend to your use of such websites. You
                        are advised to read the privacy policy or statement of other websites prior to using them.</p></li>
                        </ol>
                    </section>
                    <section id="sxn_changes-of-business-ownership-and-control" className="mt-10">
                        <h2 className="font-semibold text-2xl">Changes of business ownership and control</h2>
                        <ol className="list-decimal list-outside mt-3 ml-6" start="23">
                            <li><p className="ml-2">V-Land Magazine Limited may, from time to time, expand or reduce our business and this may involve the sale and/or
                            the transfer of control of all or part of V-Land Magazine Limited. Data provided by Users will, where it is relevant to any part of our business so transferred, be transferred along with that part and the new owner or newly controlling party
                            will, under the terms of this privacy policy, be permitted to use the Data for the purposes for which it was originally
                            supplied to us.</p></li>
                            <li className="mt-3"><p className="ml-2">We may also disclose Data to a prospective purchaser of our business or any part of it.</p></li>
                            <li className="mt-3"><p className="ml-2">In the above instances, we will take steps with the aim of ensuring your privacy is protected.</p></li>
                            
                        </ol>
                    </section>
                    <section id="sxn_general" className="mt-10">
                        <h2 className="font-semibold text-2xl">General</h2>
                        <ol className="list-decimal list-outside mt-3 ml-6" start="26">
                            <li><p className="ml-2">You may not transfer any of your rights under this privacy policy to any other person. We may transfer our rights
                            under this privacy policy where we reasonably believe your rights will not be affected.</p></li>
                            <li className="mt-3"><p className="ml-2">If any court or competent authority finds that any provision of this privacy policy (or part of any provision) is invalid,
                            illegal or unenforceable, that provision or part-provision will, to the extent required, be deemed to be deleted, and the
                            validity and enforceability of the other provisions of this privacy policy will not be affected.</p></li>
                            <li className="mt-3"><p className="ml-2">Unless otherwise agreed, no delay, act or omission by a party in exercising any right or remedy will be deemed a
                            waiver of that, or any other, right or remedy.</p></li>
                            <li className="mt-3"><p className="ml-2">This Agreement will be governed by and interpreted according to the law of England and Wales. All disputes arising
                            under the Agreement will be subject to the exclusive jurisdiction of the English and Welsh courts</p></li>
                            
                        </ol>
                    </section>
                    <section id="sxn_changes-to-this-privacy-policy" className="mt-10">
                        <h2 className="font-semibold text-2xl">Changes to this privacy policy</h2>
                        <ol className="list-decimal list-outside mt-3 ml-6" start="30">
                            <li><p className="ml-2">V-Land Magazine Limited reserves the right to change this privacy policy as we may deem necessary from time to
                            time or as may be required by law. Any changes will be immediately posted on the Website and you are deemed to
                            have accepted the terms of the privacy policy on your first use of the Website following the alterations.
                            <br></br>
                            <br></br>
                            You may contact V-Land Magazine Limited by email at {" "}<a href="mailto:contact@v-landmagazine.com" className="underline">contact@v-landmagazine.com</a>
                            </p></li>
                        </ol>
                    </section>
                </section>
                <section className="relative content_index w-[17%] float-left hidden lg:block">
                    <div className="fixed w-[17%] max-h-[90vh] overflow-y-scroll" ref={elRef}>
                        <div className="w-fit mt-4 border-t-4 border-primary border-box pt-2 lg:mt-7 ml-3">
                            <h3 className="text-md lg:text-xl font-semibold">Jump to</h3>
                        </div>
                        <ul className="ml-3 list-none mt-5 pb-[100px] pr-[30px]">
                            {sub_titles.map((subtitle,index)=>(
                                <li key={index} className="mb-3">
                                    <a id="sxn-anchor" href= {`#sxn_${convert2Slug(subtitle)}`} className="text-sm lg:text-md">{subtitle}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                        
                </section>
                <section className="relative xs:w-[80%] md:w-[60%] m-auto block lg:hidden">
                    <h1 className="text-2xl font-bold mt-4 lg:mt-7">
                            Privacy Policy
                    </h1>
                    <p className="mt-10"><span className="italic pr-2">Effective starting:</span>01 January, 2023</p>
                    <div className="border-box py-3 mt-5 border-y-[1.2px] border-gray-300 align-center">
                        This privacy policy applies between you, the User of this Website, and , the owner and provider
                        of this Website. V-Land Magazine Limited takes the privacy of your information very seriously. This privacy policy applies
                        to our use of any and all Data collected by us or provided by you in relation to your use of the Website.

                        <span className="block mt-8 font-bold">Please read this privacy policy carefully.</span>
                    </div>
                    <section aria-label="contents" className="mt-7">
                        
                        <DropDown title="Definitions and interpretation">
                            <ol className=" ml-5 mt-3 list-decimal list-outside">
                                <li><p className="ml-2">In this privacy policy, the following definitions are used:</p>
                                    <table className="mt-5 border-2 border-black-500">
                                        <tbody>
                                            <tr>
                                                <th className="align-center w-fit border-box border-r-2 border-b-2 border-black-500 px-2 bg-[#F8F8F8]">Data</th>
                                                <td className="align-center w-fit border-box border-b-2 border-black-500 px-2 bg-[#F8F8F8]">collectively all information that you submit to via the Website. This definition incorporates, where applicable, the definitions provided in the Data Protection Laws;</td>
                                            </tr>
                                            <tr>
                                                <th className="align-center w-fit border-box border-r-2 border-b-2 border-black-500 px-2 ">Data Protection Laws</th>
                                                <td className="align-center w-fit border-box border-b-2 border-black-500 px-2">any applicable law relating to the processing of personal Data, including but not limited to the GDPR,
            and any national implementing and supplementary laws, regulations and secondary legislation;</td>
                                            </tr>
                                            <tr>
                                                <th className="align-center w-fit border-box border-r-2 border-b-2 border-black-500 px-2 bg-[#F8F8F8]">GDPR</th>
                                                <td className="align-center w-fit border-box border-b-2 border-black-500 px-2 bg-[#F8F8F8]">the USA General Data Protection Regulation;</td>
                                            </tr>
                                            <tr>
                                                <th className="align-center w-fit border-box border-r-2 border-b-2 border-black-500 px-2">V-Land Magazine Limited, we {" "}<span className="font-normal">or</span>{" "} us</th>
                                                <td className="align-center w-fit border-box border-b-2 border-black-500 px-2">V-Land Magazine Limited, a company incorporated in England and Wales with registered number 14199544 whose registered office is at 16 Roberts Road, Hertfordshire, WD18 0AY;</td>
                                            </tr>
                                            <tr>
                                                <th className="align-center w-fit border-box border-r-2 border-b-2 border-black-500 px-2 bg-[#F8F8F8]">User{" "}<span className="font-normal">or</span>{" "}you</th>
                                                <td className="align-center w-fit border-box border-b-2 border-black-500 px-2 bg-[#F8F8F8]">any third party that accesses the Website and is not either (i) employed by V-Land Magazine Limited
            and acting in the course of their employment or (ii) engaged as a consultant or otherwise providing
            services to and accessing the Website in connection with the provision of such services;</td>
                                            </tr>
                                            <tr>
                                                <th className="align-center w-fit border-box border-r-2 border-b-2 border-black-500 px-2">Website</th>
                                                <td className="align-center w-fit border-box border-b-2 border-black-500 px-2">the website that you are currently using, and any sub-domains of this site unless www.v-landuk.com
            expressly excluded by their own terms and conditions.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                                <li className="mt-7">
                                    <p className="ml-2">In this privacy policy, unless the context requires a different interpretation:</p>
                                    <ol className="list-[lower-alpha] ml-10 pl-5 mt-3 list-outside">
                                        <li className="mb-3"><p className="ml-2">the singular includes the plural and vice versa;</p></li>
                                        <li className="mb-3"><p className="ml-2">references to sub-clauses, clauses, schedules or appendices are to sub-clauses, clauses,
                                            schedules or appendices of this privacy policy;</p>
                                        </li>
                                        <li className="mb-3"><p className="ml-2">a reference to a person includes firms, companies, government entities, trusts and partnerships</p></li>
                                        <li className="mb-3"><p className="ml-2">&quot;including&quot; is understood to mean &quot;including without limitation&quot;</p></li>
                                        <li className="mb-3"><p className="ml-2">reference to any statutory provision includes any modification or amendment of it;</p></li>
                                        <li className="mb-3"><p className="ml-2">the headings and sub-headings do not form part of this privacy policy.</p></li>

                                    </ol>
                                </li>
                            </ol>
                        </DropDown>
                        <DropDown title="Scope of this privacy policy">
                            <ol className="ml-5 mt-3 list-decimal list-outside" start="3">
                                <li><p className="ml-2">This privacy policy applies only to the actions of and Users with respect to this Website.
                                It does not extend to any websites that can be accessed from this
                                Website including, but not limited to, any links we may provide to social media websites.</p>
                                </li>
                                <li className="mt-3"><p className="ml-2">For purposes of the applicable Data Protection Laws, is the &quot;data controller&quot;.
                                This means that V-Land Magazine Limited determines the purposes for which, and the manner in which, your Data is processed.</p>
                                </li>
                            </ol>
                        </DropDown>
                        <DropDown title="Data collected">
                            <ol className="ml-5 mt-3 list-decimal list-outside" start="5">
                                <li>
                                    <p className="ml-2">We may collect the following Data, which includes personal Data, from you:</p>
                                    <ol className="mt-3 ml-10 list-[lower-alpha] list-outside">
                                        <li><p className="ml-2">name</p></li>
                                        <li><p className="ml-2">contact information such as email addresses and telephone numbers</p></li>
                                    </ol>
                                    <p className="mt-3 ml-2 inline-block">In each case, in accordance with this privacy policy.</p>
                                </li>
                            </ol>

                        </DropDown>
                        <DropDown title="How we collect data">
                            <ol className="ml-5 mt-3 list-decimal list-outside" start="6">
                                <li>
                                    <p className="ml-2">We collect Data in the following ways:</p>
                                    <ol className="mt-3 ml-10 list-[lower-alpha] list-outside">
                                        <li><p className="ml-2">Data is given to us by you</p></li>
                                        <li><p className="ml-2">Data is collected automatically</p></li>

                                    </ol>
                                </li>
                            </ol>

                        </DropDown>
                        <DropDown title="Data that is given to us by you">
                            <ol className="mt-3 ml-5 list-decimal list-outside" start ="7">
                                <li><p className="ml-2">V-Land Magazine Limited will collect your Data in a number of ways, for example:</p>
                                    <ol className="list-[lower-alpha] mt-3 ml-10 list-outside">
                                        <li><p className="ml-2">when you contact us through the Website, by telephone, post, e-mail or through any other means</p></li>
                                        <li><p className="ml-2">when you elect to receive marketing communications from us</p></li>
                                    </ol>
                                    <p className="ml-2 mt-3 inline-block">in each case, in accordance with this privacy policy.</p>
                                    
                                </li>
                            </ol>

                        </DropDown>
                        <DropDown title="Data that is collected automatically">
                            <ol className="mt-3 list-decimal list-outside ml-5" start="8">
                                <li><p className="ml-2">To the extent that you access the Website, we will collect your Data automatically, for example:</p>
                                    <ol className="list-[lower-alpha] mt-3 ml-10 list-outside">
                                        <li><p className="ml-2">we automatically collect some information about your visit to the Website. This information helps us to make
    improvements to Website content and navigation, and includes your IP address, the date, times and frequency with
    which you access the Website and the way you use and interact with its content.</p></li>

                                    </ol>
                                </li>
                            </ol>

                        </DropDown>
                        <DropDown title="Our use of data">
                            <ol className="list-decimal ml-5 mt-3 list-outside" start="9">
                                <li><p className="ml-2">Any or all of the above Data may be required by us from time to time in order to provide you with the best possible
                                service and experience when using our Website. Specifically, Data may be used by us for the following reasons:</p>
                                    <ol className="mt-3 ml-10 list-[lower-alpha] list-outside">
                                        <li><p className="ml-2">transmission by email of marketing materials that may be of interest to you</p></li>
                                    </ol>
                                    <p className="ml-2 mt-3">in each case, in accordance with this privacy policy.</p>
                                </li>
                                <li><p className=" mt-3 ml-2">We may use your Data for the above purposes if we deem it necessary to do so for our legitimate interests. If you are
                                not satisfied with this, you have the right to object in certain circumstances (see the section headed &quot;Your rights&quot;
                                below).</p></li>
                                <li className="mt-3"><p className="ml-2">For the delivery of direct marketing to you via e-mail, we&apos;ll need your consent, whether via an opt-in or soft-opt-in:</p>
                                    <ol className="list-[lower-alpha] list-outside mt-3 ml-10">
                                        <li className="mb-3"><p className="ml-2">soft opt-in consent is a specific type of consent which applies when you have previously engaged with us (for
                                        example, you contact us to ask us for more details about a particular product/service, and we are marketing similar
                                        products/services). Under &quot;soft opt-in&quot; consent, we will take your consent as given unless you opt-out.</p></li>
                                        <li className="mb-3"><p className="ml-2">for other types of e-marketing, we are required to obtain your explicit consent; that is, you need to take positive
                                        and affirmative action when consenting by, for example, checking a tick box that we&apos;ll provide.</p></li>
                                        <li className="mb-3"><p className="ml-2">if you are not satisfied with our approach to marketing, you have the right to withdraw consent at any time. To
                                        find out how to withdraw your consent, see the section headed &quot;Your rights&quot; below.</p></li>
                                    </ol>
                                </li>

                            </ol>

                        </DropDown>
                        <DropDown title="Keeping data secure">
                            <ol className="ml-6 mt-3 list-decimal list-outside"  start="12">
                                <li><p className="ml-2">We will use technical and organisational measures to safeguard your Data, for example:</p>
                                    <ol className="mt-3 ml-10 list-[lower-alpha] list-outside">
                                        <li className="mb-3"><p className="ml-2">access to your account is controlled by a password and a user name that is unique to you.</p></li>
                                        <li><p className="ml-2">we store your Data on secure servers.</p></li>
                                    </ol>
                                </li>
                                <li className="mt-3"><p className="ml-2">We are certified to Strapi. This family of standards helps us manage your Data and keep it secure.</p></li>
                                <li className="mt-3"><p className="ml-2">Technical and organisational measures include measures to deal with any suspected data breach. If you suspect any
                                misuse or loss or unauthorised access to your Data, please let us know immediately by contacting us via this e-mail
                                address:{" "}<a href="mailto:contact@v-landmagazine.com" className="underline">contact@v-landmagazine.com.</a></p></li>
                                <li className="mt-3"><p className="ml-2">If you want detailed information from Get Safe Online on how to protect your information and your computers and
                                devices against fraud, identity theft, viruses and many other online problems, please visit www.getsafeonline.org. Get
                                Safe Online is supported by HM Government and leading businesses.</p></li>
                            </ol>

                        </DropDown>
                        <DropDown title="Data retention">
                            <ol className="mt-3 ml-6 list-outside list-decimal" start="16">
                                <li><p className="ml-2">Unless a longer retention period is required or permitted by law, we will only hold your Data on our systems for the
                                period necessary to fulfil the purposes outlined in this privacy policy or until you request that the Data be deleted.</p></li>
                                <li className="mt-3"><p className="ml-2">Even if we delete your Data, it may persist on backup or archival media for legal, tax or regulatory purposes.</p></li>
                            </ol>

                        </DropDown>
                        <DropDown title="Your rights">
                            <ol className="mt-3 ml-6 list-outside list-decimal" start="18">
                                <li><p className="ml-2">You have the following rights in relation to your Data:</p>
                                    <ol className="list-[lower-alpha] list-outside ml-10 mt-3">
                                        <li><p className="ml-2"><span className="font-bold">Right to access{" "}</span> - the right to request (i) copies of the information we hold about you at any time, or (ii) that we
                                        modify, update or delete such information. If we provide you with access to the information we hold about you,
                                        we will not charge you for this, unless your request is &quot;manifestly unfounded or excessive.&quot; Where we are legally
                                        permitted to do so, we may refuse your request. If we refuse your request, we will tell you the reasons why.</p></li>
                                        <li><p className="ml-2"><span className="font-bold">Right to correct{" "}</span>- the right to have your Data rectified if it is inaccurate or incomplete.</p></li>
                                        <li><p className="ml-2"><span className="font-bold">Right to erase{" "}</span>the right to request that we delete or remove your Data from our systems.</p></li>
                                        <li><p className="ml-2"><span className="font-bold">Right to restrict our use of your data{" "}</span> - the right to &quot;block&quot; us from using your Data or limit the way in which
                                            we can use it.</p></li>
                                        <li><p className="ml-2"><span className="font-bold">Right to data portability{" "}</span> - the right to request that we move, copy or transfer your Data.</p></li>
                                        <li><p className="ml-2"><span className="font-bold">Right to object{" "}</span> - the right to object to our use of your Data including where we use it for our legitimate interests.</p></li>
                                    </ol>
                                </li>
                                <li className="mt-3"><p className="ml-2">To make enquiries, exercise any of your rights set out above, or withdraw your consent to the processing of your Data
                                (where consent is our, legal basis for processing your Data), please contact us via this e-mail address:{" "}<a href="mailto:contact@v-landmagazine.com" className="underline">contact@v-landmagazine.com.</a></p></li>
                                <li className="mt-3"><p className="ml-2">If you are not satisfied with the way a complaint you make in relation to your Data is handled by us, you may be able
                                to refer your complaint to the relevant data protection authority. For the USA, this is the Information Commissioner&apos;s
                                Office (ICO). The ICO&apos;s contact details can be found on their website at https://ico.org.uk/.</p></li>
                                <li className="mt-3"><p className="ml-2">It is important that the Data we hold about you is accurate and current. Please keep us informed if your Data changes
                                during the period for which we hold it.</p></li>
                            </ol>

                        </DropDown>
                        <DropDown title="Links to other websites">
                            <ol className="list-decimal list-outside mt-3 ml-6" start="22">
                                <li><p className="ml-2">This Website may, from time to time, provide links to other websites. We have no control over such websites and are
                            not responsible for the content of these websites. This privacy policy does not extend to your use of such websites. You
                            are advised to read the privacy policy or statement of other websites prior to using them.</p></li>
                            </ol>

                        </DropDown>
                        <DropDown title="Changes of business ownership and control">
                            <ol className="list-decimal list-outside mt-3 ml-6" start="23">
                                <li><p className="ml-2">V-Land Magazine Limited may, from time to time, expand or reduce our business and this may involve the sale and/or
                                the transfer of control of all or part of V-Land Magazine Limited. Data provided by Users will, where it is relevant to any part of our business so transferred, be transferred along with that part and the new owner or newly controlling party
                                will, under the terms of this privacy policy, be permitted to use the Data for the purposes for which it was originally
                                supplied to us.</p></li>
                                <li className="mt-3"><p className="ml-2">We may also disclose Data to a prospective purchaser of our business or any part of it.</p></li>
                                <li className="mt-3"><p className="ml-2">In the above instances, we will take steps with the aim of ensuring your privacy is protected.</p></li>
                                
                            </ol>

                        </DropDown>
                        <DropDown title="General">
                            <ol className="list-decimal list-outside mt-3 ml-6" start="26">
                                <li><p className="ml-2">You may not transfer any of your rights under this privacy policy to any other person. We may transfer our rights
                                under this privacy policy where we reasonably believe your rights will not be affected.</p></li>
                                <li className="mt-3"><p className="ml-2">If any court or competent authority finds that any provision of this privacy policy (or part of any provision) is invalid,
                                illegal or unenforceable, that provision or part-provision will, to the extent required, be deemed to be deleted, and the
                                validity and enforceability of the other provisions of this privacy policy will not be affected.</p></li>
                                <li className="mt-3"><p className="ml-2">Unless otherwise agreed, no delay, act or omission by a party in exercising any right or remedy will be deemed a
                                waiver of that, or any other, right or remedy.</p></li>
                                <li className="mt-3"><p className="ml-2">This Agreement will be governed by and interpreted according to the law of England and Wales. All disputes arising
                                under the Agreement will be subject to the exclusive jurisdiction of the English and Welsh courts</p></li>
                                
                            </ol>

                        </DropDown>
                        <DropDown title="Changes to this privacy policy">
                            <ol className="list-decimal list-outside mt-3 ml-6" start="30">
                                <li><p className="ml-2">V-Land Magazine Limited reserves the right to change this privacy policy as we may deem necessary from time to
                                time or as may be required by law. Any changes will be immediately posted on the Website and you are deemed to
                                have accepted the terms of the privacy policy on your first use of the Website following the alterations.
                                <br></br>
                                <br></br>
                                You may contact V-Land Magazine Limited by email at {" "}<a href="mailto:contact@v-landmagazine.com" className="underline">contact@v-landmagazine.com</a>
                                </p></li>
                            </ol>

                        </DropDown>
                        
                         
                    </section>

                </section>

            </main>


        </Layout>
    )
}

export default PrivacyPolicy;