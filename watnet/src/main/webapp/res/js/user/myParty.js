var myPartyElem = document.querySelector('.myParty-container')
var myPartyInfoElem = document.querySelector('.myParty-info')
var myPartySpanElem = document.querySelector('.myParty-title-span')
var myPartyUserElem = document.querySelector('.myParty-user-container')
var myPartyBtnElem = document.querySelector('.myParty-btn-container')

var shareInfoModalElem = document.querySelector('#shareInfoModal')

var hiddenUserPkElem = document.querySelector('#hiddenUserPk')

if(hiddenUserPkElem.value === '') {
	myPartySpanElem.innerHTML = 
	`
	<span class="myParty-info-span">
	로그인 되어 있지 않습니다!<br>
	지금 바로 WATNET을 이용해보세요 
	</span>
	`
}

function makeNullParty() {
	myPartySpanElem.innerHTML = 
	`
	<span class="myParty-info-span">
	등록되어 있는 Party가 없습니다!<br>
	지금 바로 Party를 찾으러 가보세요
	</span>
	`
}

function openShareInfoModal(startDt, leaderPk) {
	var startDate = new Date(startDt)
	var nowDate = new Date()
	
	if(nowDate <= startDate && leaderPk != hiddenUserPkElem.value) {
		alert('계정 공유 시작날짜가 되어야 공유 ID/PW를 확인 하실 수 있습니다.')
		return
	}
	shareInfoModalElem.classList.remove('hidden')
}

function closeShareInfoModal() {
	shareInfoModalElem.classList.add('hidden')
}

function copyToClipboard(val) {
  var t = document.createElement("textarea")
  document.body.appendChild(t)
  t.value = val
  t.select()
  document.execCommand('copy')
  document.body.removeChild(t)
	alert('복사되었습니다.')
}

selMyParty()

function selMyParty() {
	fetch(`/boardAjax/selMyParty?userPk=${hiddenUserPkElem.value}`)
	.then(function(res) {
		return res.json()
	}).then(function(myJson) {
		if(myJson.boardPk == 0) {
			makeNullParty()
			return
		}
		makeMyParty(myJson)
		selUserProfile(myJson)
		makeShareInfoModal(myJson)
	})
	
	
	function selUserProfile(item) {
		fetch(`/boardAjax/selUserProfile?boardPk=${item.boardPk}`)
		.then(function(res) {
			return res.json()
		}).then(function(myJson) {
			myJson.forEach(function(item) {
				makeUser(item)
			})
			for(var i=1; i<=(4-myJson.length); i++) {
				makeNoneUser()
			}
		})
	}
	
	function makeUser(myJson) {
		var userContainerElem = document.createElement('div')
		userContainerElem.classList.add('myParty-user')
		userContainerElem.innerHTML = 
		`
		<img src="/res/img/user/${myJson.userPk}/${myJson.profileImg}" alt="profile image" onerror="this.src='/res/img/profileImg.png'">
	    <span>${myJson.nickname}</span>
		`
		myPartyUserElem.append(userContainerElem)
	}

	function makeNoneUser() {
		var userContainerElem = document.createElement('div')
		userContainerElem.classList.add('myParty-user')
		userContainerElem.innerHTML = 
		`
		<img src="/res/img/default-profileImg.png" alt="profile image">
	    <span>모집대기중</span>
		`
		myPartyUserElem.append(userContainerElem)
	}
	
	function makeShareInfoModal(myJson) {
		shareInfoModalElem.innerHTML = 
		`
		<div class="md_overlay"></div>
		<div class="shareInfo_md_content">
			<div class="shareInfo-title">공유 ID/PW 확인</div>
			<div class="shareInfo-info-div">
				<div class="shareInfo-data">
					<span class="shareInfo-span">ID</span>
					<span class="shareInfo-ID">${myJson.shareId}</span>
					<button type="button" onclick="copyToClipboard('${myJson.shareId}')">COPY</button>
				</div>
				<div class="shareInfo-data">
					<span class="shareInfo-span">PW</span>
					<span class="shareInfo-PW">${myJson.sharePw}</span>
					<button type="button" onclick="copyToClipboard('${myJson.sharePw}')">COPY</button>
				</div>
			</div>
			<button id="shareInfo_md_close" onclick="closeShareInfoModal()" type="button">확인</button>
		</div>
		`
	}
}

