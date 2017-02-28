package com.tito.config;

import org.glassfish.hk2.utilities.binding.AbstractBinder;

import com.tito.repository.SausageRepository;
import com.tito.repository.SausageRepositoryStub;
import com.tito.repository.TeamRepository;
import com.tito.repository.TeamRepositoryStub;
import com.tito.service.JwtService;

public class TitoBinder extends AbstractBinder {
	// Repositories
	private SausageRepository sausageRepository = new SausageRepositoryStub();
	private TeamRepository teamRepository = new TeamRepositoryStub();
	// Services
	private JwtService jwtService = new JwtService();

	@Override
    protected void configure() {
    	// Repositories
        bind(sausageRepository).to(SausageRepository.class);
        bind(teamRepository).to(TeamRepository.class);
        // Services
        bind(jwtService).to(JwtService.class);
    }
}