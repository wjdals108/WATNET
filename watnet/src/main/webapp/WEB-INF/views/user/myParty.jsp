<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="myParty-main-container">
	<input id="hiddenUserPk" type="hidden" value="${sessionScope.loginUser.userPk}">

    <div class="myParty-background">
    </div>
    <div class="myParty-container">
        <div class="myParty-info">
        	<div class="myParty-title-span">
            </div>
            <div class="myParty-user-container">
            </div>
        </div>
        <div class="myParty-btn-container">
        </div>
    </div>
    
    <div id="shareInfoModal" class="modal hidden">
    </div>
    
    <div id="postModal" class="post-modal-container hidden">
    	<div class="post-md_overlay"></div>
    	<div class="post-modal-content">
    		<div class="view-post-container">
    			<div class="view-post"></div>
        </div>
        <div class="post-write-container">
				  <textarea id="post-write"></textarea>
				  <div class="post-write-btn">
				  	<button id="post-submitBtn" type="button">전송</button>
				  	<button id="closePostModalBtn" type="button">닫기</button>
				  </div>
				</div>
    	</div>
    </div>
    
</div>