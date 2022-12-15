import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useContractRead } from "@thirdweb-dev/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const CountryFlag = ({flag, total, onClick, active}) => {
  return (
    <button onClick={onClick} className={`border border-neutral-300 px-4 py-2 inline-block rounded-lg hover:bg-lime-400 hover:text-neutral-800 ${active && 'bg-lime-400 text-neutral-800'}`}>
      <img src={`/image/flag/${flag}.jpg`} className="h-3 mr-2 inline-block" alt={flag} /> {total}
    </button>
  )
};

const UserStickers = ({contract, wallet, collection}) => {
  const [ userStickers, setUserStickers ] = useState([]);
  const [ filterStickers, setFilterStickers ] = useState([]);
  const [ stickerCountries, setStickerCountries ] = useState({});
  const [ activeCountry, setActiveCountry ] = useState(null);
  const stickerImg = useStaticQuery(graphql`
    query StickerImages {
      allFile(filter: {sourceInstanceName: {eq: "stickers"}}) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(width: 320)
            }
          }
        }
      }
    }
  `)

  const tokenIds = collection.filter(s => Number(s[5]) > 0).map(s => s[6]);
  
  const {
    data: stickerBalance, isLoading: isStickerBalanceLoading
  } = useContractRead(contract, 'balanceOfBatch', tokenIds.map(t => wallet), tokenIds);

  useEffect(() => {
    if (!stickerBalance || stickerBalance.length === 0) return;
    let stickersAvailable = [];
    stickerBalance.forEach((s, i) => {
      if (s.toNumber() === 0) return;
      // Hay sticker
      const stickerData = collection.find(sd => sd[6] === tokenIds[i]);
      stickersAvailable.push({
        tokenId: tokenIds[i],
        quantity: s.toNumber(),
        country: stickerData[1],
        type: stickerData[3],
        number: stickerData[7],
        name: stickerData[12]
      })
    });
    let countries = {};
    stickersAvailable.forEach((s, i) => {
      if (!countries[s.country]) {
        countries[s.country] = 0;
      }
      countries[s.country] += s.quantity;
    });

    setUserStickers(stickersAvailable);
    setFilterStickers(stickersAvailable);
    setStickerCountries(countries);
  }, [stickerBalance])

  function filterByCountr(c) {
    if (activeCountry === c) {
      setActiveCountry(null); // reset
      setFilterStickers([...userStickers]);
    } else {
      setActiveCountry(c);
      setFilterStickers([...userStickers.filter(s => s.country === c)]);
    }
  }

  const Sticker = ({token}) => {
    const image = stickerImg.allFile.edges.find(e => e.node.name === token);
    const data = userStickers.find(s => s.tokenId === token);
    return (
      <div className="rounded-md border shadow-md bg-neutral-900 border-neutral-500 scale-100 hover:scale-105 ease-in duration-100">
        <GatsbyImage className="rounded-t-md" image={getImage(image.node)} alt={token} />
        <div className="mx-4 my-3">
          <span className="block truncate">{data.country} | {data.type}</span>
          <span className="block truncate">{data.name}</span>
        </div>
      </div>
    )
  };

  return (
    <div id="stickers" className="mt-4">
      {isStickerBalanceLoading && <p><FontAwesomeIcon icon={faSpinner} className="fa-spin mr-2" /> Loading your collection ... </p>}
      {!isStickerBalanceLoading && <div>
        <div className="grid md:grid-cols-12 gap-2 grid-cols-4">
          { Object.keys(stickerCountries).map(c => <CountryFlag active={activeCountry === c} onClick={() => filterByCountr(c)} key={c} flag={c} total={stickerCountries[c]} />)}
        </div>
        <h1 className="text-xl my-4">{activeCountry ? activeCountry : 'All stickers'}</h1>
        {filterStickers.length === 0 && <p>You don't have any stickers yet. Open a pack to get 3 random stickers</p>}
        <div className="mt-4 grid md:grid-cols-5 gap-4 grid-cols-2">
          { filterStickers.map(s => <Sticker key={s.tokenId} token={s.tokenId} />) }
        </div>
      </div> }
    </div>
  );
};

export default UserStickers;