package com.project.watnet.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.watnet.SecurityUtils;
import com.project.watnet.model.UserDomain;
import com.project.watnet.model.UserEntity;

@Service
public class UserService {
	@Autowired
	private UserMapper mapper;
	
	@Autowired
	private SecurityUtils sUtils;
	
	public int insUser(UserDomain p) {
		if(p.getUserId() == null || p.getUserId().length() < 2 || chkId(p)==1) {
			return 0;
		}
		//비밀번호 암호화 하는 부분
		String salt = sUtils.getSalt();
		String hashPw = sUtils.getHashPw(p.getUserPw(), salt);
		p.setUserPw(hashPw);
		
		return mapper.insUser(p);
	}
	
	public int chkId(UserEntity p) {
		if(mapper.selUser(p) == null) {
			return 0;
		}
		return 1;
	}
	
	public int chkNickname(UserEntity p) {
		if(mapper.selNickname(p) == null) {
			return 0;
		}
		return 1;
	}
}
