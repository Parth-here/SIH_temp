import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Department, Id } from "../../types/index";

export default function DepartmentList() {
  const departments = useQuery(api.departments.getAllDepartments);
  const people = useQuery(api.people.getPeopleByRole, { role: "teacher" });
  const createDepartment = useMutation(api.departments.createDepartment);
  const updateDepartment = useMutation(api.departments.updateDepartment);
  const deleteDepartment = useMutation(api.departments.deleteDepartment);

  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    department_name: "",
    head_of_department: "",
    liaison_teacher: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      department_name: formData.department_name,
      head_of_department: formData.head_of_department
        ? (formData.head_of_department as Id<"people">)
        : undefined,
      liaison_teacher: formData.liaison_teacher
        ? (formData.liaison_teacher as Id<"people">)
        : undefined,
    };

    try {
      if (editingDepartment) {
        await updateDepartment({
          id: editingDepartment._id,
          ...data,
        });
      } else {
        await createDepartment(data);
      }
      
      setShowForm(false);
      setEditingDepartment(null);
      setFormData({ department_name: "", head_of_department: "", liaison_teacher: "" });
    } catch (error) {
      console.error("Error saving department:", error);
      alert("Error saving department. Please try again.");
    }
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setFormData({
      department_name: department.department_name,
      head_of_department: department.head_of_department || "",
      liaison_teacher: department.liaison_teacher || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: Id<"departments">) => {
    if (confirm("Are you sure you want to delete this department?")) {
      try {
        await deleteDepartment({ id });
      } catch (error) {
        console.error("Error deleting department:", error);
        alert("Error deleting department. Please try again.");
      }
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingDepartment(null);
    setFormData({ department_name: "", head_of_department: "", liaison_teacher: "" });
  };

  if (!departments || !people) {
    return <div>Loading departments...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={20} className="mr-2" />
          Add Department
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingDepartment ? "Edit Department" : "Add New Department"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.department_name}
                  onChange={(e) =>
                    setFormData({ ...formData, department_name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Head of Department
                </label>
                <select
                  value={formData.head_of_department}
                  onChange={(e) =>
                    setFormData({ ...formData, head_of_department: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Teacher</option>
                  {people?.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.full_name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Liaison Teacher
                </label>
                <select
                  value={formData.liaison_teacher}
                  onChange={(e) =>
                    setFormData({ ...formData, liaison_teacher: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Teacher</option>
                  {people?.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.full_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingDepartment ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        {departments.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No departments found. Add your first department to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Head of Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Liaison Teacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departments.map((department) => (
                  <tr key={department._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {department.department_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {department.head_of_department ? (
                        people?.find(p => p._id === department.head_of_department)?.full_name || "Unknown"
                      ) : (
                        "Not assigned"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {department.liaison_teacher ? (
                        people?.find(p => p._id === department.liaison_teacher)?.full_name || "Unknown"
                      ) : (
                        "Not assigned"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(department)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(department._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
