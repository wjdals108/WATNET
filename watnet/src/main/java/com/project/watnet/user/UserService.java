package com.project.watnet.user;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.watnet.Const;
import com.project.watnet.FileUtils;
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

	@Autowired
	private FileUtils fUtils;

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

	public int insUser(UserDomain p, MultipartFile mf) {
		if (p.getUserId() == null || p.getUserId().length() < 2 || chkId(p) == 1) {
			return 0;
		}
		// 비밀번호 암호화 하는 부분
		String salt = sUtils.getSalt();
		String hashPw = sUtils.getHashPw(p.getUserPw(), salt);
		p.setUserPw(hashPw);

		if(mf==null) {
			p.setProfileImg(null);
			return mapper.insUser(p);
		} else {
			//profileImg DB에 저장하기 위해 하는부분
			String profileImg = fUtils.getRandomFileNm(mf.getOriginalFilename());
			
			p.setProfileImg(profileImg);
			
			int result = mapper.insUser(p);
			
			int userPk = p.getUserPk();
			try {
				String folder = "/res/img/user/" + userPk;
				String basePath = fUtils.getBasePath(folder);
				fUtils.makeFolders(basePath);
				File file = new File(basePath, profileImg);
				mf.transferTo(file);
			} catch (Exception e) {
				e.printStackTrace();
			}			
			return result;
		}

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
