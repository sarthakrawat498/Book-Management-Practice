package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record BookRequest(
        @NotBlank(message = "Title is required")
        @Size(max = 150, message = "Title must be 150 characters or less")
        String title,

        @NotBlank(message = "Author is required")
        @Size(max = 100, message = "Author must be 100 characters or less")
        String author,

        @NotBlank(message = "Genre is required")
        String genre,

        @NotBlank(message = "Description is required")
        @Size(max = 1000, message = "Description must be 1000 characters or less")
        String description,

        boolean read
) {
}
