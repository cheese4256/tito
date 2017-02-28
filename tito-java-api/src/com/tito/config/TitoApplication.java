package com.tito.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.glassfish.jersey.server.ResourceConfig;

public class TitoApplication extends ResourceConfig {

	public static Properties properties = new Properties();

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
    	// Dependency Injection
        register(new TitoBinder());
        packages(true, "com.tito");
    }
}