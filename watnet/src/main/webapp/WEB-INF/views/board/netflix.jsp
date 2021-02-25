<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="border-main-container">
	<div class="recVideo-container">
		<h2>WATNET 추천 영상</h2>
		<div class="recVideo-img">
			<img id="recVideo_img1" src="https://img.youtube.com/vi/V7WE7Fee6z8/mqdefault.jpg"
				alt="watnet recommand video 1">
			<img id="recVideo_img2" src="https://img.youtube.com/vi/N2Evva6aLC8/mqdefault.jpg"
				alt="watnet recommand video 2">
			<img id="recVideo_img3" src="https://img.youtube.com/vi/yXwC5Oe_5Ok/mqdefault.jpg"
				alt="watnet recommand video 3">
			<img id="recVideo_img4" src="https://img.youtube.com/vi/ITH6ttdXBqk/mqdefault.jpg"
				alt="watnet recommand video 4">
		</div>
	</div>

	<div class="recVideo_modal hidden">
		<div class="recVideo_md_overlay"></div>
		<div class="recVideo_md_content">
			<iframe id="recVideo_iframe" width="100%" height="100%"
				src="" frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen></iframe>
			<button type="button" id="recVideo_md_close">X</button>
		</div>
	</div>

	<div class="board-header">
		<h2>NETFLIX</h2>
		<button id="makeParty" type="button">파티 만들기</button>
	</div>
	<div class="board-container">
		<article class="board-article">
			<h2 class="artilce-h2">넷플릭스 프리미엄</h2>
			<span class="party-name">여기에 파티 이름</span>
			<div class="article-img">
				<img class="user1-profileImg" src="/res/img/profileImg.png"
					alt="profile image"> <img class="user2-profileImg"
					src="/res/img/default-profileImg.png" alt="profile image"> <img
					class="user3-profileImg" src="/res/img/default-profileImg.png"
					alt="profile image"> <img class="user4-profileImg"
					src="/res/img/default-profileImg.png" alt="profile image">
			</div>
			<div class="article-footer">
				<div class="party-date">
					<span>21.03.09부터(##일 남음)</span> <span>21.09.28까지(##일)</span>
				</div>
				<span class="pay-point"><span class="price">13,590</span>원</span>
			</div>
		</article>

	</div>
	<div class="board-footer">
		<button id="moreSelect" type="button">더 보기</button>
	</div>
</div>