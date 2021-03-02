<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="myParty-main-container">
	<input id="hiddenUserPk" type="hidden" value="${param.userPk}">

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
    	<div class="md_overlay"></div>
		<div class="shareInfo_md_content">
			<div class="shareInfo-title">공유 ID/PW 확인</div>
			<div class="shareInfo-info-div">
				<div class="shareInfo-data">
					<span class="shareInfo-span">ID</span>
					<span class="shareInfo-ID">hn99710@naver.com</span>
					<button type="button">COPY</button>
				</div>
				<div class="shareInfo-data">
					<span class="shareInfo-span">PW</span>
					<span class="shareInfo-PW">koreait2020</span>
					<button type="button">COPY</button>
				</div>
			</div>
			<button id="shareInfo_md_close" type="button">확인</button>
		</div>
    </div>
    
</div>