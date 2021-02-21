package com.project.watnet.user;

import javax.servlet.http.HttpSession;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.watnet.Const;
import com.project.watnet.SecurityUtils;
import com.project.watnet.model.UserDomain;
import com.project.watnet.model.UserEntity;

@Service
public class UserService {
	@Autowired
	private UserMapper mapper;

	@Autowired
	private SecurityUtils sUtils;

	@Autowired
	private HttpSession hs;

	// 1:로그인 성공, 2:아이디 없음, 3:비밀번호가 틀림
	public int login(UserEntity p) {
		UserEntity vo = mapper.selUser(p);

		if (vo == null) {
			return 2;
		} else if (!BCrypt.checkpw(p.getUserPw(), vo.getUserPw())) {
			return 3;
		}
		vo.setUserPw(null);
		vo.setRegDt(null);
		vo.setProfileImg(null);
		hs.setAttribute(Const.KEY_LOGINUSER, vo);
		return 1;
	}

	public int insUser(UserDomain p) {
		if (p.getUserId() == null || p.getUserId().length() < 2 || chkId(p) == 1) {
			return 0;
		}
		// 비밀번호 암호화 하는 부분
		String salt = sUtils.getSalt();
		String hashPw = sUtils.getHashPw(p.getUserPw(), salt);
		p.setUserPw(hashPw);

		return mapper.insUser(p);
	}

	public int chkId(UserEntity p) {
		if (mapper.selUser(p) == null) {
			return 0;
		}
		return 1;
	}

	public int chkNickname(UserEntity p) {
		if (mapper.selNickname(p) == null) {
			return 0;
		}
		return 1;
	}

}
