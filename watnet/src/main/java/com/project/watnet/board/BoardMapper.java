package com.project.watnet.board;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.watnet.model.BoardDTO;
import com.project.watnet.model.BoardEntity;
import com.project.watnet.model.PartyUserEntity;

@Mapper
public interface BoardMapper {
	int insBoard(BoardEntity p);
	int selMaxPageNum(BoardDTO p);
	int insParty(PartyUserEntity p);
	List<BoardEntity> selBoardList(BoardDTO p);
	PartyUserEntity selParty(PartyUserEntity p);
	BoardEntity selBoard(BoardEntity p);
	int updBoard(PartyUserEntity p);
}
