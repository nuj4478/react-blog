<article>
            <h1>REACT BLOG</h1>
<blockquote>
<p dir="auto">REACT 사이드 프로젝트</p>
</blockquote>
<h2>Content</h2>
<ol dir="auto">
<li><a href="#dev-spec">개발 환경</a></li>
<li><a href="#folder-sturcture">디렉터리 구조 설명</a></li>
<li><a href="#installation">설치 및 실행 방법</a></li>
<li><a href="#dependencies">Dependencies</a></li>
<li><a href="#requirement">과제 요구사항</a></li>
<li><a href="#solution">구현 내용</a></li>
</ol>
<h3>1. 개발 환경</h3>
<ul dir="auto">
<li>HTML5</li>
<li>Javascript</li>
<li>CSS</li>
</ul>
<h3>2 디렉터리 구조 설명</h3>
<div class="highlight highlight-source-shell notranslate position-relative overflow-auto" dir="auto" data-snippet-clipboard-copy-content="└── XMON FE CORDING TEST
    ├── img                         # 이미지 저장 폴더
    ├── style                       # css파일 저장 폴더
    └── js                          # js파일 저장 푤더   
         ├── jquery-3.3.1.min.js    # jquery core 최신버전
         ├── Memo.js                # Memo class 로직이 있는 file
         ├── MemoService.js         # Memo Service 로직이 있는 file  
         └── script.js              # answer.html에서 로드하는 스크립트 file
    ├── answer.html                 
    └── question.html             "><pre>└── XMON FE CORDING TEST
    ├── img                         <span class="pl-c"><span class="pl-c">#</span> 이미지 저장 폴더</span>
    ├── style                       <span class="pl-c"><span class="pl-c">#</span> css파일� 저장 폴더</span>
    └── js                          <span class="pl-c"><span class="pl-c">#</span> js파일 저장 푤더   </span>
         ├── jquery-3.3.1.min.js    <span class="pl-c"><span class="pl-c">#</span> jquery core 최신버전</span>
         ├── Memo.js                <span class="pl-c"><span class="pl-c">#</span> Memo class 로직이 있는 file</span>
         ├── MemoService.js         <span class="pl-c"><span class="pl-c">#</span> Memo Service 로직이 있는 file  </span>
         └── script.js              <span class="pl-c"><span class="pl-c">#</span> answer.html에서 로드하는 스크립트 file</span>
    ├── answer.html                 
    └── question.html             </pre></div>
<h3>3. 설치 및 실행 방법</h3>
<ul>
<li>라이브 서버는 따로 구축하지 않았습니다. 파일시스템에서 answer.html 불러올 경우 script의 CORS issue 때문에 실행되지 않습니다.</li>
</ul>
<h3>4. Dependencies</h3>
<table>
<thead>
<tr>
<th>Dependency</th>
<th>version</th>
</tr>
</thead>
<tbody>
<tr>
<td>jquery</td>
<td>3.3.1</td>
</tr>
</tbody>
</table>
<h3>5. 과제 요구사항</h3>
<ul dir="auto">
<li>바탕화면(쪽지가 아닌 회색부분)에 마우스 우클릭시 마우스 위치가 top, left값을 가지는 새로운 쪽지를 생성합니다. answer.html 참고(기본 크기 div.textarea : width:200px, height:100px;)</li>
<li>쪽지의 헤더 부분 드래그시 쪽지를 바탕화면 내에서 이동이 가능해야합니다.(Drag &amp; Drop 플러그인 사용금지, 직접구현해야 함)</li>
<li>드래그 드랍 또는 내용 수정시에 해당하는 쪽지는 겹쳐진 쪽지 중 최상단으로 나와야합니다.</li>
<li>X 버튼 클릭시 삭제 되어야합니다.</li>
<li>쪽지 우 하단 드래그시 크기가 변경되어야 합니다. 크기 변경은 div.textarea의 width, height가 변경되어야 합니다.</li>
<li>모든 쪽지 내용, 위치, 크기, 쌓이는 순서는 localStorage에 저장되어야 하며, 리로드시 모든 쪽지가 그대로 나와야합니다.</li>
</ul>
<h3>6. 구현 내용</h3>
<ul>
<li>메모(쪽지)를 하나의 class로 만들고, 인스턴스가 생성될 때마다 그에 필요한 DOM과 이벤트 핸들러들이 바인딩 됩니다.</li>
<li>모든 메모의 내용, 위치, 크기, 쌓이는 순서는 localStorage에 저장하였으며, 추가로 메모당 고유한 id값 부여합니다. 메모 모델의 형태는 다음과 같습니다.</li>
</ul>
<div class="highlight highlight-source-shell notranslate position-relative overflow-auto" dir="auto" data-snippet-clipboard-copy-content="  memo = {
    identifier: 'memo_1',
    content: '메모 하세요!',
    position: {
      top: 0,
      left: 0
    },
    size: {
      width: 0,
      height: 0
    },
    order: 1
  }"><pre>  memo = {
    identifier: <span class="pl-s"><span class="pl-pds">'</span>memo_1<span class="pl-pds">'</span></span>,
    content: <span class="pl-s"><span class="pl-pds">'</span>메모 하세요!<span class="pl-pds">'</span></span>,
    position: {
      top: 0,
      left: 0
    },
    size: {
      width: 0,
      height: 0
    },
    order: 1
  }</pre></div>
<ul>
<li>메모의 데이터에 대한 CRUD 로직을 공통 함수로 추출 하고 이를 MemoService.js에 구현하였습니다.</li>
<li>더 나아가 동기로 작업을 처리 하기 위해 Promise로 구현하였습니다. (추후 서버로부터 api call을 고려 하였습니다)</li>
<li>드래드 드랍에 대한 이벤트는 처음에는 jquery로 구현하였으나(jquery-ui는 사용하지 않음) 이벤트가 부자연 스러워 HTML5 DragNDrop API로 코드를 리팩토링하였습니다.</li>
<li>리사이즈 역시 javascript로만 구현하였습니다.</li>
<li>메모를 최상단으로 배치시키기 위하여 findHighestOrder라는 function을 구현하였습니다. 본 함수에서는 저장된 메모 리스트의 가장 높은 순서를 리턴 합니다. 이후 active한 메모의 order값을 수정 한 다음 z-index에 바인딩 합니다.</li>
<li>마지막으로 메모의 이동범위를 브라우저 영역 안 쪽으로 제한하였습니다.</li>
</ul>
</article>
