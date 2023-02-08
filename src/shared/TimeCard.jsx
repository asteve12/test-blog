import { Box, Text } from '@chakra-ui/react';
import { BiTime } from 'react-icons/bi';

export const TimerCard = (props) => {
  return (
    <Box display="flex" alignItems="center">
      <BiTime size={20} color="#717171"></BiTime>
      <Text ml="2px" mt="1px" fontSize="12px" fontWeight="900" color="#717171">
        {props.timetoRead} mins Read
      </Text>
    </Box>
  );
};
