package com.devops.profile.controller;

import com.devops.profile.model.Profile;
import com.devops.profile.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = { "http://localhost:8081", "http://frontend:80" })
public class ProfileController {

    @Autowired
    private ProfileRepository profileRepository;

    /**
     * GET /profile  — returns all saved profiles.
     * Returns the first profile if only one is needed, or an empty list.
     */
    @GetMapping
    public ResponseEntity<List<Profile>> getAllProfiles() {
        List<Profile> profiles = profileRepository.findAll();
        return ResponseEntity.ok(profiles);
    }

    /**
     * GET /profile/{id}  — returns a single profile by id.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfileById(@PathVariable Long id) {
        Optional<Profile> profile = profileRepository.findById(id);
        return profile.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    /**
     * POST /profile  — creates or updates a profile.
     * If a profile already exists for this id (or if id is null, inserts new).
     */
    @PostMapping
    public ResponseEntity<Profile> saveProfile(@RequestBody Profile profile) {
        Profile saved = profileRepository.save(profile);
        return ResponseEntity.ok(saved);
    }

    /**
     * PUT /profile/{id}  — updates an existing profile.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Profile> updateProfile(@PathVariable Long id,
                                                  @RequestBody Profile updatedProfile) {
        return profileRepository.findById(id).map(existing -> {
            existing.setName(updatedProfile.getName());
            existing.setCollege(updatedProfile.getCollege());
            existing.setSkills(updatedProfile.getSkills());
            existing.setCertifications(updatedProfile.getCertifications());
            existing.setImageUrl(updatedProfile.getImageUrl());
            return ResponseEntity.ok(profileRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    /**
     * DELETE /profile/{id}  — deletes a profile.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        if (profileRepository.existsById(id)) {
            profileRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
