package com.example.backend.mapper;

import com.example.backend.entity.Genre;
import org.springframework.stereotype.Component;

@Component
public class GenreMapper {
    public Genre toGenre(String genre) {
        if (genre == null || genre.isBlank()) {
            throw new IllegalArgumentException("Genre is required");
        }

        String enumName = genre.trim()
                .replace("-", "_")
                .replace(" ", "_");

        try {
            return Genre.valueOf(enumName);
        } catch (IllegalArgumentException exception) {
            throw new IllegalArgumentException("Invalid genre: " + genre);
        }
    }
}
