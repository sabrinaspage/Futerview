import { Flex, Stack, Box, Button, Heading } from "@chakra-ui/react";
import FutureView from "../svg/futureview.svg";
import { db } from "../firebase/firebase-setup";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { List, ListItem, Text } from "@chakra-ui/react";

const Results = () => {
  const [ratings, setRatings] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setRatings([]);
    const setNewQuestion = async () => {
      const querySnapshot = await getDocs(collection(db, "answeredQuestions"));
      querySnapshot.forEach((doc) =>
        setRatings((arr) => [
          ...arr,
          { question: doc.get("question"), rating: doc.get("rating") },
        ])
      );
      return querySnapshot;
    };

    setNewQuestion();
  }, []);

  const average = (array) => array.reduce((a, b) => a + b / array.length, 0);

  return (
    <Box bgColor="gray.200">
      <Flex>
        <img
          alt="futureview"
          style={{ paddingLeft: "15px" }}
          src={FutureView}
        />
        <Box ml="auto">
          <Button
            bgColor="transparent"
            size={"lg"}
            onClick={() => {
              history.push("/login");
            }}
          >
            Logout
          </Button>
        </Box>
      </Flex>
      <Flex
        flexDirection="column"
        width="100wh"
        height="70vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Heading mb="2"> Results </Heading>
        <Box minW={{ md: "500px" }}>
          <List width="300px">
            {ratings.map((rating, index) => {
              return (
                <ListItem
                  key={index}
                  bgColor="white"
                  width="500px"
                  py={2}
                  px={2}
                  mb={1}
                  boxShadow="md"
                  borderRadius="5px"
                >
                  <Flex>
                    {rating.question}
                    <Box ml="auto">{rating.rating}%</Box>
                  </Flex>
                </ListItem>
              );
            })}
            <ListItem
              bgColor="white"
              width="500px"
              py={2}
              px={2}
              mb={1}
              boxShadow="md"
              borderRadius="5px"
            >
              <Flex>
                <Text fontWeight="bold">Average</Text>
                <Box ml="auto">
                  {average([...ratings.map((key) => key.rating)])}%
                </Box>
              </Flex>
            </ListItem>
          </List>
        </Box>
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            borderRadius={0}
            mt={2}
            bg="#AABFEE"
            type="submit"
            variant="solid"
            colorScheme="teal"
            width="full"
            onClick={() => {
              history.push("/qna");
            }}
          >
            Start Over!
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Results;
