var loginBtnElem = document.querySelector('#login-btn')

//login.jsp --------------------- js
if(loginBtnElem) {
	var loginIdElem = document.querySelector('#loginId')
	var loginPwElem = document.querySelector('#loginPw')
	
	function login() {
		if(loginIdElem.value === '') {
			alert('아이디를 입력하세요')
			loginIdElem.focus()
			return
		} else if(loginPwElem.value === '') {
			alert('비밀번호를 입력하세요')
			loginPwElem.focus()
			return
		}
		
		var param = {
			userId: loginIdElem.value,
			userPw: loginPwElem.value,
		}

		fetch('/userAjax/login', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(param)
		}).then(function(res) {
			return res.json()
		}).then(function(myJson) {
			if(myJson === 1) {
				location.href="/index"
				return
			} else if(myJson === 2) {
				alert('등록된 아이디가 없습니다.')
				loginIdElem.focus()
				return
			} else if(myJson === 3) {
				alert('비밀번호가 틀렸습니다.')
				loginPwElem.focus()
				return
			}
		})
		
	}
	
	loginBtnElem.addEventListener('click', login)
	
	
	// ID/PW찾기 모달창
	var mdOpenElem = document.querySelector('#md_open')
	var modalElem = document.querySelector('.modal')
	var mdCloseElem = modalElem.querySelector('#md_close')
	var mdEmailElem = modalElem.querySelector('#md_email')
	var mdPNumElem = modalElem.querySelector('#md_pNum')
	var mdFindBtnElem = modalElem.querySelector('#md_find')
	
	function openModal(){
		modalElem.classList.remove('hidden')
	}
	
	function closeModal(){
		modalElem.classList.add('hidden')
	}	
	
	function findUser() {
		if(mdEmailElem.value === '') {
			alert('가입되어 있는 email을 입력해 주세요')
			mdEmailElem.focus()
			return
		} else if(mdPNumElem.value === ''){
			alert('가입되어 있는 휴대폰번호를 입력해 주세요')
			mdPNumElem.focus()
			return
		}
		
		var param = {
			userMail: mdEmailElem.value,
			pNum: mdPNumElem.value,
		}

		fetch('/userAjax/findUser', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(param)
		}).then(function(res) {
			return res.json()
		}).then(function(myJson) {
			if(myJson === 0) {
				alert('등록된 휴대폰번호가 없습니다.')
				mdPNumElem.focus()
				return
			} else if(myJson === 1) {
				alert('등록된 이메일이 없습니다.')
				mdEmailElem.focus()
				return
			} else if(myJson === 2) {
				alert('등록된 이메일로 ID/PW 정보를 보냈습니다. 확인하세요')
				return
			}
		})
	}
	
	mdOpenElem.addEventListener('click', openModal)
	mdCloseElem.addEventListener('click', closeModal)
	mdFindBtnElem.addEventListener('click', findUser)
	
}