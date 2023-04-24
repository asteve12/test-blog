import React from 'react';
import Darklogo from '../../public/img/footer-logo-dark.svg';
import Fbdark from '../../public/img/fb-dark.svg';
import Igdark from '../../public/img/ig-dark.svg';
import Twitterdark from '../../public/img/twitter-dark.svg';
import Discordark from '../../public/img/discord-dark.svg';
import LinkedIndark from '../../public/img/linkedin-dark.svg';
import Tiktokdark from '../../public/img/tiktok-dark.svg';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Box, Flex } from '@chakra-ui/react';

const footer = () => {
  const { t } = useTranslation('common');

  const darkNav = [
    {
      id: 1,
      text: t('footer.first_footer_items'),
      link:"https://blog.gruve.events/"
    },
    {
      id: 3,
      text: t('footer.about'),
      link:"https://gruve.events/"
    }
  ];
  const darkIcons = [
    // {
    //   id: 1,
    //   icon: Fbdark,
    //   socialLink: ''
    // },
    {
      id: 1,
      icon: Igdark,
      socialLink: 'https://www.instagram.com/gruvetickets/'
    },
    {
      id: 2,
      icon: Twitterdark,
      socialLink: 'https://twitter.com/gruvetickets'
    },
    {
      id: 3,
      icon: Discordark,
      socialLink: 'https://discord.gg/PYzVKPJ6'
    },
    {
      id: 4,
      icon: LinkedIndark,
      socialLink: 'https://www.linkedin.com/company/gruve-tickets/'
    }
  ];
  const smIcons = [
    // {
    //   id: 1,
    //   icon: Fbdark,
    //   socialLink: '',
    //   iconText: 'Facebook'
    // },
    {
      id: 1,
      icon: Igdark,
      socialLink: 'https://www.instagram.com/gruvetickets/',
      iconText: 'Instagram'
    },
    {
      id: 2,
      icon: Twitterdark,
      socialLink: 'https://twitter.com/gruvetickets',
      iconText: 'Twitter'
    },
    {
      id: 3,
      icon: Discordark,
      socialLink: 'https://discord.gg/PYzVKPJ6',
      iconText: 'Discord'
    },
    {
      id: 4,
      icon: LinkedIndark,
      socialLink: 'https://www.linkedin.com/company/gruve-tickets/',
      iconText: 'LinkedIn'
    }
  ];

  return (
    <>
      <div id="copyright-lg" className="footer-dark">
        <div className="footer-dark-content">
          <div className="footer-dark-logo">
            <Image src={Darklogo} alt="" /> 
          </div>

          <div className="dark-footer-nav flex flex-between ">
            {darkNav.map(({ id, text,link}) => {
              return (
                <Box mr="1rem">
                  <a key={id} href={`${link}`} className="dark-footer-link"  >
                  <div className="dark-footer-text">
                    <h3 className="margin-0 copyright-h dark-footer-h">{text}</h3>
                  </div>
                </a>
                </Box>
                
              );
            })}
          </div>

          <div className="dark-footer-icons flex flex-between">
            {darkIcons.map(({ id, icon, socialLink }) => {
              return (
                <div key={id} className="dark-footer-icon fb-dark">
                  <a href={socialLink} target="_blank" >
                    <Image src={icon} alt="" />
                  </a>
                </div>
              );
            })}

            <div className="dark-circle">
              <div className="tiktok-dark-container">
                <a href="https://www.tiktok.com/@gruvetickets" target='_blank'>
                <Image src={Tiktokdark} alt="" />
                </a>
                
               
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="copyright-sm" className="footer-container footer-dark flex flex-between flex-center">
        <div className="footer-logo-section">
          <div className="footer-logo">
            <Image src={Darklogo} loading="lazy" alt="" />
          </div>

          <div className="copyright-container">
            <Flex justifyContent="space-between" className="sm-footer-nav w-100 flex ">
              {darkNav.map(({ id, text,link }) => {
                return (
                  <a key={id} href={`${link}`} className="dark-footer-link">
                    <div className="dark-footer-text">
                      <h3 className="margin-0 copyright-h dark-footer-h">{text}</h3>
                    </div>
                  </a>
                );
              })}
            </Flex>

            <div className="sm-footer-icons">
              <div className="sm-footer-icon1 flex flex-between flex-wrap">
                {smIcons.map(({ id, icon, socialLink, iconText }) => {
                  return (
                    <div key={id} className="flex footer-nav-icon flex-center">
                      <div className="dark-footer-icon fb-dark">
                        <a href={socialLink} target="_blank" >
                          <Image src={icon} alt="" />
                        </a>
                      </div>

                      <div className="icon-text white">
                        <p className="margin-0 icon-text-p">{iconText}</p>
                      </div>
                    </div>
                  );
                })}

                <div className="flex footer-nav-icon tiktok flex-center">
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <div className="flex dark-circle">
                      <div className="tiktok-dark-container">
                        <Image src={Tiktokdark} alt="" />
                      </div>
                    </div>
                  </a>

                  <div className="icon-text white">
                    <p className="margin-0 icon-text-p">TikTok</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <footer className="footerX">&copy; {t('footer.copyright')}</footer> */}
    </>
  );
};

export default footer;
