import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Grid,
  GridItem,
  Text,
  Center,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import FutureView from "../svg/futureview.svg";

const BackArrow = chakra(FaArrowLeft);
const ForwardArrow = chakra(FaArrowRight);

const QNA = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Box bgColor="gray.200">
      <img style={{ paddingLeft: "15px" }} src={FutureView} />
      <Flex
        flexDirection="column"
        width="100wh"
        height="30vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack flexDir="row" mb="2" justifyContent="center" alignItems="center">
          <Box minW={{ md: "60px" }}>
            <Stack p="1rem" mt="0" backgroundColor="gray.300" boxShadow="md">
              <BackArrow size="30px" />
            </Stack>
          </Box>
          <Box minW={{ base: "90%", md: "568px" }}>
            <Stack p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
              <Center>
                <Text fontSize="xl" fontWeight="bold">
                  Why do you want to work here?
                </Text>
              </Center>
            </Stack>
          </Box>
          <Box minW={{ md: "60px" }}>
            <Stack p="1rem" backgroundColor="gray.300" boxShadow="md">
              <ForwardArrow size="30px" />
            </Stack>
          </Box>
        </Stack>
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Box minW={{ base: "90%", md: "694px" }}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            ></Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default QNA;
