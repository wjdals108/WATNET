<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="detail-main-container">
	
	<input id="hiddenBoardPk" type="hidden" value="${param.boardPk}">
   	<input id="loginUserPNum" type="hidden" value="${sessionScope.loginUser.pNum}">
	<input id="loginUserPk" type="hidden" value="${sessionScope.loginUser.userPk}">
	
	<div class="detail-header">
    </div>
    <div class="detail-title-container">
    </div>
    <div class="detail-leader-container">
    </div>
    <div class="detail-startDt">
    </div>
    <div class="detail-endDt">
    </div>
    <div class="detail-user-table">
    </div>
    <div class="detail-text">
    </div>
    <div class="detail-btn-container">
        <button id="detail-cancleBtn" type="button">목록</button>
        <button id="detail-submitBtn" type="button">참여신청</button>
    </div>
</div>