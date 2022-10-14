package com.exercise.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exercise.model.Course;
import com.exercise.model.User;

@Service
public class CourseService {

	@Autowired
	CourseRepository courseRepository;
	
		// Add
		public Course addCourse(Course course) {
			return courseRepository.save(course);
		}
	
		// Search
		public List<Course> getAllCourse() {
			List<Course> courselist = (List<Course>) courseRepository.findAll();
			return courselist;
		}
		
		public List<Course> getCourseById(String id){
			List<Course> courselist = (List<Course>) courseRepository.findAllByCourseId(id);
			return courselist;
		}
		 public Course getCourseByName(String id) {
			 return courseRepository.findCourseByName(id);
		 }

		
}