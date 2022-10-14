package com.exercise.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.*;

@Entity
public class Course{
	@Id
	//@GeneratedValue(strategy = GenerationType.AUTO)
	//@Column(name = "course_id")
	//@GeneratedValue(strategy = GenerationType.IDENTITY)

	private String courseId;
	private String courseName;
	
	
	public String getCourseId() {
		return courseId;
	}
	public void setCourseId(String courseId) {
		this.courseId = courseId;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	
	
}
