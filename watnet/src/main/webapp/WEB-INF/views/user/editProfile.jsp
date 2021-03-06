<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="edit-container">
	<input id="hiddenUserPk" type="hidden" value="${sessionScope.loginUser.userPk}">
    <div class="pw-container">
        <h3 class="edit-h3">비밀번호 변경</h3>
        <div class="pw-form">
            <ul class="pw-list">
                <li>
                    <span>변경할 비밀번호</span>
                    <input id="pw" type="password" placeholder="비밀번호">
                </li>
                <li>
                    <span>비밀번호확인</span>
                    <input id="pwChk" type="password" placeholder="비밀번호 확인">
                </li>
            </ul>
        </div>
    </div>
    <div class="edit_userinfo-container">
        <h3 class="edit-h3">내 정보 입력</h3>
        <div class="edit_userinfo-form">
            <ul class="edit_userinfo-list">
                <li>
                    <span>닉네임</span>
                    <input id="nickname" type="text" placeholder="닉네임">
                </li>
                <li>
                    <span>이메일</span>
                    <input id="email" type="text" placeholder="이메일">
                </li>
                <li>
                    <span>휴대폰 번호</span>
                    <input id="phoneNumber" type="text" placeholder="휴대폰 번호">
                    <button id="phoneNumberChk" type="button">휴대폰인증</button>
                    <span class="explanation">휴대폰 번호는 기호없이 숫자만 입력해주세요</span>
                    <input type="checkbox" id="phoneNumberChkCheckbox">
                </li>
            </ul>
            
            <div class="modal hidden">
							<div class="md_overlay"></div>
							<div class="md_content">
								<h2>인증번호를 입력하세요</h2>
								<input type="text" class="md_input" id="certification" placeholder="인증번호를 입력하세요" required>
								<button type="button" id="md_submit">전송</button>
								<button type="button" id="md_close">X</button>
							</div>
						</div>
            
        </div>
    </div>
    <div class="edit_userinfo-container">
        <h3 class="edit-h3">프로필 사진 변경</h3>
        <div class="edit_userinfo-form">
            <ul class="edit_etc-list">
                <li>
                    <div class="profileImg-container">
                        <span>프로필 사진</span>
                        <label id="profileImg-btn" for="profileImg">
               			             파일 업로드
                        </label>
                        <input id="profileImg" type="file" accept="image/*">
                        <span class="explanation">이미지는 60px X 60px 사이즈에 최적화</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="edit-btn-container">
        <a href="/index">
            <button id="cancleBtn" type="button">취소</button>
        </a>
        <button id="editBtn" type="button">편집</button>
    </div>
</div>