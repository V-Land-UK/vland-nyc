import React from "react";
import Back from "../components/Back";
import Layout from "../defaults/Layout";

const Contact = () => {
  return (
    <Layout title="Contact us">
      <Back />
      <main className="poppins text-base font-normal lg:pt-6 lg:pb-[20vh]">
        <h1 className="text-3xl lg:text-3xl text-primary font-bold mt-4 lg:mt-7">
          Contact
        </h1>
        <h1 className="text-2xl lg:text-2xl text-primary font-bold mt-4 lg:mt-7 mb-1">
          Editorial
        </h1>
        If you are a business, event, public relations, or organization you can
        submit a story for consideration. Please send your pitch and press
        release to{" "}
        <a href="mailto:press@v-landnyc.email" className="email_txt">
          press@v-landnyc.email
        </a>
        .
        <p className="mt-2">
          If you are an individual who would like to submit an SEO-optimised
          article for consideration, please send it to{" "}
          <a href="mailto:submissions@v-landnyc.email" className="email_txt">
            submissions@v-landnyc.email
          </a>
          .
        </p>
        <h1 className="text-2xl lg:text-2xl text-primary font-bold mt-4 lg:mt-7 mb-1">
          Advertising
        </h1>
        For more information about advertising on our website and our social
        media accounts, email{" "}
        <a href="mailto:advertising@v-landnyc.email" className="email_txt">
          advertising@v-landnyc.email
        </a>
        <h1 className="text-2xl lg:text-2xl text-primary font-bold mt-4 lg:mt-7 mb-1">
          Events
        </h1>
        If you run a vegan or sustainable business and want to join V-Land UK
        events, email{" "}
        <a href="mailto:events@v-landnyc.email" className="email_txt">
          events@v-landnyc.email
        </a>{" "}
        for exclusive invitations and further information.
        <h1 className="text-2xl lg:text-2xl text-primary font-bold mt-4 lg:mt-7 mb-1">
          General comments and questions
        </h1>
        Comments and questions? Send an email to{" "}
        <a href="mailto:contact@v-landnyc.email" className="email_txt">
          contact@v-landnyc.email
        </a>
        .
      </main>
    </Layout>
  );
};

export default Contact;
