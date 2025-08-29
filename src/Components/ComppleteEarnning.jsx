import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosecure from '../hooks/useAxiosecure';
import Loading from './Loading';

const ComppleteEarnning = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosecure();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      if (!user?.email) return;

      try {
        // Fetch tasks assigned to the rider and marked as complete
        const res = await axiosSecure.get(`/rider/tasks/completed/${user?.email}`);
        setTasks(res.data || []);

        // Calculate total earnings (5% of each product price)
        const earnings = res.data.reduce((acc, task) => acc + (task.deliveryCost * 0.05), 0);
        setTotalEarnings(earnings);

      } catch (err) {
        console.error('Error fetching completed tasks:', err);
        Swal.fire('Error', 'Failed to load completed tasks', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTasks();
  }, [user, axiosSecure]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Earnings</h2>
      <div className="mb-6">
        <p className="text-lg text-gray-700">
          Total Completed Tasks: <span className="font-semibold">{tasks.length}</span>
        </p>
        <p className="text-lg text-gray-700">
          Total Earnings: <span className="font-semibold">${totalEarnings.toFixed(2)}</span>
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Task ID</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">DeliveryCost</th>
              <th className="py-2 px-4 border-b">Earning (5%)</th>
              <th className="py-2 px-4 border-b">Completed At</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="text-center">
                <td className="py-2 px-4 border-b">{task._id}</td>
                <td className="py-2 px-4 border-b">{task.title}</td>
                <td className="py-2 px-4 border-b">${task.deliveryCost}</td>
                <td className="py-2 px-4 border-b">${(task.deliveryCost * 0.05).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{new Date(task.creation_date).toLocaleDateString()}</td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-gray-500">
                  No completed tasks yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComppleteEarnning;
