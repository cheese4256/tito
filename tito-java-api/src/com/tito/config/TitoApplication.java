package com.tito.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.glassfish.jersey.server.ResourceConfig;

public class TitoApplication extends ResourceConfig {

	public static Properties properties = new Properties();
	private static EntityManagerFactory entityManagerFactory = null;

	public TitoApplication() {
		// Configuration properties
		InputStream input = null;
		try {
			input = getClass().getClassLoader().getResourceAsStream("config.properties");
			if (input != null) {
				properties.load(input);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		entityManagerFactory = Persistence.createEntityManagerFactory(TitoApplication.properties.getProperty("jpa.persistence.unit.name"));
		// Dependency Injection
		register(new TitoBinder());
		packages(true, "com.tito");
	}

	public static EntityManagerFactory getEntityManagerFactory() {
		if (entityManagerFactory == null) {
			entityManagerFactory = Persistence.createEntityManagerFactory(TitoApplication.properties.getProperty("jpa.persistence.unit.name"));
		}
		return entityManagerFactory;
	}
}
