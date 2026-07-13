package com.example.backend.repository;

import com.example.backend.entity.books;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository<books, Long> {
    Optional<books> findByTitleIgnoreCase(String title);
}
