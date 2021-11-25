import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import logo from '../../../img/logo.png'
import '../../../css/Report.css'
import { withRouter } from 'react-router-dom';

function Report(props){
    let userFrom = localStorage.getItem('userId');
    const [vision, setVision] = useState([]);
    const [voice, setVoice] = useState([]);
    const [word, setWord] = useState([]);

    const mk_comments = () => {
        let comments = [];
        if (vision['score'] >= 70) {
            comments.push(<><span>{userFrom}(이)의 발표태도가 좋아요.</span><br/></>)
        } else {
            comments.push(<><span>{userFrom}(이)의 고개가 정면을 보고 있도록 도와주세요.</span><br/></>)
        }
        comments.push(<br/>);
        let comment_arr = ['variety_comment','sentcount_comment','keywords_comment',
        'stopwords_comment','countwords_comment']
        comment_arr.forEach( (txt)=>{
            comments.push(<><span key={txt}>{txt}</span><br/></>)
        })
        
        
        return comments;
    };


    useEffect(() => {
        axios.get('/api/report/vision', {
            params: {
                userFrom: userFrom,
                timestamp: '2021-11-24T01:09:36.188+00:00'
                // timestamp: props.timestamp
            },
        }).then((response) => {
            if (response.data.success) {
            } else {
                alert('발표 태도 분석을 불러오는 데 실패했습니다.');
            }
            setVision(response.data.list);
        });

        axios.get('/api/report/voice', {
            params: {
                userFrom: userFrom,
                timestamp: '2021-11-24T01:09:36.188+00:00'
                // timestamp: props.timestamp
            },
        }).then((response) => {
            if (response.data.success) {
            } else {
                alert('발표 음성 분석을 불러오는 데 실패했습니다.');
            }
            setVoice(response.data.list);
        });

        axios.get('/api/report/word', {
            params: {
                userFrom: userFrom,
                timestamp: '2021-11-24T01:09:36.188+00:00'
                // timestamp: props.timestamp
            },
        }).then((response) => {
            if (response.data.success) {
            } else {
                alert('발표 대본 분석을 불러오는 데 실패했습니다.');
            }
            setWord(response.data.list);
        });
        
    }, []);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.history.push('/list');
    };

    return (
        <div className='report'>
            <div className="simpleNavi">
                <img src={logo} alt='logo'/>
            </div>
            <div className='body'>
                
                <div className='content'>
                    <div className="question" id="report_question">
                        <h1 className='title'>Report</h1>   
                        <h2>
                            <span className='date' id="report_date">{props.date}</span>
                            <span className='time' id="report_time">{props.time}</span>
                        </h2>
                    </div>
                    <div className='box' id='box1'>
                        <span className='mini-title'>
                            키워드
                        </span>
                        <div className='wordcloud'>
                            <img className="wcImg" src={'Jasmine_wordcloud_keywords.png'} alt='wordcloud'/>
                            <div className='rank'>
                                <ul>
                                    <li>1위:{String(word['top3_keywords']).split(',')[0]}</li>
                                    <li>2위:{String(word['top3_keywords']).split(',')[1]}</li>
                                    <li>3위:{String(word['top3_keywords']).split(',')[2]}</li>
                                </ul>
                            </div>
                        </div>
                        <div className='feedback-content subCmt'>
                            <span>{word['keywords_cmt']}</span>
                        </div>
                    </div>
                    
                    <div className='box' id='box2'>
                        <span className='mini-title'>
                            필요 없는 단어
                        </span>
                        <div className='wordcloud'>
                            <img className="wcImg" src={'Jasmine_wordcloud_stopwords.png'} alt='wordcloud'/>
                            <div className='rank'>
                                <ul>
                                    <li>1위:{String(word['top3_stopwords']).split(',')[0]}</li>
                                    <li>2위:{String(word['top3_stopwords']).split(',')[1]}</li>
                                    <li>3위:{String(word['top3_stopwords']).split(',')[2]}</li>
                                </ul>
                            </div>
                        </div>
                        <div className='feedback-content subCmt'>
                            <span>{word['stopwords_cmt']}</span>
                        </div>
                    </div>
                    <div className='box' id='box9'>
                        <span className='mini-title'>
                            어휘 다양도
                        </span>
                        <div className='feedback-content subCmt'>
                            <span>{word['variety_cmt']}</span>
                        </div>
                    </div>
                    <div className='box' id='box10'>
                        <span className='mini-title'>
                            발표 태도
                        </span>
                        <div className='feedback-content subCmt'>
                            <span>{vision['comment']}</span>
                        </div>
                    </div>
                    <div className='box' id='box3'>
                        <span className='mini-title'>
                            많이 사용한 단어
                        </span>
                        <div className='wordcloud'>
                            <img className="wcImg" id="box3img" src={'Jasmine_wordcloud_countwords.png'} alt='wordcloud'/>
                            <div className='rank box3img'>
                                <ul id="rank-box3">
                                    <li>1위:{String(word['top3_countwords']).split(',')[0]}</li>
                                    <li>2위:{String(word['top3_countwords']).split(',')[1]}</li>
                                    <li>3위:{String(word['top3_countwords']).split(',')[2]}</li>
                                </ul>
                            </div>
                        </div>
                        <div className='feedback-content subCmt'>
                            <span>{word['countwords_cmt']}</span>
                        </div>
                    </div>
                    <div className='box' id='box4'>
                        <span className='mini-title'>
                            문장 사용
                        </span>
                        <div className='wordcloud'>
                            <img className="scImg" src={'Jasmine_sentence_count.png'} alt='wordcloud'/>
                        </div>
                        <div className='feedback-content subCmt'>
                            <span>{word['sentcount_cmt']}</span>
                        </div>
                    </div>
                    <div className='box' id='box5'>
                        <span className='mini-title'>
                            발화와 묵음 구간
                        </span>
                        <div className='wordcloud'>
                            <img className="scImg" src={'Jasmine_audio_묵음 구간_시간.png'} alt='wordcloud'/>
                        </div>
                    </div>
                    
                    <div className='box' id='box6'>
                        <span className='mini-title' style={{visibility:'hidden'}} >
                            발화와 묵음구간2
                        </span>
                        <div className='wordcloud'>
                            <img className="scImg" src={'Jasmine_audio_발화 구간_시간.png'} alt='wordcloud'/>
                        </div>
                    </div>
                    <div className='feedback-content subCmt'>
                        <span>{voice['slient_cmt']}</span>
                    </div>
                    <div className='box' id='box7'>
                        <span className='mini-title'>
                            발화 속도
                        </span>
                        <div className='wordcloud'>
                            <img className="scImg" src={'Jasmine_audio_시간_목소리 속도.png'} alt='wordcloud'/>
                        </div>
                        <div className='feedback-content subCmt'>
                            <span>{voice['tempo_cmt']}</span>
                        </div>
                    </div>
                    <div className='box' id='box8'>
                        <span className='mini-title'>
                            발화 크기
                        </span>
                        <div className='wordcloud'>
                            <img className="scImg" src={'Jasmine_audio_시간_목소리 크기.png'} alt='wordcloud'/>
                        </div>
                        <div className='feedback-content subCmt'>
                            <span>{voice['volume_cmt']}</span>
                        </div>
                    </div>
                    <div className='box' id='box9'>
                        <span className='mini-title'>
                            어휘 다양도
                        </span>
                        <div className='feedback-content subCmt'>
                            <span>{word['variety_cmt']}</span>
                        </div>
                    </div>
                    {/* <div className='secondrow'>
                        <div className='graph'>
                            그래프
                        </div>
                        <div className='summary'>
                            발표 내용 요약
                        </div>
                    </div> */}
                    <div className='thirdrow'>
                        <span className='mini-title' id='feedback-title'>피드백</span>
                        <div className='feedback-content' style={{marginLeft:"20px"}}>
                            {mk_comments()}
                        </div>
                    </div>
                    <div className='scoreboard'>
                        <div className='totalscore'>총점 : 100점</div>
                        <div className='subscore'>
                            <span id='vision'>시선 : {word['vision']}점</span>
                            <span id='voice'>목소리 : {word['voice']}점</span>
                            <span id='contents'>내용 : {word['score']}점</span>
                        </div>
                    </div>
                    <div className="stopButton" id="back">
                        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                            <button type="submit">뒤로 가기</button>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(Report);