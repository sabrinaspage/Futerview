import MicRecorder from "mic-recorder-to-mp3"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { Button, Spinner } from '@chakra-ui/react'

// Set AssemblyAI Axios Header
const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: process.env.REACT_APP_ASSEMBLY_AI_KEY,
    "content-type": "application/json",
    "transfer-encoding": "chunked",
  },
})

const SpeechRecognition = () => {
  const recorder = useRef(null)
  const audioPlayer = useRef(null)
  const [blobURL, setBlobUrl] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [isRecording, setIsRecording] = useState(null)

  useEffect(() => {
    //Declares the recorder object and stores it inside of ref
    recorder.current = new MicRecorder({ bitRate: 128 })
  }, [])

  const startRecording = () => {
    // Check if recording isn't blocked by browser
    recorder.current.start().then(() => {
      setIsRecording(true)
    })
  }

  const stopRecording = () => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        })
        const newBlobUrl = URL.createObjectURL(blob)
        setBlobUrl(newBlobUrl)
        setIsRecording(false)
        setAudioFile(file)
      })
      .catch((e) => console.log(e))
  }

  const [uploadURL, setUploadURL] = useState("")
  const [transcriptID, setTranscriptID] = useState("")
  const [transcriptData, setTranscriptData] = useState("")
  const [transcript, setTranscript] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const submitTranscriptionHandler = () => {
    assembly
      .post("/transcript", {
        audio_url: uploadURL,
      })
      .then((res) => {
        setTranscriptID(res.data.id)
      })
      .catch((err) => console.error(err))
  }

  // Check the status of the Transcript and retrieve the Transcript Data
  const checkStatusHandler = async () => {
    setIsLoading(true)
    try {
      await assembly.get(`/transcript/${transcriptID}`).then((res) => {
        setTranscriptData(res.data)
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if(transcriptData.status !== "completed" && isLoading) {
        checkStatusHandler();
      } else {
        setIsLoading(false);
        setTranscript(transcriptData.text);
      }
    }, 1000)
    return () => clearInterval(interval);
  })

  useEffect(() => {
    if (audioFile) {
      assembly
        .post("/upload", audioFile)
        .then((res) => setUploadURL(res.data.upload_url))
        .catch((err) => console.error(err))
    }
  }, [audioFile])

  const TranscriptState = () => {
    if (transcriptData.status === "completed") {
      return <p>{transcript}</p>
    }
    if (transcriptData.status === "processing") {
      return  <Spinner />
    }
    return <p>Start!</p>
  }

  return (
    <div>
    <h1>React Speech Recognition App</h1>
    <audio ref={audioPlayer} src={blobURL} controls='controls' />
    <div>
      <Button colorScheme='teal' disabled={isRecording} onClick={startRecording}>
        START
      </Button>
      <Button colorScheme='red' disabled={!isRecording} onClick={stopRecording}>
        STOP
      </Button>
      <Button onClick={submitTranscriptionHandler}>SUBMIT</Button>
      <Button colorScheme='orange' onClick={checkStatusHandler}>GET TRANSCRIPT</Button>
    </div>
    
    <TranscriptState />
    
  </div>
  )
}

export default SpeechRecognition