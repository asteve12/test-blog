import { Box, Text, Stack } from '@chakra-ui/react';
import { CustomIcons } from '../../util/customIcon';
//icons
import { GrFacebookOption } from 'react-icons/gr';
import { GrTwitter } from 'react-icons/gr';
import { AiFillLinkedin } from 'react-icons/ai';
import { RiWhatsappFill } from 'react-icons/ri';

export const Socials = () => {
  const socials = [
    {
      name: 'facebook',
      icons: GrFacebookOption
    },
    {
      name: 'twitter',
      icons: GrTwitter
    },
    {
      name: 'linkedIn',
      icons: AiFillLinkedin
    },
    {
      name: 'whatsapp',
      icons: RiWhatsappFill
    }
  ];

  return (
    <Stack  pl={["0px", "0px", "5%"]} pt="0px" 
      spacing="25px" direction={['row', 'row', 'column']}     mr="30px">
      
      <Text  fontFamily="satoshi black" textAlign={["left", "center", "center"]} color="#666481"
        fontWeight="700" fontSize="20px" >
        Share
      </Text>
      {socials.map((eachIcons) => (
        <Box  textAlign={["left","left","center","center"]} >
           <CustomIcons
          style={{
            color: '#666481',
            fontSize: '25px'
          }}
          Icon={eachIcons.icons}
        ></CustomIcons>
        </Box>
       
      ))}
    </Stack>
  );
};
