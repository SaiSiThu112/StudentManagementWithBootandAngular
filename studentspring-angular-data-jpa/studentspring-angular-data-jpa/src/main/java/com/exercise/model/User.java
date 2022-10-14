package com.exercise.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class User{
	
	@Id
	//@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonProperty("userID") 
	private String userID;
	@NotEmpty
	private String userName;
	@NotEmpty
	private String userEmail;
	@NotEmpty
	private String userPassword;
	@NotEmpty
	private String userConfirmPassword;
	@NotEmpty
	private String userRole;
	
	public User() {}

	
	
	public String getUserID() {
		return userID;
	}



	public String getUserEmail() {
		return userEmail;
	}



	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}



	public void setUserID(String userID) {
		this.userID = userID;
	}



	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getUserConfirmPassword() {
		return userConfirmPassword;
	}
	public void setUserConfirmPassword(String userConfirmPassword) {
		this.userConfirmPassword = userConfirmPassword;
	}
	public String getUserRole() {
		return userRole;
	}
	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}
	
}
