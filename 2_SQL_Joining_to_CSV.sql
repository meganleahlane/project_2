--SELECT * from public."SY2016";
--SELECT * from public."SY2017";
--SELECT * from public."SY2018";
--SELECT * from public."SY2019";

SELECT  school_id, year, short_name, school_type, primary_category, 
	address, city, state, zip, phone, progress_report_year, 
	student_growth_rating, student_attainment_rating, 
	growth_reading_grades_tested_pct_es, growth_math_grades_tested_pct_es, 
	attainment_reading_pct_es, attainment_math_pct_es, 
	culture_climate_rating, school_survey_involved_families, 
	school_survey_supportive_environment, 
	school_survey_ambitious_instruction, school_survey_effective_leaders, 
	school_survey_collaborative_teachers, school_survey_safety, 
	suspensions_per_100_students_avg_pct, student_attendance_avg_pct, 
	mobility_rate_pct, one_year_dropout_rate_year_1_pct, 
	freshmen_on_track_school_pct_year_1, college_enrollment_school_pct_year_1, 
	college_persistence_school_pct_year_2, teacher_attendance_avg_pct, 
	school_latitude, school_longitude
	FROM public."SY2016"
UNION
SELECT school_id, year, short_name, school_type, primary_category, 
	address, city, state, zip, phone, progress_report_year, 
	student_growth_rating, student_attainment_rating, 
	growth_reading_grades_tested_pct_es, growth_math_grades_tested_pct_es, 
	attainment_reading_pct_es, attainment_math_pct_es, 
	culture_climate_rating, school_survey_involved_families, 
	school_survey_supportive_environment, 
	school_survey_ambitious_instruction, school_survey_effective_leaders, 
	school_survey_collaborative_teachers, school_survey_safety, 
	suspensions_per_100_students_avg_pct, student_attendance_avg_pct, 
	mobility_rate_pct, one_year_dropout_rate_year_1_pct, 
	freshmen_on_track_school_pct_year_1, college_enrollment_school_pct_year_1, 
	college_persistence_school_pct_year_2, teacher_attendance_avg_pct, 
	school_latitude, school_longitude
	FROM public."SY2017"
UNION
SELECT school_id, year, short_name, school_type, primary_category, 
	' ' address, ' ' city, ' ' state, ' ' zip, phone, progress_report_year, 
	student_growth_rating, student_attainment_rating, 
	growth_reading_grades_tested_pct_es, growth_math_grades_tested_pct_es, 
	attainment_reading_pct_es, attainment_math_pct_es, 
	culture_climate_rating, school_survey_involved_families, 
	school_survey_supportive_environment, 
	school_survey_ambitious_instruction, school_survey_effective_leaders, 
	school_survey_collaborative_teachers, school_survey_safety, 
	suspensions_per_100_students_avg_pct, student_attendance_avg_pct, 
	mobility_rate_pct, one_year_dropout_rate_year_1_pct, 
	freshmen_on_track_school_pct_year_1, college_enrollment_school_pct_year_1, 
	college_persistence_school_pct_year_2, teacher_attendance_avg_pct, 
	' ' school_latitude, ' ' school_longitude
	FROM public."SY2018"
UNION
SELECT school_id, year, short_name, school_type, primary_category, 
	address, city, state, zip, phone, progress_report_year, 
	student_growth_rating, student_attainment_rating, 
	growth_reading_grades_tested_pct_es, growth_math_grades_tested_pct_es, 
	attainment_reading_pct_es, attainment_math_pct_es, 
	culture_climate_rating, school_survey_involved_families, 
	school_survey_supportive_environment, 
	school_survey_ambitious_instruction, school_survey_effective_leaders, 
	school_survey_collaborative_teachers, school_survey_safety, 
	suspensions_per_100_students_avg_pct, student_attendance_avg_pct, 
	mobility_rate_pct, one_year_dropout_rate_year_1_pct, 
	freshmen_on_track_school_pct_year_1, college_enrollment_school_pct_year_1, 
	college_persistence_school_pct_year_2, teacher_attendance_avg_pct, 
	school_latitude, school_longitude
	FROM public."SY2019"
ORDER BY school_id, year;




