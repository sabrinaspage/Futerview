import MicRecorder from "mic-recorder-to-mp3";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button, Spinner, Center, Flex } from "@chakra-ui/react";
import { db } from "../firebase/firebase-setup";
import {
  doc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import stringSimilarity from "string-similarity";

// Set AssemblyAI Axios Header
const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: process.env.REACT_APP_ASSEMBLY_AI_KEY,
    "content-type": "application/json",
    "transfer-encoding": "chunked",
  },
});

const SpeechRecognition = ({
  questionId,
  transcriptData,
  setTranscriptData,
  setTranscript,
}) => {
  const recorder = useRef(null);
  const audioPlayer = useRef(null);
  const [blobURL, setBlobUrl] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(null);

  useEffect(() => {
    //Declares the recorder object and stores it inside of ref
    recorder.current = new MicRecorder({ bitRate: 128 });
  }, []);

  const startRecording = () => {
    // Check if recording isn't blocked by browser
    recorder.current.start().then(() => {
      setIsRecording(true);
    });
  };

  const stopRecording = () => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        const newBlobUrl = URL.createObjectURL(blob);
        setBlobUrl(newBlobUrl);
        setIsRecording(false);
        setAudioFile(file);
      })
      .catch((e) => console.log(e));
  };

  const [uploadURL, setUploadURL] = useState("");
  const [transcriptID, setTranscriptID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitTranscriptionHandler = () => {
    assembly
      .post("/transcript", {
        audio_url: uploadURL,
      })
      .then((res) => {
        setTranscriptID(res.data.id);
        checkStatusHandler();
      })
      .catch((err) => console.error(err));
  };

  // Check the status of the Transcript and retrieve the Transcript Data
  const checkStatusHandler = async () => {
    setIsLoading(true);
    try {
      await assembly.get(`/transcript/${transcriptID}`).then((res) => {
        setTranscriptData(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getRating = async (text) => {
      const questionRef = doc(db, "questions", questionId);
      const questionSnap = await getDoc(questionRef);

      if (text && questionSnap.exists()) {
        const bestAnswers = questionSnap.data().best_answers;

        var matches = stringSimilarity.findBestMatch(text, bestAnswers);
        return (matches.bestMatch.rating * 100).toFixed(2);
      }

      return 0;
    };

    const storeAnswer = async () => {
      const answeredQuestionRef = doc(db, "answeredQuestions", questionId);
      await updateDoc(answeredQuestionRef, {
        answer: transcriptData.text,
        rating: await getRating(transcriptData.text),
      });
      const answeredQuestionSnap = await getDoc(answeredQuestionRef);
      console.log(answeredQuestionSnap.data());
    };

    const interval = setInterval(() => {
      if (transcriptData.status !== "completed" && isLoading) {
        checkStatusHandler();
      } else {
        setIsLoading(false);
        setTranscript(transcriptData.text);
      }
    }, 1000);

    if (transcriptData.status === "completed" && transcriptData.text) {
      storeAnswer(transcriptData.text);
    }
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (audioFile) {
      assembly
        .post("/upload", audioFile)
        .then((res) => setUploadURL(res.data.upload_url))
        .catch((err) => console.error(err));
    }
  }, [audioFile]);

  return (
    <Flex flexDirection="column">
      <Center>
        <audio ref={audioPlayer} src={blobURL} controls="controls" />
      </Center>
      <Center mt={3}>
        <Button
          colorScheme="teal"
          disabled={isRecording}
          onClick={startRecording}
        >
          START
        </Button>
        <Button
          ml={2}
          colorScheme="red"
          disabled={!isRecording}
          onClick={stopRecording}
        >
          STOP
        </Button>
        <Button ml={2} onClick={submitTranscriptionHandler}>
          GET TRANSCRIPT
        </Button>
      </Center>
    </Flex>
  );
};

export default SpeechRecognition;
