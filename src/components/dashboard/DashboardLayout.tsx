import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Users, 
  BookOpen, 
  Building2, 
  ClipboardList, 
  LayoutDashboard,
  Menu,
  X 
} from "lucide-react";
import { useState } from "react";
import AuthButton from "../auth/AuthButton";
import { useAuth } from "../../hooks/useAuth";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, roles: ['admin', 'teacher', 'student'] },
  { name: 'Departments', href: '/departments', icon: Building2, roles: ['admin'] },
  { name: 'Courses', href: '/courses', icon: BookOpen, roles: ['admin', 'teacher'] },
  { name: 'People', href: '/people', icon: Users, roles: ['admin', 'teacher'] },
  { name: 'Attendance', href: '/attendance', icon: ClipboardList, roles: ['admin', 'teacher', 'student'] },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { role } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Use the role from the database, fallback to admin for now
  const userRole = role || 'admin';

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex items-center justify-between h-16 px-4 bg-blue-600">
          <h1 className="text-xl font-bold text-white">Academic System</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-8">
          {filteredNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 transition-colors ${
                location.pathname === item.href
                  ? "bg-blue-100 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <item.icon size={20} className="mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex-1" />
            
            <AuthButton />
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
