import React from 'react';
import Logo from '../../public/img/navLogo.svg';
import Dropdown from 'react-dropdown';
import { useTranslation } from 'next-i18next';
import 'react-dropdown/style.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useNavHeaderLogic } from '@/hooks/navLogic';
import { Box, Button, Divider, Heading, Image, Text, useMediaQuery } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { slide as Menu } from 'react-burger-menu';
import { HiMenuAlt2 } from 'react-icons/hi';

const mobilestyles = {
  bmBurgerButton: {
    position: 'relative',
    width: '36px',
    height: '30px',
    left: '0px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100vh',
    left: '0px',
    top: '0px',
    width: '100%'
  },
  bmMenu: {
    background: 'white',
    paddingLeft: '0em',
    fontSize: '1.15em',
    width: '100%',
    height: '100%'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
};

export const NavHeader = () => {
  const [isDesktopScreen] = useMediaQuery('(min-width: 823px)', {
    ssr: true,
    fallback: false
  });
  const { changeLanguage, currentLanguage, t, languageOption } = useNavHeaderLogic();

  if (isDesktopScreen)
    return (
      <>
        <header id="header" className="header-row flex flex-center w-100">
          <nav className="header-nav">
            <div className="flex flex-between flex-center">
              <div className="nav-logo">
                {/* eslint-disable-next-line */}
                <Link href={`/${currentLanguage !== 'en' ? currentLanguage : ''}`}>
                  <span className="nav-logo-link">
                    <Image
                      mt={['25px', '0px']}
                      width="145px"
                      height="60px"
                      src="/img/navLogo.svg"
                      alt="gruve logo"
                    />
                  </span>
                </Link>
              </div>
              <ul className="nav-list attendees-nav-padding flex flex-between">
                <li className="inner-nav-list">
                  <div className="nav-link">
                    <span className={`event-attendees nav-link-item`}>
                      {t('navHeader.eventAttendeedTxt')}
                      {/* For Event Attendees */}
                    </span>
                  </div>
                </li>

                <li className="inner-nav-list">
                  <div className="nav-link">
                    <span className={`event-attendees nav-link-item `}>
                      {t('navHeader.eventCreatorsText')}
                    </span>
                  </div>
                </li>
              </ul>

              <div className="flex">
                <section className="flex  align-center">
                  <span className="nav-blog-item">
                    <Link href="/blog">{t('navHeader.blogNav')}</Link>
                  </span>
                  <span className="nav-language-items">
                    <Dropdown
                      className="hide-border align-center"
                      controlClassName="hide-border align-center"
                      options={languageOption}
                      onChange={(selectedLanguage) => changeLanguage(selectedLanguage)}
                      value={currentLanguage}
                    />
                  </span>
                </section>

                <a href={'#join-the-hype'} className="hero-cta-btn flex align-center nav-cta-btn">
                  <div className="hero-btn-text">
                    <p className="margin-0 hero-btn-p">{t('navHeader.waitlist')}</p>
                  </div>
                </a>
              </div>
            </div>
          </nav>
        </header>

        <header id="mob-header" className="">
          <div className="flex flex-center flex-between mob-header">
            <div className="nav-logo">
              {/* eslint-disable-next-line */}
              <a href="https://" className="nav-logo-link">
                <img src={Logo} loading="lazy" alt="" />
              </a>
            </div>

            <div className="switch">
              <div className="inner-nav-list">
                {/* eslint-disable-next-line */}
                <div className="nav-link">
                  <span className={`event-attendees switch-item nav-link-item `}>
                    Switch to Attendees
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );

  return (
    <Flex w="100%" justifyContent="space-between" pl="1%" pr="2%">
      <Link href={`/${currentLanguage !== 'en' ? currentLanguage : ''}`}>
        <Image mt="25px" width="145px" height="60px" src="/img/navLogo.svg" alt="gruve logo" />
      </Link>

      <div>
        <Menu styles={mobilestyles} customBurgerIcon={<HiMenuAlt2></HiMenuAlt2>}>
          <Flex pl="30px" w="200px" h="90px">
            <Image src="/img/navLogo.svg" alt="gruve logo" />
          </Flex>

          <Box p={['10px', '30px']} w="100%" fontFamily="satoshi">
            <Text fontSize={'3rem'} color="#666481">
              For event attendees
            </Text>
            <Divider color="#E1E1E8" mt="25px" mb="25px"></Divider>
            <Text
              mb="25px"
              fontWeight="bold"
              fontSize={'3rem'}
              fontFamily="satoshi"
              color="#EA445A"
            >
              For event creators
            </Text>

            <Box w="100%" minH="136px" bg="#FFEFD5" borderRadius="8px" p="12px" position="relative">
              <Heading fontSize={'2rem'} fontWeight="700" mt="10px" color="#06060B">
                View Blog Articles
              </Heading>
              <Text w="190px" mt="10px" fontSize={'2rem'} color="#666481">
                Get the best of articles to help you and also the latest news around events
                happening around you
              </Text>
              <Box position="absolute" bottom="0px" right="0px">
                <Image
                  objectFit="cover"
                  width={'9.563rem'}
                  height={'9.563rem'}
                  src="/img/slideImg.svg"
                  alt=""
                />
              </Box>
            </Box>
          </Box>
          <Flex display="flex !important" justifyContent="center" w="100%">
            <Button
              position="relative"
              display="inline"
              fontSize="14px"
              bg="#DF374D"
              w="343px"
              h="56px"
              borderRadius="1000px"
              color="white"
            >
              Join waitlist
            </Button>
          </Flex>
        </Menu>
      </div>
    </Flex>
  );
};
