package com.tito.service;

import com.tito.model.Team;
import com.tito.repository.TeamRepository;

public class TeamService extends TitoServiceBase<Team> {

	public TeamService(TeamRepository repository, JwtService jwtService) {
		super(repository, jwtService);
	}
}
