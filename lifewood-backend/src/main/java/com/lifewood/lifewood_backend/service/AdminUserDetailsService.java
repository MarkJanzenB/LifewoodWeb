package com.lifewood.lifewood_backend.service;

import com.lifewood.lifewood_backend.model.AdminUser;
import com.lifewood.lifewood_backend.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class AdminUserDetailsService implements UserDetailsService {
    @Autowired
    private AdminUserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AdminUser adminUser = repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return new User(adminUser.getUsername(), adminUser.getPassword(), new ArrayList<>());
    }
}