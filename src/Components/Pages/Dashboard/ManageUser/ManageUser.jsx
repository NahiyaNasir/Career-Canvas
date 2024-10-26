import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../Hooks/AxiosHooks/useAxiosPublic";
import Swal from "sweetalert2";
import { GiRunningNinja } from "react-icons/gi";

const ManageUser = () => {
    const axios = useAxiosPublic();
    const [firebaseUsers, setFirebaseUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null); // For updating user

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token) {
                    const response = await axios.get('/api/users', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    setFirebaseUsers(response.data.firebaseUsers);
                } else {
                    setError('No authentication token found');
                }
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, [axios]);

    if (loading) return <div className="flex w-full items-center justify-center pt-20">
        <GiRunningNinja className="text-[2.8rem] animate-bounce h-16  w-16 md:h-36  md:w-36 text-green-500" />
    </div>;
    if (error) return <div>{error}</div>;

    const handleDelete = async (uid) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token');

                    if (token) {
                        await axios.delete(`/api/users/${uid}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });

                        // Update user list after successful deletion
                        setFirebaseUsers(prevUsers => prevUsers.filter(user => user.uid !== uid));

                        // Success message
                        Swal.fire(
                            'Deleted!',
                            'User has been deleted.',
                            'success'
                        );
                    } else {
                        setError('No authentication token found');
                    }
                } catch (error) {
                    setError('Failed to delete user', error);
                    Swal.fire(
                        'Error!',
                        'There was an issue deleting the user.',
                        'error'
                    );
                }
            }
        });
    };

    const handleUpdate = async (uid) => {
        // Retrieve the selected user for editing
        const userToUpdate = firebaseUsers.find(user => user.uid === uid);
        setSelectedUser(userToUpdate);

        // Open a prompt or modal to edit user details
        const { value: formValues } = await Swal.fire({
            title: 'Update User',
            html:
                `<input id="name" class="swal2-input" placeholder="Name" value="${userToUpdate.displayName || ''}">
                <input id="email" class="swal2-input" placeholder="Email" value="${userToUpdate.email || ''}">`,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('name').value,
                    document.getElementById('email').value
                ];
            }
        });

        if (formValues) {
            const [name, email] = formValues;
            try {
                const token = localStorage.getItem('token');

                if (token) {
                    await axios.put(`/api/users/${uid}`, { displayName: name, email }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    // Update user list after successful update
                    setFirebaseUsers(prevUsers =>
                        prevUsers.map(user =>
                            user.uid === uid ? { ...user, displayName: name, email } : user
                        )
                    );

                    Swal.fire(
                        'Updated!',
                        'User has been updated.',
                        'success'
                    );
                } else {
                    setError('No authentication token found');
                }
            } catch (error) {
                setError('Failed to update user', error);
                Swal.fire(
                    'Error!',
                    'There was an issue updating the user.',
                    'error'
                );
            }
        }
    };

    return (
        <div className="flex-1 p-10 h-full bg-gray-100">
            {/* User Management Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <h2 className="text-2xl font-semibold p-6 border-b border-gray-200">Manage Users</h2>
                <table className="min-w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-600">Username</th>
                            <th className="py-3 px-6 text-left text-gray-600">Email</th>
                            <th className="py-3 px-6 text-left text-gray-600">Role</th>
                            <th className="py-3 px-6 text-left text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {firebaseUsers.map((user) => (
                            <tr key={user.uid} className="hover:bg-gray-100 transition-colors duration-200">
                                <td className="py-3 px-6 border-b border-gray-300">{user.displayName || 'N/A'}</td>
                                <td className="py-3 px-6 border-b border-gray-300">{user.email}</td>
                                <td className="py-3 px-6 border-b border-gray-300">{user.customClaims?.role || 'User'}</td>
                                <td className="py-3 px-6 border-b border-gray-300">
                                    <button
                                        onClick={() => handleUpdate(user.uid)} // Correctly invoking handleUpdate
                                        className="text-blue-500 hover:underline mr-2">Edit</button>
                                    <button
                                        onClick={() => handleDelete(user.uid)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
