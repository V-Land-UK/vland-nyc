import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import Back from "../components/Back";
import { API } from "../config/api";
import Layout from "../defaults/Layout";
const parse = require("html-react-parser");

const About = ({ about }) => {
  return (
    <Layout
      title="About Us"
      desc="V-Land UK was founded with a passion for advocating the many benefits of living a vegan lifestyle, and sharing that passion with readers worldwide.
    "
    >
      <Back />
      <main className="w-[95%] lg:w-4/5 mx-auto mt-3">
        <h1 className="text-3xl lg:text-3xl text-primary font-bold mt-4 lg:mt-7">
          About V-Land UK
        </h1>
        <div className="text-[16px] pt-3 lg:text-lg text-black tracking-wide leading-relaxed poppins my-2 whitespace-pre-line about">
          {about && parse(about)}
        </div>
      </main>
    </Layout>
  );
};

export async function getStaticProps() {
  const response = await fetch(`${API}/about`);
  const data = await response.json();

  return {
    props: {
      about: data?.data?.attributes?.about || null,
    },
    revalidate: 10,
  };
}

export default About;