function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function makeMyParty(item) {
	myPartySpanElem.innerHTML = 
	`
	<span class="myParty-category">${item.nm} 프리미엄 파티</span>
    <span class="myParty-info-span">
       	시작 날짜 : ${item.startDt} <br>
		종료 날짜 : ${item.endDt} <br>
		총 비용 : ${numberWithCommas(item.price)} 원
    </span>
	`
	
	myPartyBtnElem.innerHTML = 
	`
	<button id="chkShareInfo" onclick="openShareInfoModal('${item.startDt}', '${item.leaderPk}')" type="button">공유 ID/PW 확인</button>
    <div class="myParty-btn">
        <button id="openPostBtn" type="button" onclick="openPostModal()">쪽지보내기</button>
        <button id="quitPartyBtn" onclick="quitParty()" type="button">파티 탈퇴</button>
    </div>
	`
}

//파티탈퇴 부분
function quitParty() {
	if(confirm('정말 Party를 탈퇴하시겠습니까?') == true) {
		fetch(`/boardAjax?userPk=${hiddenUserPkElem.value}`, {
			method: 'delete'
		}).then(function(res) {
			return res.json()
		}).then(function(myJson) {
			console.log(myJson)
			if(myJson == 1) {
				alert('파티 탈퇴가 완료되었습니다.')
				location.reload()
			} else {
				alert('실패')
				return
			}
		})
	} else {
		return
	}
}


//post 부분
var postModalElem = document.querySelector('#postModal')
var viewPostElem = document.querySelector('.view-post')

var postWriteElem = document.querySelector('#post-write')

var postSubBtnElem = document.querySelector('#post-submitBtn')
var closePostModalBtn = document.querySelector('#closePostModalBtn')

function openPostModal() {
	postModalElem.classList.remove('hidden')
	scrollDown(viewPostElem)
}

function closePostModal() {
	postModalElem.classList.add('hidden')
}

closePostModalBtn.addEventListener('click', closePostModal)

selPost()

function selPost() {
	fetch(`/postAjax?userPk=${hiddenUserPkElem.value}`)
	.then(function(res) {
		return res.json()
	}).then(function(myJson) {
		viewPostElem.innerHTML = ''
		myJson.forEach(function(item) {
			makePost(item)
		})
	})
}

function makePost(item) {
	var post = document.createElement('div')
	post.classList.add('post-container')
	if(item.sendUserPk == hiddenUserPkElem.value){
		post.classList.add('myPost')
	}
	post.innerHTML = 
	`
	<img class="post-profileImg" src="/res/img/user/${item.sendUserPk}/${item.profileImg}" alt="user profile image" onerror="this.src='/res/img/profileImg.png'">
	<div class="post-username_ctnt">
	    <span class="post-userNickname">${item.nickname}</span>
	    <p class="post-ctnt">${item.ctnt}</p>
	</div>
	<span class="post-dt">${item.regDt}</span>
	`
	viewPostElem.append(post)
	scrollDown(viewPostElem)
}

function scrollDown(Elem) {
	Elem.scrollTop = Elem.scrollHeight
}

//post 작성
function insPost() {
	
	if(postWriteElem.value === '') {
		alert('POST 내용을 입력하세요')
		postWriteElem.focus()
		return
	}
	
	var param = {
		sendUserPk: hiddenUserPkElem.value,
		ctnt: postWriteElem.value,
	}
	
	fetch(`/postAjax`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(param)
	}).then(function(res) {
		return res.json()
	}).then(function(myJson) {
		if(myJson == 1) {
			selPost()
			postWriteElem.value = ''
		}
	})
}
postSubBtnElem.addEventListener('click', insPost)





