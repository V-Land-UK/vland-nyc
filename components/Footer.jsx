/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { API, BASE_URL } from "../config/api";
import Icon from "./Icon";
import Loader from "./Loader";
import { subscribeUser } from "@strapi-newsletter/react";
import { toast, ToastContainer } from "react-toastify";

const Footer = () => {
  const [Mail, setMail] = useState("");
  const [Loading, setLoading] = useState(false);

  //Get current year
  const year = new Date().getFullYear();

  //Toast options
  const options = {
    position: "top-right",
    autoClose: 4000,
    draggable: true,
    pauseOnHover: true,
    closeOnClick: true,
  };

  //Handle form submission
  const emailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = `${BASE_URL}`;
    const email = Mail.toLowerCase();

    subscribeUser(email, url)
      .then((res) => {
        setMail("");
        setLoading(false);
        toast.success("Welcome aboard! 🎉", options);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Something went wrong, please try again 🥲", options);
      });
  };
  return (
    <footer className="w-full bg-neutral-50 bg-opacity-70 text-neutral-800 py-12 lg:py-16 px-4 mt-[8vh] lg:mt-[10vh]">
      <div className="w-full lg:w-4/6 2xl:w-3/5 mx-auto flex flex-col lg:flex-row gap-12 lg:gap-14 items-center justify-center lg:justify-evenly">
        {/* Sitemap */}
        <div className="flex justify-center items-center lg:gap-5">
          <div className="flex flex-col items-center justify-center px-4 gap-4 lg:gap-3">
            <Link href={"/"} replace>
              <img
                src="/vland_nyc_logo.png"
                alt="Header"
                className="w-[80px] sm:w-[115px] object-contain"
              />
            </Link>

            <div className="flex gap-2 lg:gap-2">
              <Icon url="http://instagram.com/vlanduk">
                <FaInstagram size={13} />
              </Icon>
              <Icon url="https://www.facebook.com/V-Land-UK-100137252369546">
                <FaFacebookF size={13} />
              </Icon>
              <Icon url="https://twitter.com/vlandukmag">
                <FaTwitter size={13} />
              </Icon>
              <Icon url="https://www.linkedin.com/company/v-land-uk">
                <FaLinkedinIn size={13} />
              </Icon>
            </div>
          </div>

          <div className="h-full flex flex-col justify-center gap-2 border-l-2 border-primary text-sm py-2 lg:py-4 px-4 font-bold">
            <div className="hover:text-primary hover:translate-x-1 transition-all">
              <Link href="/">Home</Link>
            </div>

            <div className="hover:text-primary hover:translate-x-1 transition-all">
              <Link href="/about">About</Link>
            </div>

            <div className="hover:text-primary hover:translate-x-1 transition-all">
              <Link href="/team">Team</Link>
            </div>

            <div className="hover:text-primary hover:translate-x-1 transition-all">
              <Link href="/contact">Contact</Link>
            </div>
            <div className="hover:text-primary hover:translate-x-1 transition-all">
              <Link href="/donate">Support us</Link>
            </div>

            {/*<div className="hover:text-primary hover:translate-x-1 transition-all">
              <Link href="https://www.v-landeurope.com/">V-Land Europe</Link>
            </div>*/}
          </div>
        </div>

        {/* Email subscriptions */}
        <div className="lg:w-[60%] 2xl:w-3/6">
          <h2 className="text-4xl lg:text-4xl font-[800] text-center lg:text-left mb-1 px-1 lg:px-2">
            Newsletter
          </h2>
          <h4 className="w-[95%] mx-auto text-black  text-[11px] lg:text-xs font-normal tracking-wider text-center lg:text-left my-5">
            {/* We’ll keep you updated on new information, upcoming events, and the
            best deals in your area. */}
            Never miss out on exclusive articles, deals, and giveaways.
          </h4>
          <form
            onSubmit={emailSubmit}
            className="w-[90%] mx-auto lg:w-full lg:mx-0 flex border-[1px] border-neutral-800 gap-2 px-1 py-1 rounded-3xl lg:rounded-[2rem]"
          >
            <input
              name="email"
              type="email"
              className="w-full bg-transparent text-sm focus:outline-none poppins placeholder-neutral-800 placeholder-opacity-30 font-medium px-3 lg:px-4 rounded-3xl"
              placeholder="Email address"
              value={Mail}
              onChange={(e) => setMail(e.target.value)}
              required
            />
            <button
              type="submit"
              name="Subscribe"
              className="bg-neutral-800 hover:text-neutral-800 hover:bg-primary hover:bg-opacity-10 transition-all text-white text-xs font-semibold rounded-3xl poppins px-5 py-3 lg:py-4"
            >
              {Loading ? <Loader /> : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
      <div className="text-[10px] text-center font-medium lg:font-medium poppins mt-10 lg:mt-12">
        <div className="inline-block w-[50%] text-center m-auto">
          {/* {year} */}
          William Callaghan Group Ltd &copy; All Rights Reserved.{" "}
          {/* <a
            href="https://twitter.com/trulyao"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary hover:underline font-semibold"
          >
            Ayodeji
          </a> */}
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
