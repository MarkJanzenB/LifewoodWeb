package com.lifewood.lifewood_backend.service;

import com.lifewood.lifewood_backend.model.AdminUser;
import com.lifewood.lifewood_backend.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AdminUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminUserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Step 1: Find the user in the database by their username.
        AdminUser adminUser = repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // Step 2: Get the role from the user object (e.g., "ROOT" or "ADMIN").
        // We add the "ROLE_" prefix, which is the standard convention for Spring Security.
        String role = "ROLE_" + adminUser.getRole().toUpperCase();

        // Step 3: Create a Spring Security User object with the username, hashed password,
        // and a list containing their single, correct authority/role.
        return new User(
                adminUser.getUsername(),
                adminUser.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(role))
        );
    }
}