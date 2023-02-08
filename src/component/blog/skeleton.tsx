import { Box, Flex, HStack, Skeleton, SkeletonCircle } from '@chakra-ui/react';

export const SkeletonAnime = () => {
  const skeleton = (
    <Box w="389px" h="542px">
      <Skeleton w="100%" borderRadius="10px" h="323px"></Skeleton>
      <Skeleton w="100%" borderRadius="15px" mt="10px" h="15px"></Skeleton>
      <Skeleton w="100%" borderRadius="15px" mt="10px" h="15px"></Skeleton>
      <Skeleton w="100%" borderRadius="15px" mt="10px" h="15px"></Skeleton>
      <HStack mt="10px">
        <SkeletonCircle w="24px" h="24px" borderRadius="24px"></SkeletonCircle>
        <Skeleton w="100%" borderRadius="15px" mt="10px" h="15px"></Skeleton>
      </HStack>
    </Box>
  );

  return (
    <Flex w="100%" justifyContent="space-between" flexWrap="wrap">
      {[skeleton, skeleton, skeleton]}
    </Flex>
  );
};
