package com.project.watnet.user;

import org.apache.ibatis.annotations.Mapper;

import com.project.watnet.model.PointHistoryEntity;
import com.project.watnet.model.UserDomain;
import com.project.watnet.model.UserEntity;
import com.project.watnet.model.UtilsEntity;

@Mapper
public interface UserMapper {
	int insUser(UserDomain p);
	int insUtils(UtilsEntity p);
	int insPointHistory(PointHistoryEntity p);
	UserDomain selUser(UserEntity p);
	PointHistoryEntity selPointHistory(PointHistoryEntity p);
	UtilsEntity selUtils(UtilsEntity p);
	int updPw(UserEntity p);
	int updPoint(UserDomain p);
	int updProfile(UserDomain p);
	int updPaidPoint(UserDomain p);
	int delUtils(UtilsEntity p);
}
