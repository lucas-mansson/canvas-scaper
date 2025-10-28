async function getCourses() {
  const CANVAS_API_URL = process.env.CANVAS_API_URL;
  const CANVAS_ACCESS_TOKEN = process.env.CANVAS_ACCESS_TOKEN;

  const url = new URL(`${CANVAS_API_URL}/courses`);
  url.searchParams.append('enrollment_state', 'active');
  url.searchParams.append('include[]', 'students');
  url.searchParams.append('include[]', 'term');
  url.searchParams.append('per_page', '5');

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${CANVAS_ACCESS_TOKEN}`,
    },
  });

  return response.json();
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">My Canvas Courses</h1>
      
      <div className="space-y-4">
        {courses.map((course: any) => (
          <div 
            key={course.id} 
            className="border rounded-lg p-4 shadow"
          >
            <h2 className="text-xl font-semibold">{course.name}</h2>
            <p className="text-gray-600">{course.course_code}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
