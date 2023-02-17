import { Box, Text } from '@chakra-ui/react';
import { IoMdTime } from 'react-icons/io';

export const TimerCard = (props) => {
  return (
    <Box display="flex" alignItems="center">
      <IoMdTime size={20} color="#717171"></IoMdTime>
      <Text ml="2px" mt="1px" fontSize="12px" fontFamily="satoshi" fontWeight="normal"  color="#717171">
        {props.timetoRead} mins Read
      </Text>
    </Box>
  );
};
