import {
  Flex,
  Stack,
  chakra,
  Box,
  Text,
  Center,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import FutureView from "../svg/futureview.svg";
import SpeechRecognition from "../components/SpeechRecognition";
import { db } from "../firebase/firebase-setup";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const BackArrow = chakra(FaArrowLeft);
const ForwardArrow = chakra(FaArrowRight);

const QNA = () => {
  const [transcriptData, setTranscriptData] = useState("");
  const [transcript, setTranscript] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const history = useHistory();

  const TranscriptState = () => {
    if (
      transcriptData.status === "completed" ||
      transcriptData.status === "unavailable"
    ) {
      return <p>{transcript}</p>;
    }
    if (transcriptData.status === "processing") {
      return <Spinner />;
    }
    return <p>Start!</p>;
  };

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
      setQuestionId(querySnapshot.docs[questionIndex].id);
      setQuestion(querySnapshot.docs[questionIndex].get("question"));
      return querySnapshot;
    };

    setNewQuestion();
  }, [questionIndex]);

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
        height="60vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack flexDir="row" mb="2" justifyContent="center" alignItems="center">
          <Box minW={{ md: "60px" }}>
            <Button
              onClick={() => {
                if (questionIndex > 0) {
                  setQuestionIndex(questionIndex - 1);
                }
              }}
              p="1rem"
              mt="0"
              py="1.9rem"
              disabled={questionIndex === 0}
              backgroundColor="gray.300"
              boxShadow="md"
            >
              <BackArrow size="30px" />
            </Button>
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
            <Button
              onClick={() => {
                console.log(allQuestions.length);
                if (questionIndex < allQuestions.length - 1) {
                  setQuestionIndex(questionIndex + 1);
                  setTranscript("");
                  setTranscriptData({});
                }
              }}
              p="1rem"
              py="1.9rem"
              disabled={questionIndex === allQuestions.length - 1}
              backgroundColor="gray.300"
              boxShadow="md"
            >
              <ForwardArrow size="30px" />
            </Button>
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
              <SpeechRecognition
                questionId={questionId}
                transcriptData={transcriptData}
                setTranscript={setTranscript}
                setTranscriptData={setTranscriptData}
              />
              <TranscriptState />
            </Stack>
          </Box>
          <Button
            borderRadius={0}
            bg="#AABFEE"
            type="submit"
            variant="solid"
            colorScheme="teal"
            width="full"
            onClick={() => {
              history.push("/results");
            }}
          >
            View Results
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default QNA;
