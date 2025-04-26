package dev.LearningPlatform.Skill_Sharing.Learning.Platform.service;

import dev.LearningPlatform.Skill_Sharing.Learning.Platform.model.User;
import dev.LearningPlatform.Skill_Sharing.Learning.Platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new DuplicateKeyException("Email already exists");
        }
        return userRepository.save(user);
    }

    public User updateUser(String id, User userDetails) {
        Optional<User> existingUserOpt = userRepository.findById(id);

        if (existingUserOpt.isEmpty()) return null;

        User user = existingUserOpt.get();

        // Check email conflict if changing
        if (userDetails.getEmail() != null && !user.getEmail().equals(userDetails.getEmail())) {
            if (userRepository.findByEmail(userDetails.getEmail()).isPresent()) {
                throw new DuplicateKeyException("Email already exists");
            }
            user.setEmail(userDetails.getEmail());
        }

        // Update only non-null fields
        if (userDetails.getName() != null) user.setName(userDetails.getName());
        if (userDetails.getUsername() != null) user.setUsername(userDetails.getUsername());
        if (userDetails.getPassword() != null) user.setPassword(userDetails.getPassword());
        if (userDetails.getAge() != 0) user.setAge(userDetails.getAge());
        if (userDetails.getLocation() != null) user.setLocation(userDetails.getLocation());
        if (userDetails.getBio() != null) user.setBio(userDetails.getBio());
        if (userDetails.getProfilePhotoUrl() != null) user.setProfilePhotoUrl(userDetails.getProfilePhotoUrl());
        if (userDetails.getCoverPhotoUrl() != null) user.setCoverPhotoUrl(userDetails.getCoverPhotoUrl());

        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
