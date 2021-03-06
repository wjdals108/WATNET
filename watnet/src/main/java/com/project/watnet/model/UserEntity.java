package com.project.watnet.model;

public class UserEntity {
	private int userPk;
	private String userId;
	private String userPw;
	private String userMail;
	private String regDt;
	private String nickname;
	private String pNum;
	private String profileImg;
	private int userPoint;
	private int userPaidPoint;
	private int userCategory;
	
	
	public int getUserPaidPoint() {
		return userPaidPoint;
	}
	public void setUserPaidPoint(int userPaidPoint) {
		this.userPaidPoint = userPaidPoint;
	}
	public int getUserPk() {
		return userPk;
	}
	public void setUserPk(int userPk) {
		this.userPk = userPk;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserPw() {
		return userPw;
	}
	public void setUserPw(String userPw) {
		this.userPw = userPw;
	}
	public String getUserMail() {
		return userMail;
	}
	public void setUserMail(String userMail) {
		this.userMail = userMail;
	}
	public String getRegDt() {
		return regDt;
	}
	public void setRegDt(String regDt) {
		this.regDt = regDt;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getpNum() {
		return pNum;
	}
	public void setpNum(String pNum) {
		this.pNum = pNum.replace("-", "");
	}
	public String getProfileImg() {
		return profileImg;
	}
	public void setProfileImg(String profileImg) {
		this.profileImg = profileImg;
	}
	public int getUserPoint() {
		return userPoint;
	}
	public void setUserPoint(int userPoint) {
		this.userPoint = userPoint;
	}
	public int getUserCategory() {
		return userCategory;
	}
	public void setUserCategory(int userCategory) {
		this.userCategory = userCategory;
	}
	
}
