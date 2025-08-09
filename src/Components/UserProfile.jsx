import React, { useEffect, useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUserTag, FaCalendarAlt, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Loading from './Loading';
import useAxiosecure from '../hooks/useAxiosecure';
import useAuth from '../hooks/useAuth';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    bio: ''
  });
  const axiosSecure = useAxiosecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user?.email}`);
        setUserData(res.data);
        setFormData({
          name: res.data.name,
          phone: res.data.phone || '',
          district: res.data.district || '',
          bio: res.data.bio || ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        Swal.fire('Error', 'Failed to load profile data', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchUserProfile();
    }
  }, [user, axiosSecure]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSave = async () => {
  try {
    await axiosSecure.patch(`/users/update/${user?.email}`, formData);
    // Fetch the full, updated user profile
    const res = await axiosSecure.get(`/users/${user?.email}`);
    setUserData(res.data);
    setIsEditing(false);
    Swal.fire('Success', 'Profile updated successfully!', 'success');
  } catch (error) {
    console.error('Update error:', error);
    Swal.fire('Error', error.response?.data?.message || 'Failed to update profile', 'error');
  }
};

  if (loading) return <Loading />;
  if (!userData) return <div className="text-center py-10">No user data found</div>;

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Photo Section */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-blue-100">
              {userData.photoURL ? (
                <img 
                  src={userData.photoURL} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.parentElement.innerHTML = '<FaUser className="text-6xl text-gray-400" />';
                  }}
                />
              ) : (
                <FaUser className="text-6xl text-gray-400" />
              )}
            </div>
            <button
              className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
              onClick={() => document.getElementById('photoInput').click()}
            >
              <FaEdit size={14} />
            </button>
            <input type="file" id="photoInput" className="hidden" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
          <p className="text-gray-600">{userData.role}</p>

          {userData.bio && !isEditing && (
            <p className="mt-4 px-4 py-2 bg-gray-50 rounded-lg text-gray-700 italic">
              "{userData.bio}"
            </p>
          )}
        </div>

        {/* Profile Information Section */}
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <FaEdit /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-700">District</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="3"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <ProfileInfoRow icon={<FaUser className="text-blue-600" />} label="Name" value={userData.name} />
              <ProfileInfoRow icon={<FaEnvelope className="text-blue-600" />} label="Email" value={userData.email} />
              <ProfileInfoRow icon={<FaPhone className="text-blue-600" />} label="Phone" value={userData.phone || 'Not provided'} />
              <ProfileInfoRow icon={<FaUserTag className="text-blue-600" />} label="Role" value={userData.role} />
              <ProfileInfoRow icon={<FaMapMarkerAlt className="text-blue-600" />} label="District" value={userData.district || 'Not provided'} />
              <ProfileInfoRow 
                icon={<FaCalendarAlt className="text-blue-600" />} 
                label="Member Since" 
                value={new Date(userData.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Profile Info Row Component
const ProfileInfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 pb-3 border-b border-gray-100">
    <div className="mt-1">{icon}</div>
    <div className="flex-1">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-medium text-gray-800">{value}</div>
    </div>
  </div>
);

export default UserProfile;