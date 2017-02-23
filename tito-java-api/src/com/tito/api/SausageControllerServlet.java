package com.tito.api;

import java.io.IOException;
import java.io.PrintWriter;
//import java.io.BufferedReader;
//import java.io.StringReader;

import javax.servlet.annotation.WebServlet;
//import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//import javax.json.Json;
//import javax.json.JsonObject;
//import javax.json.JsonReader;

import com.auth0.jwt.*;
import com.auth0.jwt.algorithms.*;
import com.auth0.jwt.exceptions.*;

import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;

import com.tito.model.Sausage;

import com.tito.service.JsonService;

@WebServlet("/sausage/login")
public class SausageControllerServlet extends HttpServlet {
	public static final long serialVersionUID = 0L;

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws IOException {

		request.setCharacterEncoding("utf8");
		response.setContentType("application/json");

		JsonService jsonService = new JsonService();
		String jsonIn = null;
		try {
			jsonIn = jsonService.getJsonStringFromRequest(request);
		} catch (IOException e) {
			throw(e);
		}

		ObjectMapper objectMapper = new ObjectMapper();

		Sausage sausage = objectMapper.readValue(jsonIn, Sausage.class);

		try {
		    String token = JWT.create()
		        .withIssuer("auth0")
		        .sign(Algorithm.HMAC256("secret"));
		    sausage.setToken(token);
		} catch (JWTCreationException exception){
		    //Invalid Signing configuration / Couldn't convert Claims.
		}

		PrintWriter out = response.getWriter();

		try {
			String sausageJson = objectMapper.writeValueAsString(sausage);
			out.print(sausageJson);
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
  }
}
