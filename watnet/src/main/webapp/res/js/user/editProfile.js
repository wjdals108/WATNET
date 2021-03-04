var pwElem = document.querySelector('#pw')
var pwChkElem = document.querySelector('#pwChk')
var nicknameElem = document.querySelector('#nickname')
var emailElem = document.querySelector('#email')
var phoneNumberElem = document.querySelector('#phoneNumber')
var profileImgElem = document.querySelector('#profileImg')

var nicknameChkBtn = document.querySelector('#nicknameChk')
var phoneNumberChkBtn = document.querySelector('#phoneNumberChk')
var editBtn = document.querySelector('#editBtn')

var hiddenUserPkElem = document.querySelector('#hiddenUserPk')

//join 인증버튼들 checkbox
var nicknameCheckboxElem = document.querySelector('#nicknameChkCheckbox')
var pNumCheckboxElem = document.querySelector('#phoneNumberChkCheckbox')

var pwContainerElem = document.querySelector('.pw-container')


//user 프로필 정보를 읽어와서 jsp에 뿌려주자
selUser()

function selUser() {
	
	fetch(`/userAjax/selUser?userPk=${hiddenUserPkElem.value}`)
	.then(function(res) {
		return res.json()
	}).then(function(myJson) {
		if(myJson.userCategory != 1) {
			pwElem.value = 'snstemppw'
			pwChkElem.value = 'snstemppw'
			pwContainerElem.classList.add('hidden')
		}
		nicknameElem.value = myJson.nickname
		emailElem.value = myJson.userMail
		phoneNumberElem.value = myJson.pNum
		if(phoneNumberElem.value !== '') {
			pNumCheckboxElem.checked = true
		}
	})
}

//join 휴대폰 인증 modal창
var modalElem = document.querySelector('.modal')
var mdCloseElem = modalElem.querySelector('#md_close')
var mdCertificationElem = modalElem.querySelector('#certification')
var mdSubmitBtnElem = modalElem.querySelector('#md_submit')

function openModal(){
	modalElem.classList.remove('hidden')
}

function closeModal(){
	modalElem.classList.add('hidden')
}

function closeBtnModal() {
	if(confirm('아직 인증번호를 입력하시지 않으셨습니다. 정말 창을 닫으시겠습니까?')==true){
		closeModal()			
	} else {
		return
	}
}

mdCloseElem.addEventListener('click', closeBtnModal)

// 이메일 체크 정규식
function isEmail(asValue) {
	var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	return regExp.test(asValue); // 형식에 맞는 경우 true 리턴	
}

// 핸드폰 번호 체크 정규식
function isCelluar(asValue) {
	var regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
	return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

//휴대폰인증 버튼
function pNumChk() {
	if (phoneNumberElem.value === '') {
		alert('휴대폰 번호를 입력해 주세요')
		phoneNumberElem.focus()
		return
	} else if(!isCelluar(phoneNumberElem.value)) {
		alert('휴대폰 번호를 양식에 맞게 작성해주세요')
		phoneNumberElem.focus()
		return
	}
	
	fetch(`/userAjax/chkPNum?pNum=${phoneNumberElem.value}`)
	.then(function(res) {
		return res.json()
	})
	.then(function(myJson) {
		if(myJson === 1) {
			alert('sms전송완료')
			openModal()
			return
		} else {
			alert('실패')
		}
	})
}
//phoneNumberChkBtn.addEventListener('click', pNumChk)
phoneNumberChkBtn.addEventListener('click', openModal)

function chkTempPw() {
	if (mdCertificationElem.value === '') {
		alert('인증번호 6자리를 입력해 주세요')
		mdCertificationElem.focus()
		return
	}
	
	fetch(`/userAjax/chkTempPw?tempPw=${mdCertificationElem.value}`)
	.then(function(res) {
		return res.json()
	})
	.then(function(myJson) {
		if(myJson === 1) {
			alert('인증완료')
			closeModal()
			pNumCheckboxElem.checked = true
			return
		} else {
			alert('인증번호를 다시 확인해주세요')
			return
		}
	})
}
mdSubmitBtnElem.addEventListener('click', chkTempPw)

//프로필 편집
function edit() {

	if (pwElem.value === '') {
		alert('변경하실 비밀번호를 입력해 주세요')
		pwElem.focus()
		return
	} else if (pwElem.value !== pwChkElem.value) {
		alert('비밀번호가 일치하지 않습니다.')
		pwElem.focus()
		return
	} else if (nicknameElem.value === '') {
		alert('닉네임을 입력해 주세요')
		nicknameElem.focus()
		return
	} else if (emailElem.value === '') {
		alert('이메일을 입력해 주세요')
		emailElem.focus()
		return
	} else if (phoneNumberElem.value === '') {
		alert('휴대폰 번호를 입력해 주세요')
		phoneNumberElem.focus()
		return
	} else if(!isEmail(emailElem.value)) {
		alert('이메일을 양식에 맞게 작성해주세요')
		emailElem.focus()
		return
	} else if(!isCelluar(phoneNumberElem.value)) {
		alert('휴대폰 번호를 양식에 맞게 작성해주세요')
		phoneNumberElem.focus()
		return
	} 
	/*
	 else if(!pNumCheckboxElem.checked) {
		alert('휴대폰 인증을 해주세요')
		pNumElem.focus()
		return
	}*/
	
	
	var formData = new FormData()
	formData.append("userPk", hiddenUserPkElem.value)
	formData.append("userPw", pwElem.value)
	formData.append("userMail", emailElem.value)
	formData.append("nickname", nicknameElem.value)
	formData.append("pNum", phoneNumberElem.value)
	if(profileImgElem.files.length !== 0){
		formData.append("img", profileImgElem.files[0])			
	}
	
	fetch('/userAjax/editProfile', {
		method: 'post',
		body: formData
	}).then(function(res) {
		return res.json()
	})
		.then(function(myJson) {
			proc(myJson)
		})
}

function proc(myJson) {
	if (myJson === 0) {
		alert('프로필 편집에 실패하였습니다.')
		return
	}
	alert('프로필 편집에 성공하였습니다.')
	location.href = '/index'
}

editBtn.addEventListener('click', edit)
