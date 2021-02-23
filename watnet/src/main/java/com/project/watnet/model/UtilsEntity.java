package com.project.watnet.model;

public class UtilsEntity {
	private int utilPk;
	private String pNum;
	private String tempPw;

	public int getUtilPk() {
		return utilPk;
	}
	public void setUtilPk(int utilPk) {
		this.utilPk = utilPk;
	}
	public String getpNum() {
		return pNum;
	}
	public void setpNum(String pNum) {
		this.pNum = pNum.replace("-", "");
	}
	public String getTempPw() {
		return tempPw;
	}
	public void setTempPw(String tempPw) {
		this.tempPw = tempPw;
	}
}
