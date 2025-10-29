import { Course } from "@/types";

async function getCourses(): Promise<Course[]> {
  const CANVAS_API_URL = process.env.CANVAS_API_URL;
  const CANVAS_ACCESS_TOKEN = process.env.CANVAS_ACCESS_TOKEN;

  // Add error checking
  if (!CANVAS_API_URL || !CANVAS_ACCESS_TOKEN) {
    throw new Error('Missing Canvas API credentials');
  }

  const url = new URL(`${CANVAS_API_URL}/courses`);
  url.searchParams.append('enrollment_state', 'active');
  url.searchParams.append('include[]', 'students');
  url.searchParams.append('include[]', 'term');

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
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
      <div className="space-y-4">
        {courses.map(course => (
          <div
            key={course.id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <a target="_blank" href={`${process.env.NEXT_PUBLIC_CANVAS_BASE_URL}/courses/${course.id}`}>
              <h2 className="text-xl font-semibold">{course.name} <span className="text-gray-600">{course.course_code}</span></h2>
              {/* <span className="text-sm text-gray-500 mt-2">{course.id}</span> */}
            </a>
          </div>
        ))}
      </div>

      {courses.length === 0 && (<p className="text-gray-500 text-center mt-8">No active courses</p>)}

    </div>
  );
}
