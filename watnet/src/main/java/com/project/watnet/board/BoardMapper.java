package com.project.watnet.board;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.watnet.model.BoardDTO;
import com.project.watnet.model.BoardDomain;
import com.project.watnet.model.BoardEntity;
import com.project.watnet.model.PartyUserEntity;
import com.project.watnet.model.UserDomain;
import com.project.watnet.model.UserEntity;

@Mapper
public interface BoardMapper {
	int insBoard(BoardEntity p);
	int selMaxPageNum(BoardDTO p);
	int makeParty(PartyUserEntity p);
	int insParty(PartyUserEntity p);
	int getLeaderPk(BoardEntity p);
	List<BoardEntity> selBoardList(BoardDTO p);
	PartyUserEntity selParty(PartyUserEntity p);
	BoardDomain selBoard(BoardEntity p);
	List<UserDomain> selUserProfile(PartyUserEntity p);
	int updPlusRecruitNum(PartyUserEntity p);
	int updMinusRecruitNum(PartyUserEntity p);
	int updTempPoint(BoardDomain p);
	int quitParty(PartyUserEntity p);
	int delBoard(PartyUserEntity p);
	int delPost(PartyUserEntity p);
}
