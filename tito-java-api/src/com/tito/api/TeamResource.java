package com.tito.api;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.Claim;
import com.tito.model.Role;
import com.tito.model.Sausage;
import com.tito.model.Team;
import com.tito.service.JwtService;
import com.tito.service.TeamService;

@Path("teams") // http://<server>:<port>/api/teams
public class TeamResource extends TitoResource<Team> {

	private JwtService jwtService;

	public TeamResource() {}

	public TeamResource(TeamService teamService, JwtService jwtService) {
		super(teamService);
		this.jwtService = jwtService;
	}

// TODO: JWTs!!!!!!!!!!!!!!!
// TODO: Push the JWT stuff down into the services

	@POST
	// http://<server>:<port>/api/teams/team
	@Path("team")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Team createTeam(@HeaderParam(HttpHeaders.AUTHORIZATION) String authorization, Team team) {
		return service.create(team);
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
		team.setHomeruns(Integer.parseInt(formParams.getFirst("homeruns")));

		team = service.create(team);

		return team;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Team> getAllTeams(@Context HttpHeaders headers, @HeaderParam(HttpHeaders.AUTHORIZATION) String authorization) {

		JWT jwt = jwtService.jwtVerify(authorization);

		if (jwt != null) {
			Claim roleClaims = jwt.getClaim("roles");
			Role[] roles = roleClaims.asArray(Role.class);
			boolean isAdmin = false;
			for (Role role : roles) {
				if (role.getName().equals("admin")) {
					isAdmin = true;
					break;
				}
			}
			if (isAdmin) {
				return service.find();
			}
		}

		throw new WebApplicationException(Response.Status.UNAUTHORIZED);
	}

	@GET
	// http://<server>:<port>/api/teams/<teamId>
	@Path("{teamId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Team getTeam(@PathParam("teamId") String teamId) {
		return service.findById(Integer.parseInt(teamId));
	}

	@GET
	// http://<server>:<port>/api/teams/<teamId>/sausage
	@Path("{teamId}/sausage")
	@Produces(MediaType.APPLICATION_JSON)
	public Sausage getTeamSausage(@PathParam("teamId") String teamId) {
		Team team = service.findById(Integer.parseInt(teamId));
		return team != null ? team.getSausage() : null;
	}
}
