package com.example.backend.service;

import com.example.backend.dto.BookRequest;
import com.example.backend.dto.BookResponse;
import com.example.backend.entity.books;
import com.example.backend.exception.BookNotFoundException;
import com.example.backend.exception.DuplicateBookException;
import com.example.backend.mapper.BookMapper;
import com.example.backend.repository.BookRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    @Transactional(readOnly = true)
    public List<BookResponse> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(bookMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public BookResponse getBookById(Long id) {
        return bookMapper.toResponse(findBook(id));
    }

    @Transactional
    public BookResponse createBook(@Valid BookRequest request) {
        ensureTitleIsAvailable(request.title(), null);

        books book = bookMapper.toEntity(request);

        return bookMapper.toResponse(bookRepository.save(book));
    }

    @Transactional
    public BookResponse updateBook(Long id, @Valid BookRequest request) {
        books book = findBook(id);
        ensureTitleIsAvailable(request.title(), id);

        // Keep update behavior simple: replace editable book fields with the request values.
        bookMapper.updateEntity(book, request);

        return bookMapper.toResponse(bookRepository.save(book));
    }

    @Transactional
    public void deleteBook(Long id) {
        books book = findBook(id);
        bookRepository.delete(book);
    }

    private books findBook(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));
    }

    private void ensureTitleIsAvailable(String title, Long currentBookId) {
        bookRepository.findByTitleIgnoreCase(title.trim())
                .filter(existingBook -> !existingBook.getId().equals(currentBookId))
                .ifPresent(existingBook -> {
                    throw new DuplicateBookException(title.trim());
                });
    }
}
