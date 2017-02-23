package com.tito.api;

import java.io.IOException;
import java.io.PrintWriter;
//import java.io.StringReader;

//import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//import javax.json.Json;
//import javax.json.JsonObject;
//import javax.json.JsonReader;

import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;

import com.tito.model.Test;

public class TestRest extends HttpServlet {
	public static final long serialVersionUID = 0L;

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response)
		throws IOException {
		request.setCharacterEncoding("utf8");
//		response.setCharacterEncoding("utf8");
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
//		JsonReader jsonReader = Json.createReader(new StringReader("{" + request.getParameter("para") + "}"));
//		JsonObject jsonObj = jsonReader.readObject();
//		System.out.println(jsonObj.getString("message"));

//		JsonObject obj = Json.createObjectBuilder().add("message", "hello from server").build();
//		out.print(obj);

		Test test = new Test();
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			String testJson = objectMapper.writeValueAsString(test);
			out.print(testJson);
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
  }
}
