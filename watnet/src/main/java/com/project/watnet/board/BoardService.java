package com.project.watnet.board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.watnet.model.BoardDTO;
import com.project.watnet.model.BoardDomain;
import com.project.watnet.model.BoardEntity;
import com.project.watnet.model.PartyUserEntity;

@Service
public class BoardService {

	@Autowired
	private BoardMapper mapper;
	
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
		return mapper.insParty(p);
	}
	
	//-1:이미 가입되어있는 파티가 있음
	public int joinParty(PartyUserEntity p) {
		PartyUserEntity vo = new PartyUserEntity();
		vo.setUserPk(p.getUserPk());
		
		if(mapper.selParty(vo) != null) {
			return -1;
		}
		mapper.updBoard(p);
		
		return mapper.insParty(p);
	}
	
	public List<BoardEntity> selBoardList(BoardDTO p) {
		p.setsIdx(p.getRowCnt() * (p.getPage() - 1));
		return mapper.selBoardList(p);
	}
	
	public BoardEntity selBoard(BoardEntity p) {
		return mapper.selBoard(p);
	}
	
	public int selMaxPageNum(BoardDTO p) {
		return mapper.selMaxPageNum(p);
	}
}
