package com.tito.service;

import java.io.IOException;
//import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.StringReader;

//import javax.servlet.annotation.WebServlet;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;

//import com.auth0.jwt.*;
//import com.auth0.jwt.algorithms.*;
//import com.auth0.jwt.exceptions.*;
//
//import com.fasterxml.jackson.core.*;
//import com.fasterxml.jackson.databind.*;
//
//import com.tito.model.Sausage;

public class JsonService {

	public JsonService() {}

	public String getJsonStringFromRequest(HttpServletRequest request)
			throws IOException {
		StringBuffer jb = new StringBuffer();
		String line = null;
		try {
			BufferedReader reader = request.getReader();
			while ((line = reader.readLine()) != null) {
				jb.append(line);
			}
			return jb.toString();
		} catch (IOException e) {
			throw new IOException("Error reading request");
		}
	}

	public JsonObject readObject(String json) throws IOException {
		JsonObject jsonObj = null;
		try {
			JsonReader jsonReader = Json.createReader(new StringReader(json));
			jsonObj = jsonReader.readObject();
			return jsonObj;
		} catch (Exception e) {
			throw new IOException("Error parsing JSON string");
		}
	}
}
