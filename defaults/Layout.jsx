/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { Fade as Hamburger } from "hamburger-react";
import debounce from "lodash.debounce";

import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  DrawerHeader,
  Box,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";
import { useScrollDirection } from "react-use-scroll-direction";
import NavLink from "../components/NavLink";
import { AnimatePresence, motion } from "framer-motion";
import NavMenu from "../components/NavMenu";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import SearchCard from "../components/SearchCard";
import Icon from "../components/Icon";
const qs = require("qs");
import { GlobalContext } from "../context/GlobalContext";
import CookieSetupPrompt from "../components/CookieSetupPrompt";
import { getCookie } from "../lib/utils";
import AdUnit from "../components/AdUnit";

const Layout = ({
  children,
  title,
  desc,
  metaTitle,
  canonicalUrl,
  metaDescription,
  keywords,
  image,
}) => {
  const router = useRouter();
  const { Categories } = useContext(GlobalContext);
  const { isScrollingUp, isScrollingDown, isScrolling } = useScrollDirection();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Open, setOpen] = useState(false);
  const [Nav, setNav] = useState(true);
  const [Query, setQuery] = useState("");
  const [MobileQuery, setMobileQuery] = useState("");
  const [preferences_set, setPreferences_set] = useState(true);
  //Function to toggle drawer
  const toggleDrawer = () => {
    onOpen();
  };

  //check whether cookies preferences have been set by user
  useEffect(() => {
    getCookie("preferences-set")
      ? setPreferences_set(true)
      : setPreferences_set(false);
  }, []);

  //Event listener for the links
  useEffect(() => {
    if (!isScrolling && scrollY < 150) {
      setNav(true);
    }
    isScrollingDown && setNav(false);
    isScrollingUp && setNav(true);
  }, [isScrollingDown, isScrollingUp, isScrolling]);

  //Search query
  const searchQuery = qs.stringify({
    q: MobileQuery,
  });
  const searchLink = `/search?${searchQuery}`;

  const updateSearchQuery = (e) => {
    setQuery(e.target.value);
  };

  //wait half a sec later to ensure all input has been entered before fetching from server
  const debouncedOnChange = debounce(updateSearchQuery, 500);

  return (
    <>
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="google-site-verification"
          content="nMcgclVIYZbbksryEI2ihhobvvAS4X6FXkHvhY9YYjI"
        />

        <meta name="theme-color" content="#FFFFFF" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={metaDescription || desc} />
        <link rel="shortcut icon" href="favicon.ico" />
        <link
          rel="apple-touch-icon"
          type="image/png"
          href="touch-icon-iphone.png"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="76x76"
          href="touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="120x120"
          href="touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="152x152"
          href="touch-icon-ipad-retina.png"
        />

        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={metaTitle || title} />
        <meta property="og:description" content={metaDescription || desc} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={canonicalUrl || "https://v-landnyc.com"}
        />
        <meta property="og:image" content={image} />

        <meta property="og:site_name" content="V-Land" />
        <meta property="og:site" content="https://v-landnyc.com" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={canonicalUrl || "https://v-landnyc.com"}
        />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={desc} />
        <meta property="twitter:image" content={image} />

        <title>{title}</title>
      </Head>

      <nav className="bg-transparent w-screen h-auto fixed top-0 drop-shadow-md z-[999]">
        <div className="relative bg-white flex lg:grid lg:grid-cols-3 lg:justify-items-center justify-between items-center py-1 px-5 lg:px-8 z-[999]">
          <div className="items-center space-x-4 hidden lg:block lg:place-self-start lg:self-center">
            <NavMenu />
          </div>
          <Link href="/" passHref>
            <a className=" no-underline block relative h-[8vh] lg:h-[9vh] py-[1.8vh] lg:py-[1.5vh] cursor-pointer">
              <img src="/vland_nyc_logo.png" alt="Header" className="h-full" />
            </a>
          </Link>
          <div className="lg:hidden">
            <Hamburger color="#000" rounded size={30} toggle={toggleDrawer} />
          </div>
          <div className="hidden lg:flex lg:flex-row-reverse w-[22vw] border-[1px] border-neutral-800 justify-between rounded-3xl overflow-hidden px-1 py-1 place-self-end self-center">
            <input
              name="SearchText"
              type="text"
              placeholder="Search anything..."
              className="w-full px-3 py-1 text-[16px] placeholder-neutral-300 text-neutral-800 focus:outline-none"
              // value={Query}
              onChange={debouncedOnChange}
            />
            <div className="text-neutral-800 h-auto aspect-square p-2 rounded-full">
              <BiSearch size={20} />
            </div>
          </div>
          <SearchCard Query={Query} setQuery={setQuery} />
        </div>
        <AnimatePresence>
          {Nav && (
            <motion.div
              initial={{ y: -45, originY: "top", zIndex: 0 }}
              animate={{ opacity: 1, y: 0, originY: "top", zIndex: 0 }}
              transition={{ duration: 0.2 }}
              exit={{ y: -45, originY: "top", zIndex: 0 }}
            >
              <div className="h-auto bg-neutral-50 flex gap-1 lg:gap-2 flex-nowrap 2xl:justify-center overflow-x-scroll py-[12px] px-4 lg:pr-0 pr-6">
                {/* <NavLink link="/">Home</NavLink> */}
                {Categories.filter(
                  (category) =>
                    category?.attributes?.name.toLowerCase() != "sponsored" &&
                    category?.attributes?.name !== "Ad Feature"
                ).map((category, index) => (
                  <NavLink
                    key={index}
                    link={`/category/${category?.attributes?.slug}`}
                  >
                    {category?.attributes?.name}
                  </NavLink>
                ))}

                {/* <NavLink link="/category/articles">Articles</NavLink>
                <NavLink link="/category/interviews">Interviews</NavLink>
                <NavLink link="/category/food-and-drink">Food & Drink</NavLink>
                <NavLink link="/category/lifestyle">Lifestyle</NavLink>
                <NavLink link="/category/fashion-and-beauty">
                  Fashion & Beauty
                </NavLink>
                <NavLink link="/category/health-and-wellbeing">
                  Health & Wellbeing
                </NavLink>
                <NavLink link="/category/shopping">Shopping</NavLink>
                <NavLink link="/category/entertainment">Entertainment</NavLink>
                <NavLink link="/category/environment">Environment</NavLink>
                <NavLink link="/category/recipes">Recipes</NavLink> */}
                {/* <NavLink link="/category/shoutout">Shoutout</NavLink> */}
                {/* <NavLink link="/category/europe">Europe</NavLink> */}
                {/* <NavLink link="/category/events">Events</NavLink> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {preferences_set || <CookieSetupPrompt />}

      <main className="w-[94%] lg:w-[98%] 2xl:w-11/12 mx-auto mt-[17vh] lg:mt-[18vh]">
        {children}
      </main>

      <Footer />
      {preferences_set}
      <AdUnit />

      {/* NAVIGATION DRAWER */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent style={{ backgroundColor: "white" }}>
          <DrawerCloseButton _focus={{ border: "none" }} />
          <DrawerHeader>
            <Box
              width="40%"
              mt={6}
              mb={8}
              mx="auto"
              onClick={() => router.push("/")}
            >
              <Link href={"/"} replace>
                <img src="/Header.svg" alt="Header" className="w-full" />
              </Link>
            </Box>
            <div className="bg-white flex border-[1px] border-neutral-800 justify-between rounded-3xl overflow-hidden px-1 py-1">
              <input
                name="SearchText"
                type="text"
                placeholder="Search anything..."
                className="w-full px-3 py-1 text-[16px] placeholder-neutral-300 text-neutral-800 focus:outline-none"
                onChange={(e) => setMobileQuery(e.target.value)}
              />
              <button
                className="bg-neutral-800 text-white h-auto aspect-square p-2 rounded-full"
                onClick={() => router.push(searchLink)}
              >
                <BiSearch size={20} />
              </button>
            </div>
          </DrawerHeader>
          <DrawerBody fontSize={18}>
            <div className="flex flex-col text-base font-bold gap-y-5 px-2">
              <Link href="/">
                <div className="hover:text-primary hover:translate-x-3 transition-all">
                  Home
                </div>
              </Link>

              <Link href="/about">
                <div className="hover:text-primary hover:translate-x-3 transition-all">
                  About
                </div>
              </Link>
              <Link href="/team">
                <div className="hover:text-primary hover:translate-x-3 transition-all">
                  Team
                </div>
              </Link>

              <Link href="/contact">
                <div className="hover:text-primary hover:translate-x-3 transition-all">
                  Contact
                </div>
              </Link>
              <Link href="/donate">
                <div className="hover:text-primary hover:translate-x-3 transition-all">
                  Support us
                </div>
              </Link>

              {/* <Link href="https://www.v-landeurope.com/">
                <div className="hover:text-primary hover:translate-x-3 transition-all">
                  V-Land Europe
                </div>
              </Link> */}

              <br />
              <h3 className="text-black text-[12px]">Follow us:</h3>

              <div className="flex py-1 space-x-4">
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "V-Land NYC",
  page: "Home",
  image: "Logo.JPG",
  keywords:
    "vegan magazine, vegan magazine NYC, vegan articles, veganism NYC, veganism in New York, rise of veganism NYC, best vegan magazine UK, NYC vegan magazine, v-land NYC, v land nyc, vland nyc, vland, v-land",
  desc: "Your trusted vegan magazine",
};
