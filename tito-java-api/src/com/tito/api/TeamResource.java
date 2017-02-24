package com.tito.api;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;

import com.tito.model.Sausage;
import com.tito.model.Team;
import com.tito.repository.TeamRepository;
import com.tito.repository.TeamRepositoryStub;

@Path("teams") // http://<server>:<port>/api/teams
public class TeamResource {

	private TeamRepository teamRepository = new TeamRepositoryStub();

// TODO: JWTs!!!!!!!!!!!!!!!

	@POST
	// http://<server>:<port>/api/teams/team
	@Path("team")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Team createTeam(Team team) {

//		System.out.println(team.getName());
//		System.out.println(team.getTotalHomeruns());

		teamRepository.create(team);

		return team;
	}

	@POST
	// http://<server>:<port>/api/teams/team
	@Path("team")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public Team createTeamParams(MultivaluedMap<String, String> formParams) {

		Team team = new Team();
//		team.setId("123");
		team.setName(formParams.getFirst("name"));
//		team.setSausage(new Sausage("123", "TODO: Sausage 123"));
		team.setTotalHomeruns(Integer.parseInt(formParams.getFirst("totalHomeruns")));

		teamRepository.create(team);

		return team;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Team> getAllTeams() {
		return teamRepository.findAllTeams();
	}

	@GET
	// http://<server>:<port>/api/teams/<teamId>
	@Path("{teamId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Team getTeam(@PathParam("teamId") String teamId) {
		return teamRepository.findTeamById(teamId);
	}

	@GET
	// http://<server>:<port>/api/teams/<teamId>/sausage
	@Path("{teamId}/sausage")
	@Produces(MediaType.APPLICATION_JSON)
	public Sausage getTeamSausage(@PathParam("teamId") String teamId) {
		Team team = teamRepository.findTeamById(teamId);
		return team != null ? team.getSausage() : null;
	}
}

// package com.tito.api;
//
// import java.io.IOException;
// import java.io.PrintWriter;
//// import java.io.StringReader;
// import java.util.ArrayList;
//
// import javax.servlet.annotation.WebServlet;
//// import javax.servlet.ServletException;
// import javax.servlet.http.HttpServlet;
// import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpServletResponse;
//// import javax.json.Json;
//// import javax.json.JsonObject;
//// import javax.json.JsonReader;
//
// import com.fasterxml.jackson.core.*;
// import com.fasterxml.jackson.databind.*;
//
// import com.tito.model.Sausage;
// import com.tito.model.Team;
//
// import com.tito.service.JsonService;
//
// @WebServlet("/team")
// public class TeamControllerServlet extends HttpServlet {
// public static final long serialVersionUID = 0L;
//
// @Override
// public void doGet(HttpServletRequest request, HttpServletResponse response)
// throws IOException {
//
// if (this.isValidToken(request)) {
// request.setCharacterEncoding("utf8");
// response.setContentType("application/json");
// PrintWriter out = response.getWriter();
//
// ArrayList<Team> teams = new ArrayList<Team>();
// for (int i = 0; i < 8; i++ ) {
// Team team = new Team();
// team.setName("TODO: Team Name: " + i);
//// TODO: Push stuff down into services, and let the TeamService use a
// SausageService of some kind to create a Sausage from the request
//// TODO: Rename the login controller to the SausageController?
//// TODO: Are these endpoints really controllers?
//// TODO: JAX-WS?
// team.setSausage(new Sausage("???"));
// teams.add(team);
// }
//
// this.generateJsonResponse(teams, out);
//
// } else {
//
// response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//
// }
// }
//
// @Override
// public void doPost(HttpServletRequest request, HttpServletResponse response)
// throws IOException {
//
// if (this.isValidToken(request)) {
// request.setCharacterEncoding("utf8");
// response.setContentType("application/json");
// PrintWriter out = response.getWriter();
//
// Team team = new Team();
// team.setName("TODO: Team Names");
// team.setSausage(new Sausage("!!!"));
//
// this.generateJsonResponse(team, out);
//
// } else {
//
// response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//
// }
// }
//
// private boolean isValidToken(HttpServletRequest request) throws IOException {
// JsonService jsonService = new JsonService();
// try {
// String token = jsonService.getJsonStringFromRequest(request);
// return token != null;
// } catch (IOException e) {
// throw(e);
// }
// }
//
// private void generateJsonResponse(Object obj, PrintWriter out) {
// ObjectMapper objectMapper = new ObjectMapper();
// try {
// String json = objectMapper.writeValueAsString(obj);
// out.print(json);
// } catch (JsonGenerationException e) {
// e.printStackTrace();
// } catch (JsonMappingException e) {
// e.printStackTrace();
// } catch (IOException e) {
// e.printStackTrace();
// }
// }
// }
