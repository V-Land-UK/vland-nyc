import axios from "axios";
import { API } from "../config/api";

const parse = require("html-react-parser");

const cookiePolicy =({statement, cookies})=>{
    

    return(

        <div className="w-[80%] mx-auto list-outside">
            {statement && parse(statement)}
        </div>
    )
}




export async function getStaticProps(){
    const response = await fetch(`${API}/cookie-policy`);
    const data = await response.json();
    
    
 
    return {
        
        props: {
            statement:data?.data?.attributes?.statement || null,
            cookies: data?.data?.attributes?.StatementInParts || null
        }

    };
    
   


}

export default cookiePolicy;