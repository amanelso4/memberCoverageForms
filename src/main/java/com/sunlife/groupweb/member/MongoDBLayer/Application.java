package com.sunlife.groupweb.member.MongoDBLayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.query.BasicQuery;

import java.util.List;


@SpringBootApplication
public class Application implements CommandLineRunner {

    @Autowired
    private FormRepository repository;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
    }

}
