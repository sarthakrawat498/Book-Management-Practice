package com.example.backend.dto;

import java.time.LocalDateTime;

public record BookResponse(
        Long id,
        String title,
        String author,
        String genre,
        String description,
        boolean read,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
