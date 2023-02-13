import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useContractRead } from "@thirdweb-dev/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import icon from "../assets/images/icon.png";

const UserStickers = ({contract, wallet, collection}) => {
  const [ userStickers, setUserStickers ] = useState({});
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

  const countries = ['Argentina', 'Australia', 'Belgium', 'Brazil', 'Cameroon', 'Canada', 'Costa Rica', 'Croatia', 'Denmark', 'Ecuador', 'England', 'France', 'Germany', 'Ghana', 'Iran', 'Japan', 'Mexico', 'Morocco', 'Netherlands', 'Poland', 'Portugal', 'Qatar', 'Saudi Arabia', 'Senegal', 'Serbia', 'South Korea', 'Spain', 'Switzerland', 'Tunisia', 'Uruguay', 'USA', 'Wales'];
  const album = {};
  countries.forEach(c => {
    album[c] = {
      Home: '',
      Away: '',
      Goalkeeper: ''
    };
  });

  const tokenIds = collection.filter(s => Number(s[5]) > 0).map(s => s[6]);
  
  const {
    data: stickerBalance, isLoading: isStickerBalanceLoading
  } = useContractRead(contract, 'balanceOfBatch', tokenIds.map(t => wallet), tokenIds);

  useEffect(() => {
    if (!stickerBalance || stickerBalance.length === 0) return;
    let stickersAvailable = {};
    countries.forEach(c => {
      stickersAvailable[c] = {
        Home: [],
        Away: [],
        Goalkeeper: []
      };
    });
    stickerBalance.forEach((s, i) => {
      if (s.toNumber() === 0) return;
      const stickerData = collection.find(sd => sd[6] === tokenIds[i]);
      const country = stickerData[1];
      stickersAvailable[country][stickerData[3]].push({
        tokenId: tokenIds[i],
        quantity: s.toNumber(),
        country: stickerData[1],
        type: stickerData[3],
        number: stickerData[7],
        name: stickerData[12],
        active: !stickersAvailable[country][stickerData[3]].find(s => s.active)
      })
    });
    setUserStickers(stickersAvailable);
  }, [stickerBalance])

  const setStickerActive = (sticker) => {
    const stickers = { ...userStickers };
    stickers[sticker.country][sticker.type].map(s => s.active = false);
    stickers[sticker.country][sticker.type].find(s => s.tokenId === sticker.tokenId).active = true;
    setUserStickers(stickers);
  }

  const CountryStickers = ({country}) => {
    const stickers = userStickers[country];
    return (
      <div className="flex flex-col gap-2 ">
        <div className="border-neutral-300 border px-2 py-2">
          <img src={`/image/flag/${country}.jpg`} className="h-6 mr-2 -my-2 inline-block" alt={country} /> {country}
        </div>
        <div className="flex flex-row gap-2">
          { ['Home', 'Away', 'Goalkeeper'].map(t => 
            <div className="flex flex-col w-1/3 aspect-[0.8] border-neutral-300 border justify-center items-center gap-4 bg-neutral-900">
              { stickers && stickers[t].length > 0 ? 
                <React.Fragment>
                  <GatsbyImage className="rounded-t-md inline-block w-full" image={getImage(stickerImg.allFile.edges.find(e => e.node.name === stickers[t].find(s => s.active).tokenId).node)} alt={stickers[t].find(s => s.active).tokenId} />
                </React.Fragment>
                : 
                <React.Fragment>
                  <img src={icon} className="brightness-[0.3] w-1/2" alt="Pixel Cup Sticker" />
                  <span className="uppercase text-neutral-500">{t}</span>
                </React.Fragment>
              }
            </div>
          )}
        </div>
        <div className="flex flex-row gap-2">
          { ['Home', 'Away', 'Goalkeeper'].map(t => 
            <div className="flex flex-col w-1/3">
              { stickers && stickers[t].length > 0 ? 
                <div className="flex flex-row gap-2 justify-center items-center">
                  {stickers[t].map(s => 
                    <button className="cursor-pointer text-xl" onClick={() => setStickerActive(s)}>•</button>
                  )}
                </div>
              : null }
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div id="stickers" className="mt-4">
      {isStickerBalanceLoading && <p><FontAwesomeIcon icon={faSpinner} className="fa-spin mr-2" /> Loading your collection ... </p>}
      {!isStickerBalanceLoading && <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {countries.map(c => <CountryStickers country={c} key={c} />)}
      </div> }
    </div>
  );
};

export default UserStickers;