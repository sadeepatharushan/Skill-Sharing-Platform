import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Make sure backend is running

export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, userData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/users/${id}`);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const getUserByEmail = async (email) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/email/${email}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};

// Skills API functions
export const addSkill = async (userId, skillData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/${userId}/skills`, skillData);
        return response.data;
    } catch (error) {
        console.error("Error adding skill:", error);
        throw error;
    }
};

export const removeSkill = async (userId, skillName) => {
    try {
        await axios.delete(`${API_BASE_URL}/users/${userId}/skills/${encodeURIComponent(skillName)}`);
    } catch (error) {
        console.error("Error removing skill:", error);
        throw error;
    }
};

export const endorseSkill = async (userId, skillName) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/${userId}/skills/${encodeURIComponent(skillName)}/endorse`);
        return response.data;
    } catch (error) {
        console.error("Error endorsing skill:", error);
        throw error;
    }
};
