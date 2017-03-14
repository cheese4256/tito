package com.tito.config;

import org.glassfish.hk2.utilities.binding.AbstractBinder;

import com.tito.api.SausageResource;
import com.tito.api.TeamResource;
import com.tito.repository.SausageRepository;
import com.tito.repository.TeamRepository;
import com.tito.service.JwtService;
import com.tito.service.SausageService;
import com.tito.service.TeamService;

public class TitoBinder extends AbstractBinder {
	// Repositories
	private SausageRepository sausageRepository = new SausageRepository();
	private TeamRepository teamRepository = new TeamRepository();
	// Services
	private JwtService jwtService = new JwtService();
	private SausageService sausageService = new SausageService(sausageRepository, jwtService);
	private TeamService teamService = new TeamService(teamRepository, jwtService);
	// Resources
	private SausageResource sausageResource = new SausageResource(sausageService);
	private TeamResource teamResource = new TeamResource(teamService, jwtService);

	@Override
    protected void configure() {
    	// Repositories
        bind(sausageRepository).to(SausageRepository.class);
        bind(teamRepository).to(TeamRepository.class);
        // Services
        bind(jwtService).to(JwtService.class);
        bind(sausageService).to(SausageService.class);
        bind(teamService).to(TeamService.class);
        // Resources
        bind(sausageResource).to(SausageResource.class);
        bind(teamResource).to(TeamResource.class);
    }
}