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
  Text,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import FutureView from "../svg/futureview.svg";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Box>
      <img style={{ paddingLeft: "15px" }} src={FutureView} />
      <Flex
        flexDirection="column"
        width="100wh"
        height="70vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="#193e88" />
          <Text fontSize="4xl" color="#193e88">
            Registration
          </Text>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="transparent"
                boxShadow="none"
              >
                <FormControl>
                  <Text fontWeight={"bold"}> Username * </Text>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input bg="white" placeholder="email address" />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <Text fontWeight={"bold"}> Password * </Text>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      bg="white"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  bg="#AABFEE"
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  onClick={() => history.push("/qna")}
                >
                  Sign up now
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Flex>
          <Link color="#193e88" href="/login">
            Have an account?
          </Link>
          <Box width="180px" />
          <Link color="#193e88" href="#">
            Forgot password?
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Login;
