import { Text } from '@chakra-ui/react';

export const BlogTitle = (props) => {
  return (
    <Text
      p="3px"
      borderRadius="16px"
      background="#F0F4FF"
      minW="125px"
      h="24px"
      display="flex"
      textAlign="center"
      alignItems="center"
      fontSize="12px"
      color="#5D82F1"
      justifyContent="center"
      cursor="pointer"
    >
      {props.title}
      {/* What is a defi wallet */}
    </Text>
  );
};
