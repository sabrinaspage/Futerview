import MicRecorder from "mic-recorder-to-mp3"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { Button } from '@chakra-ui/react'

// Set AssemblyAI Axios Header
const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: process.env.REACT_APP_ASSEMBLY_AI_KEY,
    "content-type": "application/json",
    "transfer-encoding": "chunked",
  },
})

assembly
    .post("/transcript", {
        audio_url: "https://bit.ly/3yxKEIY"
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err))


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

  console.log(audioFile);

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
      <Button>SUBMIT</Button>
    </div>
  </div>
  )
}

export default SpeechRecognition;