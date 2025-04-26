package dev.LearningPlatform.Skill_Sharing.Learning.Platform.controller;

import dev.LearningPlatform.Skill_Sharing.Learning.Platform.model.User;
import dev.LearningPlatform.Skill_Sharing.Learning.Platform.service.UserService;
import dev.LearningPlatform.Skill_Sharing.Learning.Platform.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private FileStorageService fileStorageService;

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create new user
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createUser(
            @RequestParam String name,
            @RequestParam String username,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam int age,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String bio,
            @RequestParam(required = false) MultipartFile profilePhoto,
            @RequestParam(required = false) MultipartFile coverPhoto
    ) {
        try {
            User user = new User(name, username, email, password, age, location, bio);

            if (profilePhoto != null && !profilePhoto.isEmpty()) {
                user.setProfilePhotoUrl(storeAndGetFileUrl(profilePhoto));
            }

            if (coverPhoto != null && !coverPhoto.isEmpty()) {
                user.setCoverPhotoUrl(storeAndGetFileUrl(coverPhoto));
            }

            User createdUser = userService.createUser(user);

            return ResponseEntity.created(
                    ServletUriComponentsBuilder.fromCurrentRequest()
                            .path("/{id}")
                            .buildAndExpand(createdUser.getId())
                            .toUri()
            ).body(createdUser);

        } catch (DuplicateKeyException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }
    }

    // Update user
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateUser(
            @PathVariable String id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String password,
            @RequestParam(required = false) Integer age,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String bio,
            @RequestParam(required = false) MultipartFile profilePhoto,
            @RequestParam(required = false) MultipartFile coverPhoto
    ) {
        try {
            User user = new User();
            if (name != null) user.setName(name);
            if (username != null) user.setUsername(username);
            if (email != null) user.setEmail(email);
            if (password != null) user.setPassword(password);
            if (age != null) user.setAge(age);
            if (location != null) user.setLocation(location);
            if (bio != null) user.setBio(bio);

            if (profilePhoto != null && !profilePhoto.isEmpty()) {
                user.setProfilePhotoUrl(storeAndGetFileUrl(profilePhoto));
            }

            if (coverPhoto != null && !coverPhoto.isEmpty()) {
                user.setCoverPhotoUrl(storeAndGetFileUrl(coverPhoto));
            }

            User updatedUser = userService.updateUser(id, user);
            return updatedUser != null ? ResponseEntity.ok(updatedUser) : ResponseEntity.notFound().build();

        } catch (DuplicateKeyException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }
    }

    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // Serve uploaded files
    @GetMapping("/files/{fileName:.+}")
    public ResponseEntity<byte[]> serveFile(@PathVariable String fileName) {
        try {
            Path filePath = fileStorageService.getFilePath(fileName);
            byte[] fileContent = Files.readAllBytes(filePath);

            String mimeType = Files.probeContentType(filePath);
            MediaType mediaType = (mimeType != null) ? MediaType.parseMediaType(mimeType) : MediaType.APPLICATION_OCTET_STREAM;

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(fileContent);

        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Utility method to store file and return its URL
    private String storeAndGetFileUrl(MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/users/files/")
                .path(fileName)
                .toUriString();
    }
}
