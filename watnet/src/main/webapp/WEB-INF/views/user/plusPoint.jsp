<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<input id="hiddenUserPk" type="hidden" value="${sessionScope.loginUser.userPk}">
<input id="hiddenUserId" type="hidden" value="${sessionScope.loginUser.userId}">
<div class="plusPoint-container">
    <div class="plusPoint-form">
        <span id="plusPoint-span">POINT 충전</span>
        <input id="plusPoint-input" type="number" placeholder="충전하실 Point를 입력하세요">
        <button id="plusPointSubBtn" type="button">충전</button>
    </div>
</div>