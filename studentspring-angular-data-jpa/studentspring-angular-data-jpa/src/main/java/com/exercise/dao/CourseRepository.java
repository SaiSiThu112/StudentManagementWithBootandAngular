package com.exercise.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.exercise.model.Course;

@Repository
public interface CourseRepository extends CrudRepository<Course, String>{
	
	List<Course> findAllByCourseId(String id);
	
}
