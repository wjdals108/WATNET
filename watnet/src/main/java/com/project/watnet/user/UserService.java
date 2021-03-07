package com.project.watnet.user;

import java.io.File;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.watnet.Const;
import com.project.watnet.FileUtils;
import com.project.watnet.MailUtils;
import com.project.watnet.SecurityUtils;
import com.project.watnet.SmsUtils;
import com.project.watnet.model.PointHistoryDomain;
import com.project.watnet.model.PointHistoryEntity;
import com.project.watnet.model.UserDomain;
import com.project.watnet.model.UserEntity;
import com.project.watnet.model.UtilsEntity;

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
	
	@Autowired
	private MailUtils mUtils;
	
	@Autowired
	private SmsUtils smsUtils;

	// 1:로그인 성공, 2:아이디 없음, 3:비밀번호가 틀림
	public int login(UserEntity p) {
		UserDomain vo = mapper.selUser(p);

		if (vo == null) {
			return 2;
		} else if (!BCrypt.checkpw(p.getUserPw(), vo.getUserPw())) {
			return 3;
		}
		vo.setUserPw(null);
		vo.setRegDt(null);
		hs.setAttribute(Const.KEY_LOGINUSER, vo);
		return 1;
	}
	
	public int insUser(UserDomain p, MultipartFile mf) {
		if (p.getUserId() == null || p.getUserId().length() < 2 || chkUser(p) == 1) {
			return 0;
		}
		// 비밀번호 암호화 하는 부분
		String salt = sUtils.getSalt();
		String hashPw = sUtils.getHashPw(p.getUserPw(), salt);
		p.setUserPw(hashPw);
		
		if(p.getRecId() != null && !p.getRecId().equals("")) {
			UserDomain vo = new UserDomain();
			vo.setUserId(p.getRecId());
			vo = mapper.selUser(vo);
			vo.setModPoint(500);
			mapper.updPoint(vo);
			insPointHistory(vo.getUserPk(), 500);
			
			p.setUserPoint(1500);
		} else {
			p.setUserPoint(1000);
		}
		
		if(mf==null) {
			p.setProfileImg(null);
			int result = mapper.insUser(p);
			insPointHistory(p.getUserPk(), p.getUserPoint());
			return result;
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
			insPointHistory(p.getUserPk(), p.getUserPoint());
			return result;
		}
	}
	
	public int insPointHistory(int userPk, int point) {
		PointHistoryEntity vo2 = new PointHistoryEntity();
		vo2.setUserPk(userPk);
		vo2.setPoint(point);
		
		PointHistoryEntity vo = mapper.selPointHistory(vo2);
		if(vo==null) {
			vo2.setResult(0);
		} else {
			vo2.setResult(vo.getResult());
		}
		return mapper.insPointHistory(vo2);
	}
	
	//0:휴대폰번호가 db에 없음		1:입력한 이메일과 db에 이메일이 다름		2:메일 발송 완료
	public int findUser(UserEntity p) {
		UserEntity vo = mapper.selUser(p);
		if(vo == null) {
			return 0;
		}
		
		if(!p.getUserMail().equals(vo.getUserMail())) {
			return 1;
		}
		
		String temporaryPw = sUtils.setPassword(8);
		String salt = sUtils.getSalt();
		String hashPw = sUtils.getHashPw(temporaryPw, salt);
		vo.setUserPw(hashPw);
		mapper.updPw(vo);
		
		mUtils.sendMail(vo, temporaryPw);
		
		return 2;
	}
	
	public int chkPNum(UserEntity p) {
		UtilsEntity vo = new UtilsEntity();
		vo.setpNum(p.getpNum());
		
		String temporaryPw = sUtils.setPassword(6);
		vo.setTempPw(temporaryPw);
		
		mapper.insUtils(vo);
		
		smsUtils.sendSms(p, temporaryPw);
        
		return 1;
	}
	
	//0: 비밀번호 틀림, 1:성공
	public int chkPw(UserEntity p) {
		UserDomain vo = mapper.selUser(p);
		if (!BCrypt.checkpw(p.getUserPw(), vo.getUserPw())) {
			return 0;
		}
		return 1;
	}
	
	//0: 인증번호가 db에 저장되어 있지 않음(틀렸다는얘기)		1: 인증번호 확인 완료
	public int chkTempPw(UtilsEntity p) {
		UtilsEntity vo = mapper.selUtils(p);
		if(vo==null) {
			return 0;
		}
		mapper.delUtils(p);
		return 1;
	}

	public int chkUser(UserDomain p) {
		if (mapper.selUser(p) == null) {
			return 0;
		}
		return 1;
	}
	
	public UserDomain selUser(UserDomain p) {
		return mapper.selUser(p);
	}
	
	public List<PointHistoryDomain> selPlusPointHistory(PointHistoryDomain p) {
		return mapper.selPlusPointHistory(p);
	}
	
	public List<PointHistoryDomain> selMinusPointHistory(PointHistoryDomain p) {
		return mapper.selMinusPointHistory(p);
	}
	
	public int updProfile(UserDomain p, MultipartFile mf) {
		// 비밀번호 암호화 하는 부분
		String salt = sUtils.getSalt();
		String hashPw = sUtils.getHashPw(p.getUserPw(), salt);
		p.setUserPw(hashPw);
		int userPk = p.getUserPk();
		String folder = "/res/img/user/" + userPk;
		String basePath = fUtils.getBasePath(folder);
		
		if(mf==null) {
			p.setProfileImg(null);
		} else {
			//profileImg DB에 저장하기 위해 하는부분
			String profileImg = fUtils.getRandomFileNm(mf.getOriginalFilename());
			p.setProfileImg(profileImg);
			try {
				fUtils.makeFolders(basePath);
				File file = new File(basePath, profileImg);
				mf.transferTo(file);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		//이미 프로필 사진이 존재하면 삭제
		UserEntity selVo = new UserEntity();
		selVo.setUserPk(userPk);
		UserEntity userInfo = mapper.selUser(selVo);
		if(userInfo.getProfileImg() != null) {
			File filechk = new File(basePath, userInfo.getProfileImg());
			if(filechk.exists()) {
				filechk.delete();
			}
		}
		return mapper.updProfile(p);
	}
	
	public int plusPoint(UserDomain p) {
		int result = mapper.updPoint(p);
		insPointHistory(p.getUserPk(), p.getModPoint());
		setHsUserPoint(p);
		return result;
	}
	
	public void setHsUserPoint(UserDomain p) {
		p = mapper.selUser(p);
		UserDomain vo = (UserDomain)hs.getAttribute(Const.KEY_LOGINUSER);
		vo.setUserPoint(p.getUserPoint());
	}
}
