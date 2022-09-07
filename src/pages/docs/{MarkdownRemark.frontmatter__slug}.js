import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { faTwitter, faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons"

import logo from "../../images/logo.png";

const DocLink = (props) => <Link to={props.to} className={`block px-4 py-2 my-2 transform hover:bg-neutral-700 transition duration-300 ${props.active && 'bg-neutral-700'} rounded-md`}>{props.children}</Link>;
const DocRec = ({doc, next = false}) => (
  <Link className="border-lime-400 hover:bg-lime-400 hover:text-neutral-800 border basis-1/2 rounded-md py px-4 py-4 transition duration-300" to={`/docs${doc.node.frontmatter.slug}`}>
    <FontAwesomeIcon icon={next ? faArrowRight : faArrowLeft} size="xl" className={next ? 'float-right' : 'float-left'} />
    <span className={next ? 'float-left' : 'float-right'}>{doc.node.frontmatter.title}</span>
  </Link>
);

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const { allMarkdownRemark: { edges: allDocs } } = data;
  console.log('Path: ', path)
  const docLinks = allDocs.filter(doc => doc.node.frontmatter.slug).map((doc, i) => {
    const slug = `/docs${doc.node.frontmatter.slug}`
    return (
      <li key={slug}><DocLink active={path === slug} to={slug}>{doc.node.frontmatter.title}</DocLink></li>
    )
  });
  const { markdownRemark } = data;
  const currentIndex = allDocs.findIndex(doc => doc.node.frontmatter.slug === markdownRemark.frontmatter.slug);
  let nextDoc = null;
  let prevDoc = null;
  if (currentIndex > 0) {
    prevDoc = allDocs[currentIndex-1];
  }
  if (currentIndex < (allDocs.length - 1)) {
    nextDoc = allDocs[currentIndex+1];
  }
  const { html } = markdownRemark
  const [mobileMenuVisible, showMobileMenu] = useState(false);

  return (
    <React.Fragment>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-row">
          <div className={`fixed ${mobileMenuVisible ? 'block' : 'hidden'} md:block bg-neutral-900 md:fixed min-w-fit h-screen overflow-auto md:basis-1/4 pt-10 pb-10 z-40`}>
            <div className="hidden md:block">
              <Link to="/"><img className="w-1/3 mx-auto max-w-xs" src={logo} alt="The Pixel Cup" /></Link>
            </div>
            <div className="mt-10">
              <ul>
                {docLinks}
              </ul>
            </div>
            <div className="flex px-4 flex-row mt-10 space-x-4 text-lime-400 items-center">
              <p className="w-28 uppercase text-sm">Join the community</p>
              <FontAwesomeIcon icon={faDiscord} size="xl" />
              <OutboundLink href="https://twitter.com/the_pixelcup" rel="noreferrer" target="_blank" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} size="xl" />
              </OutboundLink>
              <OutboundLink href="https://github.com/thepixelcup" rel="noreferrer" target="_blank" aria-label="Github">
                <FontAwesomeIcon icon={faGithub} size="xl" />
              </OutboundLink>
            </div>
          </div>
          <div className="doc md:basis-3/4 px-4 mt-20 md:mt-10 md:ml-72 pb-10">
            <div className="md:hidden z-40 fixed left-0 top-0 py-4 px-4 bg-neutral-900 drop-shadow-md w-full border-b border-b-neutral-700">
              <FontAwesomeIcon className="cursor-pointer" onClick={() => showMobileMenu(!mobileMenuVisible)} icon={faBars} size="xl" />
              <Link to="/" className="uppercase ml-4">The Pixel Cup</Link>
            </div>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-12">
              {prevDoc &&  <DocRec doc={prevDoc} />}
              {nextDoc && <DocRec doc={nextDoc} next="true" />}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
        title,
        order
      }
    }
    allMarkdownRemark(sort: {order: ASC, fields: frontmatter___order}) {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`