package com.project.watnet;

import javax.servlet.http.HttpSession;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Component;

import com.project.watnet.model.UserEntity;

@Component
public class SecurityUtils {
	public int getLoginUserPk(HttpSession hs) {
		UserEntity loginUser = getLoginUser(hs);
		
		return (loginUser == null) ? 0 : loginUser.getUserPk();
	}
	
	public UserEntity getLoginUser(HttpSession hs) {
		return (UserEntity)hs.getAttribute(Const.KEY_LOGINUSER);
	}
	
	public String getSalt() {
		return BCrypt.gensalt();
	}
	
	public String getHashPw(String pw, String salt) {
		//BCrypt.checkpw(plaintext,  hashed); 얘 참고하자. 이방법쓰면 DB에 salt값 저장할 필요 없다.
		return BCrypt.hashpw(pw, salt);
	}
}
