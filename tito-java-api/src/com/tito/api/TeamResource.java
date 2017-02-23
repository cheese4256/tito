package com.tito.api;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.tito.model.Team;
import com.tito.repository.TeamRepository;
import com.tito.repository.TeamRepositoryStub;

@Path("teams")
public class TeamResource {

	private TeamRepository teamRepository = new TeamRepositoryStub();

	@GET
	@Produces(MediaType.APPLICATION_XML)
	public List<Team> getAllTeams() {
		return teamRepository.findAllTeams();
	}
}
