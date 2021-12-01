import React, { useEffect, useRef, useState} from 'react';
import { useSpring, config, animated } from 'react-spring';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import * as blazeface from '@tensorflow-models/blazeface';
import * as tf from '@tensorflow/tfjs';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import gaze from './Gaze';
import sloth from '../../../img/sloth512.png';
import koala from '../../../img/koala512.png';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import useInterval from 'use-interval';

const CONSTRAINTS = { video: true };
const ShowButton = styled(animated.button)`
    outline: none;
    border: none;
    border-radius: 10px;
    color: white;
    width: 300px;
    padding: 2rem;
    height: 30%;
    margin: 8% auto;
    font-size: 30px;
    cursor: pointer;
    font-family: 'CookieRunOTF-Bold';

    /* 색상 */
    background: #c54ac7;
    &:hover {
        background: ${lighten(0.1, '#C54AC7')};
    }
    &:active {
        background: ${darken(0.1, '#C54AC7')};
    }
`;

function FaceDetector(props) {
    const userFrom = props.userFrom;
    const [recordState, setRecordState] = useState(null);
    const [btnVisible, setBtn] = useState(true);
    const camera = React.useRef();
    const webcamElement = camera.current;
    const figures = React.useRef();

    const [score, setScore] = useState(50);
    const [comment, setComment] = useState('');
    const [isToggle, setToggle] = useState(false);

    const appearSloth = useSpring({
        config: config.stiff,
        x: 300,
        opacity: isToggle ? 1 : 0,
        y: -150,
    });
    const appearSlothText = useSpring({
        config: config.stiff,
        x: 150,
        opacity: isToggle ? 1 : 0,
        y: 0,
    });
    const appearKoala = useSpring({
        config: config.stiff,
        x: -740,
        opacity: isToggle ? 0 : 1,
        y: 270,
    });
    const appearKoalaText = useSpring({
        config: config.stiff,
        x: -240,
        opacity: isToggle ? 0 : 1,
        y: 170,
    });
    const { x } = useSpring({
        loop: true,
        from: { x: 0 },
        to: { x: 1 },
        config: { duration: 2000 },
    });

    const allStop = async () => {
        console.log('end~~~');
        // stop dictaphone'
        dictStop();
        camera.current = null;
        // camera_temp.current = null;
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        let body = {
            userFrom: userFrom,
            score: score,
            comment: comment,
        };

        await allStop();

        Axios.post('/api/run/vision', body).then((response) => {
            if (response.data.success) {
                props.history.push('/loading');
            } else {
                alert('Vision error');
            }
        });
    };

    // dictaphone
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const [script, setScript] = useState([]);

    const dictStart = () => {
        SpeechRecognition.startListening({ continuous: true });
        if (!browserSupportsSpeechRecognition) {
            return <span>브라우저가 음성인식을 지원하지 않습니다.</span>;
        }
        
    };
    useInterval(() => {
        if(!btnVisible){
            setScript(script.concat(transcript));
            console.log(transcript);
            console.log(script);
            resetTranscript();
        }
    }, 10000);
    // useEffect(()=>{
    //     let timerDict = useInterval(() => {
    //         setScript(script.concat(transcript));
    //         console.log(transcript);
    //         console.log(script);
    //         resetTranscript();
    //     }, 30000);
    // },[transcript])
    
    
    
    const dictStop = async() => {
        SpeechRecognition.stopListening();
        setScript(script.concat(transcript));
        console.log(transcript);
        console.log(script);
        
        let temp = ['안녕하세요 저는 구르미 무슨 맛일까에 대해서 발표할 이불입니다 저는 우선 구름은 여러 종류가 있는 것으로 알고 있는데요 만약 구름이 뚱뚱하고 무거운 소나기를 내릴 비라면 지방이 많은 느끼한 맛이 날 것 같습니다 왜냐하면 무겁기 때문입니다 무거우면 지방이 많은 곳이고 지방이 많으면 느끼한 맛이 나기 때문입니다 그다음으로 만약 깃털같이 높은 곳에 있는 구름이라면 맛이 잘 느껴지지 않을 것 같습니다 만약 그 맛이 느껴진다면 솜사탕 실 같은 얇은 느낌의 달달한 맛이 될 것 같습니다 아니면 오리털 파카에 우리 털이 조금 삐져나온 걸 혀에 넣었을 때 와 같은 비슷한 느낌을 것 같습니다 다음으로 그냥 일반 가을하늘이나 보험 하늘에 떠 있는 구름을 생각해본다면 그런 뭉게뭉게 한 구름은 퍽퍽한 두부 맛이 날 것 같습니다 왜냐하면 두부랑 색깔이 비슷하고 순두부와 비슷하게 생겼기 때문입니다 위의 내용을 정리해 보자면 저는 두 분은 아니 구름은 어떤 구름이냐에 따라서 맛이 다를 것이라고 생각합니다 하지만 모두 하늘에 떠 있는 구름이라는 공통점으로 물 비린내와 같은 그런 냄새가 날 것 같습니다 그렇지만 깃털처럼 생긴 가벼운 구름들은 털이나 얇은 솜사탕 실 같은 그런 식감을 갖고 있을 것 같으며 맛이 매우 희미할 것 같습니다 다음으로 뭉게뭉게 한 구름은 마지막으로 무거운 구름은 느끼한 맛이 날 것 같습니다 이상 발표를 마치겠습니다 감사합니다'];
        // mongoDB 저장
        let body = {
            userFrom: userFrom,
            text: temp,
            //text: script,
            //text: transcript,
        };

        await Axios.post('/api/run/speechtext', body).then((response) => {
            if (response.data.success) {
            } else {
                alert('Speechtext error');
            }
        });

        resetTranscript();
    };

    const run = async () => {
        const model = await blazeface.load();
        await gaze.loadModel();
        var left_gaze = 0;
        var right_gaze = 0;

        const webcam = await tf.data.webcam(webcamElement, {
            resizeWidth: 220,
            resizeHeight: 227,
        });

        await gaze.setUpCamera(camera.current);

        const predict = async () => {
            while (true) {
                try {
                    let check = false;
                    const img = await webcam.capture();
                    const predictions = await model.estimateFaces(img, false);

                    const gazePrediction = await gaze.getGazePrediction();
                    for (let i = 0; i < predictions.length; i++) {
                        if (figures.current) {
                            // figures.current.innerText = String(predictions[i].probability[0]).substring(0, 5);
                            console.log('Gaze direction: ', gazePrediction); //will return 'RIGHT', 'LEFT', 'STRAIGHT' or 'TOP'
                            if (gazePrediction === 'LEFT' || gazePrediction === 'RIGHT') {
                                setScore((preScore) => preScore - 1);
                                if (gazePrediction === 'LEFT') {
                                    left_gaze += 1;
                                } else {
                                    right_gaze += 1;
                                }
                                if (left_gaze > right_gaze) {
                                    setComment('발표 중에 왼쪽을 바라보는 경향이 있어요.');
                                } else {
                                    setComment('발표 중에 오른쪽을 바라보는 경향이 있어요.');
                                }
                            } else if (gazePrediction === 'STRAIGHT' || gazePrediction === 'TOP' || gazePrediction === 'BOTTOM') {
                                setScore((preScore) => preScore + 1);
                            }
                            check = true;
                        }
                    }

                    if (figures.current && !check) {
                        if (!isToggle) {
                            setToggle((isToggle) => true);
                        }
                        figures.current.innerText = '         얼굴을 보여주세요.';
                    }
                    if (check) {
                        for (let i = 0; i < predictions.length; i++) {
                            if (figures.current) {
                                // console.log(predictions[i]);
                                const face_center = (predictions[i].bottomRight[0] + predictions[i].topLeft[0]) / 2;
                                if (
                                    predictions[i].landmarks[2][0] < face_center - 10 ||
                                    predictions[i].landmarks[2][0] > face_center + 10
                                ) {
                                    figures.current.innerText = '얼굴을 정면으로 향해주세요.';
                                    setScore((preScore) => preScore - 1);
                                    if (!isToggle) {
                                        setToggle((isToggle) => true);
                                    }
                                } else {
                                    setScore((preScore) => preScore + 1);
                                    setToggle((isToggle) => false);
                                }
                            }
                        }
                    }
                    img.dispose();
                    await tf.nextFrame();
                    // raf = requestAnimationFrame(predict);
                    // console.log(raf)
                } catch (e) {
                    console.error(e);
                    continue;
                }
            }
        };
        predict();
    };

    const startVideo = async () => {
        setBtn((btnVisible) => !btnVisible);

        const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
        if (camera && camera.current && !camera.current.srcObject) {
            camera.current.srcObject = stream;
        }

        dictStart();
        run();
    };

    function blobToDataURL(blob, callback) {
        var reader = new FileReader();
        reader.onload = function (e) {
            callback(e.target.result);
        };
        reader.readAsDataURL(blob);
    }

    // audio recorder
    const onStop = (audioData) => {
        console.log('audioData', audioData);

        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = audioData.url;
        a.download = "Jasmine_음성파일.wav";
        a.click();
        window.URL.revokeObjectURL(audioData.url);
        
        let body = {
            userFrom: userFrom,
        };
        
        Axios.post('/api/run/audio', body).then((response) => {
            if (response.data.success) {
            } else {
                alert('Audio error');
            }
        });

        /*
        blobToDataURL(audioData.blob, function (dataurl) {
            let body = {
                userFrom: userFrom,
                audioUrl: dataurl,
            };

            Axios.post('/api/run/audio', body).then((response) => {
                if (response.data.success) {
                } else {
                    alert('Audio error');
                }
            });
        }); 
        */
    };

    const startAudio = () => {
        setRecordState(RecordState.START);
    };
    const stopAudio = () => {
        setRecordState(RecordState.STOP);
    };

    return (
        <div id="FD">
            <div className="audioRecord" style={{ display: 'none' }}>
                <AudioReactRecorder userFrom={userFrom} state={recordState} onStop={onStop} />
            </div>
            {btnVisible && (
                <ShowButton
                    style={{
                        scale: x.to({
                            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                            output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                        }),
                    }}
                    onClick={() => {
                        startAudio();
                        startVideo();
                    }}
                >
                    발표 시작하기
                </ShowButton>
            )}

            {!btnVisible && (
                <div className="facedetector">
                    <video id="webcam" autoPlay muted={true} ref={camera} />
                </div>
            )}

            <animated.img src={sloth} className="animal" id="sloth" style={appearSloth} />

            <animated.div className="text" id="sloth-text" ref={figures} style={appearSlothText} />
            {!btnVisible && <animated.img src={koala} className="animal" id="koala" style={appearKoala} />}
            {!btnVisible && (
                <animated.div className="text" id="koala-text" style={appearKoalaText}>
                    잘하고 있어요👍
                </animated.div>
            )}
            <div className="stopButton">
                <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                    <button onClick={stopAudio} type="submit">
                        끝내기
                    </button>
                </form>
            </div>
        </div>
    );
}
export default withRouter(FaceDetector);
