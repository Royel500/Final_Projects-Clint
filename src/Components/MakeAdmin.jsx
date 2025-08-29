import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useAxiosecure from '../hooks/useAxiosecure';
import confetti from 'canvas-confetti'; // make sure you have installed it

const MakeAdmin = () => {
  const axiosSecure = useAxiosecure();
  const [searchEmail, setSearchEmail] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]); 

  // ---------- fetch all users ----------
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/users`);
        if (res.data.success) {
          setAllUsers(res.data.users); 
        } else {
          Swal.fire('Not Found', res.data.message, 'info');
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to fetch users.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  // ---------- search user by email ----------
const handleSearch = async () => {
  setLoading(true);
  try {
const res = await axiosSecure.get(`/users/searches?email=${searchEmail}`);

    if (res.data.success) {
      setUser(res.data.user);
    } else {
      setUser(null);
      Swal.fire('Not Found', res.data.message, 'info');
    }
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'Failed to fetch user.', 'error');
  } finally {
    setLoading(false);
  }
};



  // ---------- change role ----------


const SUPER_ADMIN_EMAIL = "webdev.royelali@gmail.com"; // put your fixed email here

const handleRoleChange = async (newRole, email) => {
  // Block removing Super Admin
  if (email === SUPER_ADMIN_EMAIL && newRole !== "admin") {
   Swal.fire({
  icon: "error",
  title: "Not Allowed",
  html: `
    <p>You cannot remove the Super Admin!</p>
    <p>Only the Super Admin can manage other admins.</p>
    <p>This action is blocked if you try to remove him 3 time .</p>
  `,
});


    // Speak out loud with female voice
    const msg = new SpeechSynthesisUtterance("You cannot remove the Super Admin!");
    msg.lang = "en-US";
    msg.pitch = 1;
    msg.rate = 0.8;

    const voices = window.speechSynthesis.getVoices();
    const femaleVoice =
      voices.find(v => v.name.toLowerCase().includes("female")) ||
      voices.find(v => v.name.toLowerCase().includes("woman")) ||
      voices.find(v => v.lang === "en-US");
    if (femaleVoice) msg.voice = femaleVoice;

    window.speechSynthesis.speak(msg);

    return;
  }

  // Confirmation dialog
  const result = await Swal.fire({
    title: `Are you sure you want to ${
      newRole === "admin" ? "make this user an Admin" : "remove Admin"
    }?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    const res = await axiosSecure.patch("/users/role", { email, role: newRole });

    if (res.data.success) {
      // Update local state
      setAllUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, role: newRole } : u))
      );
      if (user && user.email === email) {
        setUser((prev) => ({ ...prev, role: newRole }));
      }

      // If new admin → confetti + voice
      if (newRole === "admin") {
        Swal.fire({
          title: "🎉 Welcome to the Admin Panel!",
          text: res.data.message,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          didOpen: () => {
            const duration = 2000;
            const end = Date.now() + duration;

            (function frame() {
              confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                shapes: ["circle", "star"],
                colors: ["#ff69b4", "#ffb6c1", "#ffd700"],
              });
              confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                shapes: ["circle", "star"],
                colors: ["#ff69b4", "#ffb6c1", "#ffd700"],
              });

              if (Date.now() < end) {
                requestAnimationFrame(frame);
              }
            })();

            // 🎤 Voice announcement with female voice
            const msg = new SpeechSynthesisUtterance(`Congratulations Admin!`);
            msg.lang = "en-US";
            msg.pitch = 1;
            msg.rate = 0.8;

            const voices = window.speechSynthesis.getVoices();
            const femaleVoice =
              voices.find(v => v.name.toLowerCase().includes("female")) ||
              voices.find(v => v.name.toLowerCase().includes("woman")) ||
              voices.find(v => v.lang === "en-US");
            if (femaleVoice) msg.voice = femaleVoice;

            window.speechSynthesis.speak(msg);
          },
        });
      } else {
        Swal.fire("Success", res.data.message, "success");

        // 🎤 Voice announcement with female voice
        const msg = new SpeechSynthesisUtterance(`Remove admin successfully.`);
        msg.lang = "en-US";
        msg.pitch = 1;
        msg.rate = 0.8;

        const voices = window.speechSynthesis.getVoices();
        const femaleVoice =
          voices.find(v => v.name.toLowerCase().includes("female")) ||
          voices.find(v => v.name.toLowerCase().includes("woman")) ||
          voices.find(v => v.lang === "en-US");
        if (femaleVoice) msg.voice = femaleVoice;

        window.speechSynthesis.speak(msg);
      }
    } else {
      Swal.fire("Error", res.data.message, "error");
    }
  } catch (error) {
    Swal.fire("Error", "Failed to update role.", "error");
    console.error(error);
  }
};






  return (
    <section className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Users (Make / Remove Admin)</h2>

      {/* Search Box */}
      <div className="flex gap-2 mb-6">
        <input
          type="email"
          placeholder="Enter user email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="input input-bordered w-full"
        />
        <button
          className="btn btn-primary"
          onClick={handleSearch}
          disabled={loading || !searchEmail}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Searched User Card */}
      {user && (
        <div className="border p-4 rounded-lg bg-base-200 mb-6">
          <p><strong>Name:</strong> {user.name || 'N/A'}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> <span className="capitalize">{user.role}</span></p>
          <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

          <div className="mt-4 space-x-2">
            {user.role !== 'admin' ? (
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleRoleChange('admin', user.email)}
              >
                Make Admin
              </button>
            ) : (
              <button
                className="btn btn-warning btn-sm"
                onClick={() => handleRoleChange('user', user.email)}
              >
                Remove Admin
              </button>
            )}
          </div>
        </div>
      )}

      {/* All Users Table */}
      <h3 className="text-xl font-semibold mb-2">All Users</h3>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((u, index) => (
              <tr key={u._id}>
                <td>{index + 1}</td>
                <td>{u.name || 'N/A'}</td>
                <td>{u.email}</td>
                <td className="capitalize">{u.role}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  {u.role !== 'admin' ? (
                    <button
                      className="btn btn-success btn-xs"
                      onClick={() => handleRoleChange('admin', u.email)}
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning btn-xs"
                      onClick={() => handleRoleChange('user', u.email)}
                    >
                      Remove Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MakeAdmin;
