package com.example.backend.controller;

import com.example.backend.dto.BookRequest;
import com.example.backend.dto.BookResponse;
import com.example.backend.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping
    public List<BookResponse> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{bookid}")
    public BookResponse getBookById(@PathVariable Long bookid) {
        return bookService.getBookById(bookid);
    }

    @PostMapping
    public ResponseEntity<BookResponse> createBook(@Valid @RequestBody BookRequest request) {
        BookResponse response = bookService.createBook(request);
        return ResponseEntity.created(URI.create("/api/books/" + response.id())).body(response);
    }

    @PutMapping("/{bookid}")
    public BookResponse updateBook(@PathVariable Long bookid, @Valid @RequestBody BookRequest request) {
        return bookService.updateBook(bookid, request);
    }

    @DeleteMapping("/{bookid}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long bookid) {
        bookService.deleteBook(bookid);
        return ResponseEntity.noContent().build();
    }
}
