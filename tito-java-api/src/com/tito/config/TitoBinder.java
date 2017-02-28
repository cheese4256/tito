package com.tito.config;

import org.glassfish.hk2.utilities.binding.AbstractBinder;

import com.tito.db.DbConnection;
import com.tito.db.MySqlConnection;
import com.tito.repository.SausageRepository;
import com.tito.repository.SausageRepositoryStub;
import com.tito.repository.TeamRepository;
import com.tito.repository.TeamRepositoryStub;
import com.tito.service.JwtService;
import com.tito.service.SausageService;

public class TitoBinder extends AbstractBinder {
	// Miscellaneous
	private DbConnection dbConnection = new MySqlConnection();
	// Repositories
	private SausageRepository sausageRepository = new SausageRepositoryStub();
	private TeamRepository teamRepository = new TeamRepositoryStub();
	// Services
	private JwtService jwtService = new JwtService();
	private SausageService sausageService = new SausageService(dbConnection);

	@Override
    protected void configure() {
    	// Repositories
        bind(sausageRepository).to(SausageRepository.class);
        bind(teamRepository).to(TeamRepository.class);
        // Services
        bind(jwtService).to(JwtService.class);
        bind(sausageService).to(SausageService.class);
        // Miscellaneous
        bind(dbConnection).to(DbConnection.class);
    }
}