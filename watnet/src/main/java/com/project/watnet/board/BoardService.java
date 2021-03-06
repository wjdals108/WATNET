package com.project.watnet.board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.watnet.model.BoardDTO;
import com.project.watnet.model.BoardDomain;
import com.project.watnet.model.BoardEntity;
import com.project.watnet.model.PartyUserEntity;
import com.project.watnet.model.UserDomain;
import com.project.watnet.user.UserMapper;
import com.project.watnet.user.UserService;

@Service
public class BoardService {

	@Autowired
	private BoardMapper mapper;
	
	@Autowired
	private UserService uService;
	
	@Autowired
	private UserMapper uMapper;
	
	public int getBoardPk(PartyUserEntity p) {
		PartyUserEntity vo = mapper.selParty(p);
		if(vo==null) {
			return 0;
		}
		return vo.getBoardPk();
	}
	
	public int getLeaderPk(BoardEntity p) {
		return mapper.getLeaderPk(p);
	}
	
	//-1:이미 등록되어 있는 user		 0: insBoard 실패		그외: category return
	public int insBoard(BoardDomain p) {
		PartyUserEntity vo = new PartyUserEntity();
		vo.setUserPk(p.getUserPk());
		if(mapper.selParty(vo) != null) {
			return -1;
		}
		
		if(mapper.insBoard(p) == 1) {
			vo.setBoardPk(p.getBoardPk());
			insParty(vo);

			return p.getCategory();
		}
		return 0;
	}
	
	//party에 user 등록하기 (makeParty 할 때)
	public int insParty(PartyUserEntity p) {
		p.setIsLeader(1);
		return mapper.makeParty(p);
	}
	
	//-1:이미 가입되어있는 파티가 있음			-2: point가 부족함
	public int joinParty(PartyUserEntity p) {
		PartyUserEntity vo = new PartyUserEntity();
		vo.setUserPk(p.getUserPk());
		
		if(mapper.selParty(vo) != null) {
			return -1;
		}
		
		BoardDomain vo3 = new BoardDomain();
		vo3.setBoardPk(p.getBoardPk());
		vo3 = mapper.selBoard(vo3);
		int point = vo3.getPrice() * -1;
		
		UserDomain selUserVo = new UserDomain();
		selUserVo.setUserPk(p.getUserPk());
		selUserVo = uService.selUser(selUserVo);
		if(selUserVo.getUserPoint() < vo3.getPrice()) {
			return -2;
		}
		
		uService.insPointHistory(p.getUserPk(), point);
		
		selUserVo.setModPoint(point);
		uMapper.updPoint(selUserVo);
		
		selUserVo.setUserPaidPoint(vo3.getPrice());
		uMapper.updPaidPoint(selUserVo);
		
		vo.setBoardPk(p.getBoardPk());
		mapper.updPlusRecruitNum(p);
		updTempPoint(vo3, vo3.getPrice());
		
		uService.setHsUserPoint(selUserVo);
		return mapper.insParty(p);
	}
	
	public List<BoardEntity> selBoardList(BoardDTO p) {
		p.setsIdx(p.getRowCnt() * (p.getPage() - 1));
		return mapper.selBoardList(p);
	}
	
	public BoardDomain selBoard(BoardEntity p) {
		return mapper.selBoard(p);
	}
	
	public List<UserDomain> selUserProfile(PartyUserEntity p) {
		return mapper.selUserProfile(p);
	}
	
	public int selMaxPageNum(BoardDTO p) {
		return mapper.selMaxPageNum(p);
	}
	
	public BoardDomain selMyParty(PartyUserEntity p) {
		PartyUserEntity vo = mapper.selParty(p);
		if(vo==null) {
			BoardDomain vo2 = new BoardDomain();
			vo2.setBoardPk(0);
			return vo2;
		}
		BoardDomain vo2 = new BoardDomain();
		vo2.setBoardPk(vo.getBoardPk());
		return mapper.selBoard(vo2);
	}
	
	public int updTempPoint(BoardDomain p, int modPoint) {
		p.setModTempPoint(modPoint);
		return mapper.updTempPoint(p);
	}
	
	public int quitParty(PartyUserEntity p) {
		if(selMyParty(p) == null) {
			return 0;
		}
		PartyUserEntity vo = mapper.selParty(p);
		BoardDomain vo2 = new BoardDomain();
		vo2.setBoardPk(vo.getBoardPk());
		vo2 = mapper.selBoard(vo2);					//temp price 알아올려고
		
		List<UserDomain> myAllPartyMember = selUserProfile(vo);
		
		int divisionMember = myAllPartyMember.size() - 1;
		if(divisionMember <= 0) {
			divisionMember = 1;
		}
		int modPoint = vo2.getTempPoint() / divisionMember;
		if(vo.getIsLeader() == 1) {
			mapper.quitParty(vo);
			delPost(vo);
			
			for (UserDomain userVo : myAllPartyMember) {
				if(vo.getUserPk() == userVo.getUserPk()) {				//리더한테는 point 주면 안됨
					continue;
				}
				userVo.setModPoint(modPoint);
				uMapper.updPoint(userVo);
				
				userVo.setUserPaidPoint(modPoint * -1);
				uMapper.updPaidPoint(userVo);
				
				uService.insPointHistory(userVo.getUserPk(), modPoint);
			}
			return mapper.delBoard(vo);
		} else {
			mapper.updMinusRecruitNum(vo);
			delPost(vo);
			
			UserDomain userVo = new UserDomain();
			userVo.setUserPk(vo.getUserPk());
			userVo = uMapper.selUser(userVo);
			userVo.setModPoint(modPoint);
			uMapper.updPoint(userVo);
			
			uService.insPointHistory(userVo.getUserPk(), modPoint);
			
			int tempModPoint = modPoint * -1;
			updTempPoint(vo2, tempModPoint);
			
			userVo.setUserPaidPoint(tempModPoint);
			uMapper.updPaidPoint(userVo);
			
			uService.setHsUserPoint(userVo);
			return mapper.quitParty(vo);
		}
	}
	
	public int delPost(PartyUserEntity p) {
		return mapper.delPost(p);
	}
}
