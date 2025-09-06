import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Seed sample departments
export const seedDepartments = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if departments already exist
    const existingDepartments = await ctx.db.query("departments").collect();
    if (existingDepartments.length > 0) {
      return { message: "Departments already exist", count: existingDepartments.length };
    }

    const sampleDepartments = [
      { department_name: "Computer Science" },
      { department_name: "Mathematics" },
      { department_name: "Physics" },
      { department_name: "Chemistry" },
      { department_name: "Biology" },
      { department_name: "English Literature" },
      { department_name: "History" },
      { department_name: "Economics" },
    ];

    const results = [];
    for (const dept of sampleDepartments) {
      const id = await ctx.db.insert("departments", dept);
      results.push(id);
    }

    return { message: "Sample departments created", count: results.length };
  },
});

// Seed sample courses
export const seedCourses = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if courses already exist
    const existingCourses = await ctx.db.query("courses").collect();
    if (existingCourses.length > 0) {
      return { message: "Courses already exist", count: existingCourses.length };
    }

    // Get departments and teachers for referencing
    const departments = await ctx.db.query("departments").collect();
    const teachers = await ctx.db.query("people").filter(q => q.eq(q.field("role"), "teacher")).collect();

    if (departments.length === 0) {
      throw new Error("No departments found. Please seed departments first.");
    }
    
    // Create a dummy teacher if no teachers exist
    let defaultTeacherId;
    if (teachers.length === 0) {
      defaultTeacherId = await ctx.db.insert("people", {
        user_id: "dummy-teacher-id",
        full_name: "Sample Teacher",
        email: "teacher@example.com",
        role: "teacher" as const,
        approval_status: "approved" as const,
        department_id: departments[0]._id,
        subject_assigned: "General Studies"
      });
    } else {
      defaultTeacherId = teachers[0]._id;
    }

    // Create some sample courses
    const sampleCourses = [
      {
        course_id: "CS101",
        course_name: "Introduction to Computer Science",
        semester: "Fall 2024",
        credits: 3,
        department_id: departments[0]._id,
        teacher_id: teachers.length > 0 ? teachers[0]._id : defaultTeacherId,
      },
      {
        course_id: "MATH201",
        course_name: "Calculus II",
        semester: "Fall 2024",
        credits: 4,
        department_id: departments[1]._id,
        teacher_id: teachers.length > 1 ? teachers[1]._id : defaultTeacherId,
      },
      {
        course_id: "PHYS301",
        course_name: "Quantum Physics",
        semester: "Spring 2024",
        credits: 3,
        department_id: departments[2]._id,
        teacher_id: teachers.length > 2 ? teachers[2]._id : defaultTeacherId,
      },
      {
        course_id: "CHEM150",
        course_name: "Organic Chemistry",
        semester: "Fall 2024",
        credits: 4,
        department_id: departments[3]._id,
        teacher_id: teachers.length > 3 ? teachers[3]._id : defaultTeacherId,
      },
      {
        course_id: "BIO200",
        course_name: "Cell Biology",
        semester: "Spring 2024",
        credits: 3,
        department_id: departments[4]._id,
        teacher_id: teachers.length > 4 ? teachers[4]._id : defaultTeacherId,
      },
    ];

    const results = [];
    for (const course of sampleCourses) {
      try {
        const id = await ctx.db.insert("courses", course);
        results.push(id);
      } catch (error) {
        console.error("Error creating course:", error);
      }
    }

    return { message: "Sample courses created", count: results.length };
  },
});

// Seed sample people (students and teachers)
export const seedPeople = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if people already exist
    const existingPeople = await ctx.db.query("people").collect();
    if (existingPeople.length > 0) {
      return { message: "People already exist", count: existingPeople.length };
    }

    // Get departments for referencing
    const departments = await ctx.db.query("departments").collect();
    if (departments.length === 0) {
      throw new Error("No departments found. Please seed departments first.");
    }

    const samplePeople = [
      // Teachers
      {
        user_id: "teacher-1",
        full_name: "Dr. Sarah Johnson",
        email: "sarah.johnson@kng.edu",
        role: "teacher" as const,
        approval_status: "approved" as const,
        department_id: departments[0]._id, // Computer Science
        subject_assigned: "Computer Science",
        additional_courses: ["Data Structures", "Algorithms"]
      },
      {
        user_id: "teacher-2",
        full_name: "Prof. Michael Chen",
        email: "michael.chen@kng.edu",
        role: "teacher" as const,
        approval_status: "approved" as const,
        department_id: departments[1]._id, // Mathematics
        subject_assigned: "Mathematics",
        additional_courses: ["Calculus", "Linear Algebra"]
      },
      {
        user_id: "teacher-3",
        full_name: "Dr. Emily Rodriguez",
        email: "emily.rodriguez@kng.edu",
        role: "teacher" as const,
        approval_status: "approved" as const,
        department_id: departments[2]._id, // Physics
        subject_assigned: "Physics",
        additional_courses: ["Quantum Mechanics", "Thermodynamics"]
      },
      // Students
      {
        user_id: "student-1",
        full_name: "Alex Thompson",
        email: "alex.thompson@kng.edu",
        role: "student" as const,
        approval_status: "approved" as const,
        er_no: "CS2024001",
        semester: "Fall 2024",
        gender: "Male",
        department_id: departments[0]._id, // Computer Science
        guardian_contact: "+1-555-0101"
      },
      {
        user_id: "student-2",
        full_name: "Maria Garcia",
        email: "maria.garcia@kng.edu",
        role: "student" as const,
        approval_status: "approved" as const,
        er_no: "MATH2024002",
        semester: "Fall 2024",
        gender: "Female",
        department_id: departments[1]._id, // Mathematics
        guardian_contact: "+1-555-0102"
      },
      {
        user_id: "student-3",
        full_name: "David Kim",
        email: "david.kim@kng.edu",
        role: "student" as const,
        approval_status: "approved" as const,
        er_no: "PHYS2024003",
        semester: "Fall 2024",
        gender: "Male",
        department_id: departments[2]._id, // Physics
        guardian_contact: "+1-555-0103"
      }
    ];

    const results = [];
    for (const person of samplePeople) {
      try {
        const id = await ctx.db.insert("people", person);
        results.push(id);
      } catch (error) {
        console.error("Error creating person:", error);
      }
    }

    return { message: "Sample people created", count: results.length };
  },
});

// Seed all sample data
export const seedAllData = mutation({
  args: {},
  handler: async (ctx) => {
    const results = [];
    
    try {
      // Seed departments first
      console.log("Seeding departments...");
      const deptResult = await seedDepartments.handler(ctx, {});
      results.push(deptResult);
      console.log("Departments seeded:", deptResult);
      
      // Seed people
      console.log("Seeding people...");
      const peopleResult = await seedPeople.handler(ctx, {});
      results.push(peopleResult);
      console.log("People seeded:", peopleResult);
      
      // Seed courses
      console.log("Seeding courses...");
      const courseResult = await seedCourses.handler(ctx, {});
      results.push(courseResult);
      console.log("Courses seeded:", courseResult);
      
      const totalCreated = results.reduce((sum, r) => sum + (r.count || 0), 0);
      console.log("Total items created:", totalCreated);
      
      return { 
        message: "All sample data created successfully", 
        results: results,
        totalCreated: totalCreated
      };
    } catch (error) {
      console.error("Error seeding all data:", error);
      return {
        message: "Error creating sample data",
        error: error.message,
        results: results,
        totalCreated: results.reduce((sum, r) => sum + (r.count || 0), 0)
      };
    }
  },
});

