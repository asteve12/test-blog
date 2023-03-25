import React from 'react';
import Redarrow from '../../public/img/arrow-right.svg';
  
// import Redarrow from "../../assets/img/arrow-right.svg";
//import Twitter from "../../public/img/twitter-community.svg";
//import Discord from "../../public/img/discord-community.svg";
//import LinkedIn from "../../public/img/linkedin-community.svg";
// import Tiktok from "../../assets/img/tiktok-community.svg";
//import IG from "../../public/img/instagram-community.svg";

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Heading, Image,Text,Box, Flex, SimpleGrid} from '@chakra-ui/react';

const community = () => {
  const { t } = useTranslation('common');
  const communityCard = [
    {
      id: 1,
      image: '/img/twitter-community.svg',
      header: 'Twitter',
      text: t('community.socials_twitter_follow'),
      linkText: t('community.socials_visit'),
      linkImage: Redarrow,
      socialLink: 'https://twitter.com/gruvetickets'
    },
    {
      id: 2,
      image: '/img/discord-community.svg',
      header: 'Discord',
      text: t('community.socials_discord_follow'),
      linkText: t('community.socials_visit'),
      linkImage: Redarrow,
      socialLink: 'https://discord.gg/PYzVKPJ6'
    },
    {
      id: 3,
      image: '/img/linkedin-community.svg',
      header: 'LinkedIn',
      text: t('community.socials_linkedIn_follow'),
      linkText: t('community.socials_visit'),
      linkImage: Redarrow,
      socialLink: 'https://www.linkedin.com/company/gruve-tickets/'
    },
    // {
    //   id: 4,
    //   image: Tiktok,
    //   header: "Tiktok",
    //   text: "Follow us in tiktok and let's get gruvvy!",
    //   linkText: "Visit now",
    //   linkImage: Redarrow,
    //   socialLink: "",
    // },
    {
      id: 5,
      image: '/img/instagram-community.svg',
      header: 'Instagram',
      text: t('community.socials_Instagram_follow'),
      linkText: t('community.socials_visit'),
      linkImage: Redarrow,
      socialLink: ''
    }
  ];

  return (
    <Box className="community-container" fontFamily="satoshi" mt="50px"  boxSizing='border-box' > 
      <Heading
        //className="margin-0 community-h"
        textAlign="center"
       
        fontFamily="satoshi black"
        fontSize={['3.2rem', '4.2rem', '5.2rem', '7.2rem']}>{t('community.join_community')}</Heading>

      {/* <div className="community-header center">
      </div> */}

      <Text 
        ml="auto"
        mr="auto"
        mb="30px"
      textAlign="center"
        w={["60%", "55%", "40%"]} color="#666481" 
         display="block" fontSize={["1.4rem", "1.5rem", "1.6rem", "1.8rem"]}>{t('community.hype')}</Text>


      {/* <div  className="community-text center">
      </div> */}

      <Box
        id="cards-none"
        //className="community-cards-container flex"
        
        display="flex"
        justifyContent="center" 
        w="100%" flexWrap="nowrap"
      >
        <SimpleGrid 
          spacing={["0rem", "8rem", "20px", "10rem"]}
         
          alignItems="center"
          w={["100%", "80%", "80%", "52%"]}
          minChildWidth={["389px","100px","160px","100px"]}
          ml="auto"
          mr="auto"
         
          
        >
        
        {communityCard.map(({ id, image, header, text, linkText, linkImage, socialLink }) => {
          return (
            <Link href={socialLink} key={id} className="community-card">
              <Flex alignItems="center" justifyContent="center" w="100%"
                mb="10px"
                
              >
              
                <Image  w="40px" h="40px" mb="10px" ml="auto" mr="auto" src={image} alt="socials logo 12" />
              </Flex>

              <div className="community-card-header center">
                <h3 className="margin-0 community-card-h">{header}</h3>
              </div>

              <div className="community-card-text center">
                <p className="margin-0 community-card-p">{text}</p>
              </div>

              {/* eslint-disable-next-line */}
              <div className="community-card-link">
                <div className="visit-now flex">
                  <div className="visit-now-text">
                    <h3 className="margin-0 visit-now-h">{linkText}</h3>
                  </div>

                  <span className="visit-icon">
                    <Image src={linkImage} loading="lazy" alt="" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </SimpleGrid>
      </Box>

     

      <Box id="cards-icon"  w={['',"100%"]}>
        <div className="cards-icon flex">
          {communityCard.map(({ id, image, socialLink }) => {
            return (
              <div key={id} className="community-card-icon">
                {/* eslint-disable-next-line */}
                <Link href={socialLink} target="_blank" rel="noopener noreferrer">
                  <Image src={image} alt="socila logo" />
                </Link>
              </div>
            );
          })}
        </div>
      </Box>
    </Box>
  );
};

export default community;
