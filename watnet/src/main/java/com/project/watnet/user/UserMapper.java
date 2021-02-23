package com.project.watnet.user;

import org.apache.ibatis.annotations.Mapper;

import com.project.watnet.model.UserDomain;
import com.project.watnet.model.UserEntity;
import com.project.watnet.model.UtilsEntity;

@Mapper
public interface UserMapper {
	int insUser(UserDomain p);
	int insUtils(UtilsEntity p);
	UserDomain selUser(UserEntity p);
	UserEntity selNickname(UserEntity p);
	UserEntity selPNum(UserEntity p);
	int updPw(UserEntity p);
	int updPoint(UserDomain p);
	UtilsEntity selUtils(UtilsEntity p);
	int delUtils(UtilsEntity p);
}
