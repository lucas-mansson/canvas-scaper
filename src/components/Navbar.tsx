import Link from 'next/link';

export default async function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16">
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/courses" 
            >
              Courses
            </Link>
            <Link 
              href="/assignments" 
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Assignments
            </Link>
            <Link 
              href="/assignments" 
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Calendar
            </Link>
            <Link 
              href="/announcements" 
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Announcements
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
