import { Box, Text, Stack } from '@chakra-ui/react';
import { CustomIcons } from '../../util/customIcon';
//icons
import { GrFacebookOption } from 'react-icons/gr';
import { GrTwitter } from 'react-icons/gr';
import { AiFillLinkedin } from 'react-icons/ai';
import { RiWhatsappFill } from 'react-icons/ri';
import { useRouter } from "next/router"
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton
} from 'next-share';




export const Socials = () => {
   const url =  window.location.href

  
  const socials = [
    {
      name: 'facebook',
      icons: GrFacebookOption,
      shareButton:FacebookShareButton
    },
    {
      name: 'twitter',
      icons: GrTwitter,
      shareButton:TwitterShareButton

    },
    {
      name: 'linkedIn',
      icons: AiFillLinkedin,
      shareButton:LinkedinShareButton

    },
    {
      name: 'whatsapp',
      icons: RiWhatsappFill,
      shareButton:WhatsappShareButton
    }
  ];

  return (
    <Box  w="100px" minHeight={["0px","0px","0px","350vh" ]} mt={["30px","30px","30px","0px"]}>
       <Stack  position="sticky" top="0px" pl={["0px", "0px", "5%"]} pt="0px" 
      spacing="25px" direction={['row', 'row', 'column']}     mr="30px">
      
      <Text  fontFamily="satoshi black" textAlign={["left", "center", "center"]} color="#666481"
        fontWeight="700" fontSize="20px" >
        Share
      </Text>
      {socials.map((eachIcons) => (
        <Box textAlign={["left", "left", "center", "center"]} >
          <eachIcons.shareButton  url={url} blankTarget={true}>
          <CustomIcons
          style={{
            color: '#666481',
            fontSize: '25px'
          }}
          Icon={eachIcons.icons}
        ></CustomIcons>
          </eachIcons.shareButton>
          
        </Box>
       
      ))}
    </Stack>
    </Box>
   
  );
};
