import React from 'react';
import Logo from '../../public/img/navLogo.svg';
import Dropdown from 'react-dropdown';
import { useTranslation } from 'next-i18next';
import 'react-dropdown/style.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useNavHeaderLogic } from '@/hooks/navLogic';
import { Box, Button, Divider, Heading, Image, propNames, Text, useMediaQuery } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { slide as Menu } from 'react-burger-menu';
import { HiMenuAlt2 } from 'react-icons/hi';
import { MODE } from './enum';
import { JoinWaitlist } from './joinWaitlist';
import { BeatLoader } from 'react-spinners';
import { WaitlistModal } from '@/component/waitlistModal';






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


type NavHeader = {
  mode: any,
  setMode: any,
  handleSubscribeBxChange: (e: React.ChangeEvent) => void,
  formValue: string | undefined,
  isSubmitting:"SUBMITTING" | "SUCCESS" | "FAILURE" | undefined
  errorMessage: string | undefined,
  handleSubsribeRequest: (e: React.MouseEvent) => void,
  closeSubscribeModal: () => void,
  showSubscribeModal:boolean

  
 
  
}

export const NavHeader = ({ handleSubsribeRequest,
  errorMessage, isSubmitting, formValue,
  mode, setMode, handleSubscribeBxChange,closeSubscribeModal,showSubscribeModal }: NavHeader) => {
  const [isDesktopScreen] = useMediaQuery('(min-width: 924px)', {
    ssr: true,
    fallback: false
  });
  const router = useRouter()


  const isHomePage = router.asPath === "/"



  

    

  const { changeLanguage, currentLanguage, t, languageOption } = useNavHeaderLogic();
  const isEmailValid =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValue as string)
  const Loader = <BeatLoader color="white" />

  const submitBtn =  <Flex  
  position="fixed" 
  display="flex !important" 
  bottom="10px"
  justifyContent="center" mt="40px" w="100%">
    <Button
      //isDisabled={!isEmailValid}
      colorScheme="none"
      position="relative"
      display="inline"
      fontSize="14px"
      bg="#DF374D"
      w={["95%","80%"]}
      h="56px"
      borderRadius="1000px"
      color="white"
      onClick={handleSubsribeRequest}
    >

{isSubmitting === "SUBMITTING" ? Loader:t('navHeader.waitlist')}

    </Button>
  </Flex>
  
  
  function changeMode(mode:any) {
    setMode(mode);
    localStorage.setItem("mode", mode);
  }
  if (isDesktopScreen)
    return (
      <>
        <header id="header" className="header-row flex flex-center w-100  ">
          <nav className="header-nav">
            <div className=" navBox">
              <div className="nav-logo">
                {isHomePage ? <Link href={`${process.env.NEXT_PUBLIC_Landing_page_URL}`}>
                  <span className="nav-logo-link">
                    <Image
                      mt={['25px', '0px']}
                      width="145px"
                      height="60px"
                      src="/img/navLogo.svg"
                      alt="gruve logo"
                    />
                  </span>
                </Link>:<Link href={`/${currentLanguage !== 'en' ? currentLanguage : ''}`}>
                  <span className="nav-logo-link">
                    <Image
                      mt={['25px', '0px']}
                      width="145px"
                      height="60px"
                      src="/img/navLogo.svg"
                      alt="gruve logo"
                    />
                  </span>
                </Link> }
              
              </div>

             
               <ul className="nav-list attendees-nav-padding flex flex-between" 
              >
                <li className="inner-nav-list">
                {/*  */}
                {/*  */}
               
                  <div className="nav-link" >
                    
                  <Link   href={`${process.env.NEXT_PUBLIC_Landing_page_URL}?mode=attendee`}>

                  <span 
                  style={{color:"#666481"}}
                   // className={`event-attendees nav-link-item`}
                   
                    >
                      {t('navHeader.eventAttendeedTxt')}
                      
                    </span>
                </Link>
                    
                  </div>
                </li>

                <li className="inner-nav-list">
                  <div className="nav-link">
                    <Link href={`${process.env.NEXT_PUBLIC_Landing_page_URL}?mode=creator`}>
                    <span 
                    //className={`event-attendees nav-link-item `}
                    style={{color:"#666481"}}
                    >
                      {t('navHeader.eventCreatorsText')}
                    </span>
                    </Link>
                   
                  </div>
                </li>
              </ul> 

              <div className="flex">
                <section className="flex  align-center">
                  <span className="nav-blog-item" style={{color:"#EA445A",fontWeight:"bold"}}>
                    <Link href="/">{t('navHeader.blogNav')}</Link>
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

        {/* <header id="mob-header" className="">
          <div className="flex flex-center flex-between mob-header">
            <div className="nav-logo">
             
              <a href="https://" className="nav-logo-link">
                <img src={Logo} loading="lazy" alt="" />
              </a>
            </div>

            <div className="switch">
              <div className="inner-nav-list">
              
                <div className="nav-link">
                  <span className={`event-attendees switch-item nav-link-item `}>
                    Switch to Attendees
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header> */}
      </>
    );

  return (
    
    <Flex w="100%" justifyContent="space-between" pl={"1%"} pr="2%" 
     fontFamily="satoshi"  position="relative"    >
      <Box zIndex={1000} w="100%" h="auto"  position="absolute">
      {showSubscribeModal === true && <WaitlistModal closeSubscribeModal={closeSubscribeModal}></WaitlistModal>}

     </Box>
      <Link href={`/${currentLanguage !== 'en' ? currentLanguage : ''}`}>
        <Image mt="25px" width="145px" height="60px" src="/img/navLogo.svg" alt="gruve logo" />
      </Link>

      
      
      <div style={{ display: "flex",zIndex:"10",position:"relative"}}>
          <span className="nav-language-items" style={{paddingTop:"15px"}}>
                    <Dropdown
                      className="hide-border align-center"
                      controlClassName="hide-border align-center"
                      options={languageOption}
                      onChange={(selectedLanguage) => changeLanguage(selectedLanguage)}
                      value={currentLanguage}
                    />
                  </span>
     
        <Menu styles={mobilestyles} customBurgerIcon={<Image src={"/blog/logo.svg"}/>}>
          <Flex pl={["0px","30px"]} w="150px" h="90px">
            <Image src="/img/navLogo.svg" alt="gruve logo" />
          </Flex>
        
          <JoinWaitlist
            handleSubscribeBxChange={handleSubscribeBxChange}
            formValue={formValue}
            isSubmitting={isSubmitting}
            errorMessage={errorMessage}
            handleSubsribeRequest={handleSubsribeRequest}
            placeholderStyle={{
              color:"#666481"
            }}
            styles={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color:"#666481",
              maxW: "100%",
              width:"100%"
              
              
            }}
            inputBxStyle={{
              color: "#666481",
              w:["100%","80%"]
            }}

            customSubmitComponent={submitBtn}
            
          />

       
         
        </Menu>
      </div>
    </Flex>
  );
};
