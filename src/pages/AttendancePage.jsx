import React, { useState, useEffect } from 'react';

const AttendancePage = () => {
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [attendance, setAttendance] = useState({});
    const [grades, setGrades] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch subjects and initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Simulate API call for subjects
                const mockSubjects = ["Mathematics", "Computer Science", "Physics"];
                await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

                setSubjects(mockSubjects);
                setSelectedSubject(mockSubjects[0]);

                // Simulate API call for students
                const mockStudents = [
                    { id: 1, name: "John Doe", roll: "CS101" },
                    { id: 2, name: "Jane Smith", roll: "CS102" },
                    { id: 3, name: "Bob Wilson", roll: "CS103" },
                ];
                await new Promise(resolve => setTimeout(resolve, 500));

                setStudents(mockStudents);
                initializeStudentData(mockStudents);

                setError('');
            } catch (err) {
                setError('Failed to load initial data');
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Initialize attendance and grades state
    const initializeStudentData = (students) => {
        const initialAttendance = {};
        const initialGrades = {};
        students.forEach(student => {
            initialAttendance[student.id] = false;
            initialGrades[student.id] = '';
        });
        setAttendance(initialAttendance);
        setGrades(initialGrades);
    };

    const handleAttendanceChange = (studentId) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: !prev[studentId]
        }));
    };

    const handleGradeChange = (studentId, value) => {
        setGrades(prev => ({
            ...prev,
            [studentId]: value
        }));
    };

    const handleSubmit = async (type) => {
        try {
            const data = type === 'attendance' ? attendance : grades;
            console.log(`Submitting ${type}:`, data);
            alert(`${type.charAt(0).toUpperCase() + type.slice(1)} submitted successfully!`);
        } catch (err) {
            alert(`Error submitting ${type}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500 text-xl p-4 border border-red-200 rounded-lg bg-red-50">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Professor Dashboard</h1>
                    <p className="text-gray-600 mt-2">Managing {selectedSubject}</p>
                </header>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Attendance Section */}
                    <section className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Attendance Tracking</h2>
                        <SubjectSelector
                            subjects={subjects}
                            selectedSubject={selectedSubject}
                            onChange={setSelectedSubject}
                        />

                        <StudentList
                            students={students}
                            renderItem={(student) => (
                                <div className="flex items-center justify-between">
                                    <StudentInfo student={student} />
                                    <AttendanceToggle
                                        checked={attendance[student.id]}
                                        onChange={() => handleAttendanceChange(student.id)}
                                    />
                                </div>
                            )}
                        />

                        <ActionButton
                            onClick={() => handleSubmit('attendance')}
                            color="blue"
                            label="Submit Attendance"
                        />
                    </section>

                    {/* Grading Section */}
                    <section className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Grade Evaluation</h2>
                        <SubjectSelector
                            subjects={subjects}
                            selectedSubject={selectedSubject}
                            onChange={setSelectedSubject}
                        />

                        <StudentList
                            students={students}
                            renderItem={(student) => (
                                <div className="flex items-center justify-between">
                                    <StudentInfo student={student} />
                                    <GradeInput
                                        value={grades[student.id]}
                                        onChange={(e) => handleGradeChange(student.id, e.target.value)}
                                    />
                                </div>
                            )}
                        />

                        <ActionButton
                            onClick={() => handleSubmit('grades')}
                            color="green"
                            label="Submit Grades"
                        />
                    </section>
                </div>
            </div>
        </div>
    );
};

// Reusable Components
const SubjectSelector = ({ subjects, selectedSubject, onChange }) => (
    <div className="mb-6">
        <label className="block text-gray-700 mb-2">Select Subject</label>
        <select
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={selectedSubject}
            onChange={(e) => onChange(e.target.value)}
        >
            {subjects.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
            ))}
        </select>
    </div>
);

const StudentList = ({ students, renderItem }) => (
    <div className="overflow-x-auto">
        <h3 className="text-lg font-medium text-gray-600 mb-3">Student List</h3>
        <div className="space-y-3">
            {students.map((student) => (
                <div key={student.id} className="p-3 bg-gray-50 rounded-lg">
                    {renderItem(student)}
                </div>
            ))}
        </div>
    </div>
);

const StudentInfo = ({ student }) => (
    <div>
        <p className="font-medium">{student.name}</p>
        <p className="text-sm text-gray-500">{student.roll}</p>
    </div>
);

const AttendanceToggle = ({ checked, onChange }) => (
    <div className="flex items-center gap-2">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-500">Present</span>
    </div>
);

const GradeInput = ({ value, onChange }) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Grade"
        className="w-24 px-2 py-1 border rounded-md text-sm focus:ring-2 focus:ring-green-500"
    />
);

const ActionButton = ({ onClick, color, label }) => {
    const colors = {
        blue: 'bg-blue-600 hover:bg-blue-700',
        green: 'bg-green-600 hover:bg-green-700'
    };

    return (
        <button
            onClick={onClick}
            className={`mt-6 w-full text-white py-2 px-4 rounded-lg transition-colors ${colors[color]}`}
        >
            {label}
        </button>
    );
};

export default AttendancePage;