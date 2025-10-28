'use client';

import { useEffect, useState } from 'react';
import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/Loading';

interface Course {
  id: number;
  name: string;
  course_code: string;
  enrollment_term_id?: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch courses');
        return res.json();
      })
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) { return <Loading />; }
  if (error) { return <ErrorMessage message={error} />; }

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
