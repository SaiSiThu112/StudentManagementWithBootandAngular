package com.exercise.controller;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exercise.dao.CourseService;
import com.exercise.model.Course;
import com.exercise.model.User;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/") 
public class CourseController {
	@Autowired
	private CourseService courseService;
	

	@GetMapping(value="/courses",produces = "application/json")
	public List<Course> displayCourse() {
		return courseService.getAllCourse();

	}

	@GetMapping(value="/courses/{name}",produces = "application/json")
	public ResponseEntity<Course> getUserByUserId(@PathVariable String name) {
	Course user=new Course();
	user=courseService.getCourseByName(name);
	return ResponseEntity.ok(user);
	}
	@PostMapping(value="/courses",produces = "application/json")
	public Course addCourse(@RequestBody Course courseBean) {
		
				Course course=new Course();
				course.setCourseId(courseBean.getCourseId());
				course.setCourseName(courseBean.getCourseName());
				
				

				return courseService.addCourse(course);
				
}
}

