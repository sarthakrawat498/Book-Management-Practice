package com.example.backend.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Genre {
    Fiction("Fiction"),
    Non_Fiction("Non-Fiction"),
    Fantasy("Fantasy"),
    Science_Fiction("Science Fiction"),
    Mystery("Mystery"),
    Biography("Biography"),
    Self_Help("Self Help"),
    Finance("Finance"),
    History("History"),
    Romance("Romance"),
    Thriller("Thriller"),
    True_Crime("True Crime");

    private final String displayName;
}
