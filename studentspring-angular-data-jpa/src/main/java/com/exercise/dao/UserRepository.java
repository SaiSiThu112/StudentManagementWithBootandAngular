package com.exercise.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.exercise.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, String>{
	
	
	User findAllByUserID(String id);
	
	List<User> findAllByUserIDOrUserName(String id,String name);
	
	User findByUserName(String Name);

 @Query(value = "select * from user u where u.user_name = ?1 and u.user_password=?2 ", nativeQuery = true)
	   
  User findByUserNameAndUserPassword(String name,String password);
	
}