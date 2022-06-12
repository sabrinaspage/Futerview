import { Flex, Stack, chakra, Box, Text, Center } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import FutureView from "../svg/futureview.svg";
import SpeechRecognition from "../components/SpeechRecognition";
import { db } from "../firebase/firebase-setup";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";

const BackArrow = chakra(FaArrowLeft);
const ForwardArrow = chakra(FaArrowRight);

const QNA = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const setNewQuestion = async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      querySnapshot.forEach((doc) =>
        setAllQuestions((arr) => [...arr, doc.data()])
      );
      setQuestion(querySnapshot.docs[questionIndex].get("question"));
      return querySnapshot;
    };

    setNewQuestion();
  }, []);

  useEffect(() => {
    const setNewQuestion = async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      setQuestion(querySnapshot.docs[questionIndex].get("question"));
      return querySnapshot;
    };

    setNewQuestion();
  }, [questionIndex]);

  return (
    <Box bgColor="gray.200">
      <img style={{ paddingLeft: "15px" }} src={FutureView} />
      <Flex
        flexDirection="column"
        width="100wh"
        height="60vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack flexDir="row" mb="2" justifyContent="center" alignItems="center">
          <Box minW={{ md: "60px" }}>
            <Stack
              onClick={() => {
                if (questionIndex > 0) {
                  setQuestionIndex(questionIndex - 1);
                }
              }}
              p="1rem"
              mt="0"
              backgroundColor="gray.300"
              boxShadow="md"
            >
              <BackArrow size="30px" />
            </Stack>
          </Box>
          <Box minW={{ base: "90%", md: "568px" }}>
            <Stack p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
              <Center>
                <Text fontSize="xl" fontWeight="bold">
                  {question}
                </Text>
              </Center>
            </Stack>
          </Box>
          <Box minW={{ md: "60px" }}>
            <Stack
              onClick={() => {
                console.log(allQuestions.length);
                if (questionIndex < allQuestions.length - 1) {
                  setQuestionIndex(questionIndex + 1);
                }
              }}
              p="1rem"
              backgroundColor="gray.300"
              boxShadow="md"
            >
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
            >
              <SpeechRecognition />
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default QNA;
