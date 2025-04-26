import React, { useState } from "react";
import { createUser } from "../api";
import "./UserForm.css";

const UserForm = () => {
    const [user, setUser] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        age: "",
        location: "",
        bio: "",
        profilePhoto: null,
        coverPhoto: null
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [preview, setPreview] = useState({
        profilePhoto: null,
        coverPhoto: null
    });

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            setUser({ ...user, [type]: file });
            const previewUrl = URL.createObjectURL(file);
            setPreview(prev => ({ ...prev, [type]: previewUrl }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const formData = new FormData();
            formData.append("name", user.name);
            formData.append("username", user.username);
            formData.append("password", user.password);
            formData.append("email", user.email);
            formData.append("age", user.age);
            if (user.location) formData.append("location", user.location);
            if (user.bio) formData.append("bio", user.bio);
            if (user.profilePhoto) formData.append("profilePhoto", user.profilePhoto);
            if (user.coverPhoto) formData.append("coverPhoto", user.coverPhoto);

            console.log("Sending form data:", Object.fromEntries(formData.entries()));

            const response = await createUser(formData);
            console.log("Created user:", response);

            localStorage.setItem("userEmail", user.email);
            setSuccess("Profile Created Successfully!");

            setUser({
                name: "",
                username: "",
                password: "",
                email: "",
                age: "",
                location: "",
                bio: "",
                profilePhoto: null,
                coverPhoto: null
            });

            setPreview({
                profilePhoto: null,
                coverPhoto: null
            });

            document.querySelectorAll('input[type="file"]').forEach(input => input.value = '');

        } catch (error) {
            console.error("Error details:", error);
            if (error.response) {
                if (error.response.status === 409) {
                    setError("This email is already registered. Please use a different email.");
                } else if (error.response.data?.message) {
                    setError(error.response.data.message);
                } else {
                    setError(`Server error: ${error.response.status}. Please try again.`);
                }
            } else if (error.request) {
                setError("No response from server. Please check your internet connection.");
            } else {
                setError("Error creating profile. Please try again.");
            }
        }
    };

    return (
        <div className="profile-form-container">
            <h2>Create Your Profile</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="number"
                        placeholder="Age"
                        value={user.age}
                        onChange={(e) => setUser({ ...user, age: e.target.value })}
                        min="1"
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        value={user.location}
                        onChange={(e) => setUser({ ...user, location: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <textarea
                        placeholder="Bio"
                        value={user.bio}
                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label>Profile Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "profilePhoto")}
                    />
                    {preview.profilePhoto && (
                        <div className="image-preview">
                            <img src={preview.profilePhoto} alt="Profile preview" />
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label>Cover Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "coverPhoto")}
                    />
                    {preview.coverPhoto && (
                        <div className="image-preview">
                            <img src={preview.coverPhoto} alt="Cover preview" />
                        </div>
                    )}
                </div>

                <button type="submit" className="submit-button">Create Profile</button>
            </form>
        </div>
    );
};

export default UserForm;
