<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<input id="hiddenUserPk" type="hidden" value="${sessionScope.loginUser.userPk}">
<input id="hiddenUserCategory" type="hidden" value="${sessionScope.loginUser.userCategory}">
<div class="editProfileChkPw-pwChk-container">
    <div class="editProfileChkPw-pwChk-form">
        <span id="editProfileChkPw-span">비밀번호 확인</span>
        <input id="editProfileChkPw-pw" type="password" placeholder="비밀번호를 입력하세요">
        <button id="editProfileChkPw-pwChkBtn" type="button">확인</button>
    </div>
</div>