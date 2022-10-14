package com.exercise.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exercise.dao.CourseService;
import com.exercise.model.Course;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/") 
public class CourseController {
	@Autowired
	private CourseService courseService;
	
	

	/*private void setId(Model model, Course course) {
		List<Course> courseList = courseService.getAllCourse();
		if (courseList.size() == 0) {
			course.setCourseId("COU001");
		}else {
		int tempId = Integer.parseInt(courseList.get(courseList.size() - 1).getCourseId().substring(3)) + 1;
		String classid = String.format("COU%03d", tempId);
		course.setCourseId(classid);
		}
		
	}*/
	@GetMapping(value="/courses",produces = "application/json")
	public List<Course> displayCourse() {
		return courseService.getAllCourse();

	}
	@PostMapping(value="/courses",produces = "application/json")
	public Course addCourse(@RequestBody Course courseBean) {
		
				Course course=new Course();
				course.setCourseId(courseBean.getCourseId());
				course.setCourseName(courseBean.getCourseName());
				
				

				return courseService.addCourse(course);
				
}
}

