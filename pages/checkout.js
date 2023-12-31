import { useState, useEffect} from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import formidable from "formidable";
import CheckoutForm from "../components/CheckoutForm"
import Back from '../components/Back';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Layout from '../defaults/Layout';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout = ({amt, frq, email}) =>
{
    const [clientSecret, setClientSecret] = useState("");
    const [transactionSucceeded, setTransactionSucceeded] = useState(false);
  
    useEffect(() => {
      if(frq === "single"){
        fetch("/api/create_payment_intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: [{ id: `${frq}_pledge`, amount:amt}] }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }
      else{
        fetch("/api/create_subscription_intent", {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({item:{amount: amt, email:email}})
        })
        .then((res)=> res.json())
        .then((data)=> {
          
          setClientSecret(data.clientSecret)
        })
        
      }
    }, []);

    useEffect(()=>{
      if(!clientSecret.split('').length){
        return;
      }
      const successParam = new URLSearchParams(window.location.search).get("redirect_status");

      successParam && successParam === "succeeded" && setTransactionSucceeded(true);
      
    },[clientSecret])
  
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };
  
    return (
      <>
        {clientSecret && transactionSucceeded ? (
          <Layout>
           
            <div className="w-full relative mt-[20%] text-center">
            
              <div className="relative w-[80%] mx-auto text-center">
                <FontAwesomeIcon className="text-primary w-[50px] h-[50px]" icon={faCheckCircle}></FontAwesomeIcon>
                <p className="text-[1rem] font-bold mt-2">Payment Succeeded!</p>
                <p className='mt-3 text-[1rem]'>we have received your donation of</p>
                <p className="text-[1rem] text-primary">{frq === "single" ? `£${amt}`: `£${amt}/mo.`}</p>
              </div>
            
            </div>
            
          </Layout>
        ):(
          <div className='relative w-[80%] mx-auto'>
            <div className='block w-[64%]  mx-auto lg:inline-block lg:border-gray-500 lg:align-top border-box lg:w-[50%] lg:pb-[100px]'>
              <div className="mt-5 max-w-[409.6px] mx-auto">
                <Back/>
              </div>
              <div className="mt-3 max-w-[409.6px] mx-auto">
                <h1 className="text-[1.25rem] lg:text-[1.563rem] font-bold">{frq === "single" ? "You've chosen to donate:": "You've chosen a monthly donation of:"}</h1>
                <h1 className="text-[1.25rem] lg:text-[1.563rem] text-primary font-bold">£{amt}</h1>
              </div>
            </div>
            <div className="relative lg:inline-block border-box w-[80%] payment-interface--ws mx-auto lg:w-[50%] py-[100px]">
              
                <div className="relative max-w-[409.6px] w-[80%] mx-auto">
                  
                  {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                      <CheckoutForm amt={amt} frq={frq}/>
                    </Elements>
                  )}
                </div>
              
            </div>
          </div>
        )}
      </>  
    );
}




export async function getServerSideProps({req, res, query})
{
  if(req.method === "POST"){
    const form = new formidable.IncomingForm();
    

    const data = new Promise((resolve,reject)=>{
      form.parse(req, (err, fields, files) => {
        if(err){
          reject(err);
        }
        const data = { amount: fields.amount || null,
                       frequency:fields.frequency || null,
                       email:fields.email || null
                      };
        resolve(data);
      })    
      
    });

    var {amount, frequency, email} = await data;
  }

  else{
    var {amount, frequency} = query;
  }
    
   
    


    
    
    
    
    if(!parseFloat(amount) || parseFloat(amount) < 0 || (frequency !== "single" && frequency !== "monthly")){
      return{
        redirect:{
          destination:"/donate",
          permanent:false
        }
      }
    }
    
    return {
        props:{
            amt:amount,
            frq: frequency,
            email: email || null
                 
        }
    };
}


export default Checkout;