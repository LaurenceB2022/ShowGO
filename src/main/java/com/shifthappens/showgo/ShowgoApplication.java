package com.shifthappens.showgo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.shifthappens.showgo.repositories")
public class ShowgoApplication {
    //Runs application
	public static void main(String[] args) {
		SpringApplication.run(ShowgoApplication.class, args);
	}

}
