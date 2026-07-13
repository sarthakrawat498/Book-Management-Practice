package com.example.backend.mapper;

import com.example.backend.dto.BookRequest;
import com.example.backend.dto.BookResponse;
import com.example.backend.entity.books;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookMapper {
    private final GenreMapper genreMapper;

    public books toEntity(BookRequest request) {
        return books.builder()
                .title(request.title().trim())
                .author(request.author().trim())
                .genre(genreMapper.toGenre(request.genre()))
                .description(request.description().trim())
                .read(request.read())
                .build();
    }

    public void updateEntity(books book, BookRequest request) {
        book.setTitle(request.title().trim());
        book.setAuthor(request.author().trim());
        book.setGenre(genreMapper.toGenre(request.genre()));
        book.setDescription(request.description().trim());
        book.setRead(request.read());
    }

    public BookResponse toResponse(books book) {
        return new BookResponse(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getGenre().getDisplayName(),
                book.getDescription(),
                book.isRead(),
                book.getCreatedAt(),
                book.getUpdatedAt()
        );
    }
}
