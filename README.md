# Jasmine
2021-2 Capstone Design Project Repository   


Check more Detail at 
- [Jasmine_final_report](https://github.com/bo-lim/Jasmine/blob/4fdc66def641fa06286c5c3deeb31d1b433306ed/assets/%E1%84%8C%E1%85%A1%E1%84%89%E1%85%B3%E1%84%86%E1%85%B5%E1%86%AB_compressed.pdf)
- [User Manual](https://github.com/bo-lim/Jasmine/blob/4fdc66def641fa06286c5c3deeb31d1b433306ed/assets/%E1%84%8C%E1%85%A1%E1%84%89%E1%85%B3%E1%84%86%E1%85%B5%E1%86%AB_%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%8C%E1%85%A1%E1%84%86%E1%85%A6%E1%84%82%E1%85%B2%E1%84%8B%E1%85%A5%E1%86%AF_compressed.pdf)
- [Competition](http://www.swaicau.com/bbs/board.php?bo_table=program8&wr_id=25)   

Check out Presentation at [Link](https://youtu.be/AJ_jO4Orc58) - Youtube Link

## 👪 Teammates
- Team name: **자신만만 스피치 비타민, 자스민(Jasmine)**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Seunguk Yu** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Bolim Lee** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Sanghwa Lee**

<img width="660" alt="스크린샷 2022-05-04 오후 2 32 33" src="https://user-images.githubusercontent.com/55435898/166627499-6ca8e168-710a-41f6-bec6-f50ee8b2f7c9.png">

## 💡 Prototype
**Flow**

<img width="710" alt="스크린샷 2021-12-20 오후 5 26 12" src="https://user-images.githubusercontent.com/55435898/146735866-f4df9525-deda-4423-bd5e-39ee8b804397.png">

**Entire Logic**: Overall UI logic for our Jasmine service
![image](https://user-images.githubusercontent.com/80081345/144620776-15dbdcc2-a138-473c-84e4-6771fed889b6.png)

**Landing Page**: Introduce our speech coaching service, allow user login & logout and starting service
![image](https://user-images.githubusercontent.com/80081345/144620118-70730e4d-e247-4432-905d-6c2653e9c276.png)

**Action Page**: Start speech practice, allow checking our kid's speech analysis and user's flower(reward)
![image](https://user-images.githubusercontent.com/80081345/144620224-13cf2665-289a-42c4-ac5c-d60031539616.png)

**Speech Page 1**: When the direction of the head is correct, a koala appears and compliments in real time
![image](https://user-images.githubusercontent.com/80081345/144621208-963cad27-afef-4665-831f-ff6a7321a71b.png)

**Speech Page 2**: When the direction of the head is wrong, a sloth appears and gives caution in real time
![image](https://user-images.githubusercontent.com/80081345/144621303-fcc0dc1e-a141-4732-b586-f6ffae88651f.png)

**Speech Page 3**: When you can't see the child's face, a sloth appears and gives caution in real time
![image](https://user-images.githubusercontent.com/80081345/144621706-bb0247dd-0495-4b6b-aebf-6d51da165ac7.png)

**Analysis Page 1**: Voice analysis results are presented on the parent interface
![image](https://user-images.githubusercontent.com/80081345/144621825-ac4b2991-24ce-4df7-b8fc-55ae33320c2b.png)

**Analysis Page 2**: Text analysis results are presented on the parent interface
<img width="1440" alt="report첫화면" src="https://user-images.githubusercontent.com/55435898/146735119-31296701-df0e-47e3-89ad-e622c184f56f.png">



## 🚂 Pipeline
### 1. User sign up and Login at landing page
### 2. Start speech practice at action page
### 3. Make a presentation of kid's speech during the presentation is being recorded
Attitude Analysis (Video processing): by Blazeface, Customized Gaze-Detection   
Voice Analysis (Audio Processing): by Webrtcvad, Librosa, FFmpeg   
Text Analysis (Nature Language Processing): by TextRank, Kss, Konlpy
### 4. Check the results of the presentation analysis
Child interface and parent interface are separated in a result of the presentation analysis
