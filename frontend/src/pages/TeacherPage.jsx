import React, { useState, useEffect } from "react";

// Set the API base URI
const API_URI = "http://localhost:5000/api/teachers";

const TeacherPage = () => {
	const [teachers, setTeachers] = useState([]); // Ensure it's an empty array initially
	const [showForm, setShowForm] = useState(false);
	const [editTeacher, setEditTeacher] = useState(null); // To handle editing a teacher
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		subject: "",
		remarks: "",
	});
	const [errorMessage, setErrorMessage] = useState(""); // Error message state
	const [successMessage, setSuccessMessage] = useState(""); // Success message state
	const [currentPage, setCurrentPage] = useState(1); // Pagination state
	const [itemsPerPage] = useState(10); // Items per page

	// Fetch teachers from the API
	useEffect(() => {
		const fetchTeachers = async () => {
			try {
				const response = await fetch(API_URI);
				const data = await response.json();

				if (data.teachers && Array.isArray(data.teachers)) {
					setTeachers(data.teachers); // Extract the teachers array
				} else {
					setTeachers([]);
				}
			} catch (error) {
				setErrorMessage(
					"Error fetching teachers data. Please try again later."
				);
			}
		};
		fetchTeachers();
	}, []);

	// Add a new teacher to the state
	const handleAddTeacher = (newTeacher) => {
		setTeachers([...teachers, newTeacher]);
		setSuccessMessage("Teacher added successfully!");
	};

	// Update a teacher in the state
	const handleUpdateTeacher = (updatedTeacher) => {
		setTeachers(
			teachers.map((teacher) =>
				teacher._id === updatedTeacher._id ? updatedTeacher : teacher
			)
		);
		setSuccessMessage("Teacher updated successfully!");
	};

	// Delete a teacher from the state
	const handleDeleteTeacher = async (teacherId) => {
		try {
			const response = await fetch(`${API_URI}/${teacherId}`, {
				method: "DELETE",
			});

			if (response.ok) {
				setTeachers(
					teachers.filter((teacher) => teacher._id !== teacherId)
				);
				setSuccessMessage("Teacher deleted successfully!");
			} else {
				setErrorMessage("Error deleting teacher. Please try again.");
			}
		} catch (error) {
			setErrorMessage("Error deleting teacher. Please try again.");
		}
	};

	// Handle form submission (both add and update)
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const method = editTeacher ? "PUT" : "POST"; // Determine the method based on whether we're adding or updating
			const url = editTeacher ? `${API_URI}/${editTeacher._id}` : API_URI;

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const teacher = await response.json();

			if (editTeacher) {
				handleUpdateTeacher(teacher); // Update teacher in the state
			} else {
				handleAddTeacher(teacher); // Add new teacher to the state
			}

			setShowForm(false); // Close the form after submitting
			setEditTeacher(null); // Reset edit mode
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				phone: "",
				subject: "",
				remarks: "",
			}); // Reset form data
		} catch (error) {
			setErrorMessage("Error submitting teacher data. Please try again.");
		}
	};

	// Handle form field change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Open the form in edit mode with the teacher's data
	const handleEdit = (teacher) => {
		setFormData({
			firstName: teacher.firstName,
			lastName: teacher.lastName,
			email: teacher.email,
			phone: teacher.phone,
			subject: teacher.subject,
			remarks: teacher.remarks,
		});
		setEditTeacher(teacher); // Set the teacher being edited
		setShowForm(true); // Show the form
	};

	// Pagination Logic
	const totalPages = Math.ceil(teachers.length / itemsPerPage);
	const paginatedTeachers = teachers.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className="container mx-auto p-6 animate__animated animate__fadeIn">
			<h1 className="text-3xl font-bold text-center mb-6 text-gray-1000">
				Manage Teachers
			</h1>

			{errorMessage && (
				<div className="bg-red-100 text-red-700 p-4 mb-4 rounded-lg shadow-md animate__animated animate__fadeIn">
					{errorMessage}
				</div>
			)}

			{successMessage && (
				<div className="bg-green-100 text-green-700 p-4 mb-4 rounded-lg shadow-md animate__animated animate__fadeIn">
					{successMessage}
				</div>
			)}

			<button
				onClick={() => setShowForm(true)}
				className="bg-blue-700 text-white px-6 py-3 rounded-lg mb-4 hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
			>
				Add Teacher
			</button>

			{/* Teacher Table */}
			<div className="max-w-md w-full mx-auto mt-10 p-4 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800">
				<table className="min-w-full table-auto bg-gray-900 shadow-md">
					<thead>
						<tr className="bg-gray-900 text-left text-sm text-white">
							<th className="py-2 px-4">Name</th>
							<th className="py-2 px-4">Subject</th>
							<th className="py-2 px-4">Actions</th>
						</tr>
					</thead>
					<tbody>
						{paginatedTeachers.length > 0 ? (
							paginatedTeachers.map((teacher) => (
								<tr
									key={teacher._id}
									className="border-t border-gray-900 hover:bg-gray-700 transition-all duration-300 text-white"
								>
									<td className="py-2 px-4">
										{teacher.firstName} {teacher.lastName}
									</td>
									<td className="py-2 px-4">
										{teacher.subject}
									</td>
									<td className="py-2 px-4">
										<button
											onClick={() => handleEdit(teacher)}
											className="bg-green-400 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-500 transition-all duration-300"
										>
											Edit
										</button>
										<button
											onClick={() =>
												handleDeleteTeacher(teacher._id)
											}
											className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
										>
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="3" className="text-center py-4">
									No teachers available.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className="flex justify-center mt-4">
				<button
					onClick={() => paginate(currentPage - 1)}
					disabled={currentPage === 1}
					className="px-4 py-2 bg-gray-800 text-white rounded-lg mr-2 hover:bg-gray-600"
				>
					Prev
				</button>
				{Array.from({ length: totalPages }).map((_, index) => (
					<button
						key={index}
						onClick={() => paginate(index + 1)}
						className={`px-4 py-2 rounded-lg ${
							currentPage === index + 1
								? "bg-gray-800 text-white"
								: "bg-gray-200 text-gray-700"
						} hover:bg-gray-600 hover:text-white transition-all duration-300`}
					>
						{index + 1}
					</button>
				))}
				<button
					onClick={() => paginate(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="px-4 py-2 bg-gray-800 text-white rounded-lg ml-2 hover:bg-blue-600"
				>
					Next
				</button>
			</div>

			{/* Floating Form to Add/Edit Teacher */}
			{showForm && (
				<div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black bg-opacity-50">
					<div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
						<h2 className="text-xl font-bold text-center mb-4">
							{editTeacher ? "Edit Teacher" : "Add Teacher"}
						</h2>
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-800">
									First Name
								</label>
								<input
									type="text"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									required
									className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-800">
									Last Name
								</label>
								<input
									type="text"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									required
									className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-800">
									Email
								</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-800">
									Phone
								</label>
								<input
									type="text"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									required
									className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-800">
									Subject
								</label>
								<input
									type="text"
									name="subject"
									value={formData.subject}
									onChange={handleChange}
									required
									className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-800">
									Remarks
								</label>
								<textarea
									name="remarks"
									value={formData.remarks}
									onChange={handleChange}
									className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div className="flex justify-end">
								<button
									type="button"
									onClick={() => setShowForm(false)}
									className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-4 hover:bg-gray-200"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600"
								>
									{editTeacher
										? "Update Teacher"
										: "Add Teacher"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default TeacherPage;
