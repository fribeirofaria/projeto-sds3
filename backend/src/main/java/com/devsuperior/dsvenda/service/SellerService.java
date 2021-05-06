package com.devsuperior.dsvenda.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devsuperior.dsvenda.dto.SellerDTO;
import com.devsuperior.dsvenda.entities.Seller;
import com.devsuperior.dsvenda.repositories.SellersRepository;

@Service	
public class SellerService {

	@Autowired
	private SellersRepository repository;
	
	public List<SellerDTO> findAll() {
		List<Seller> result =  repository.findAll();
		return result.stream().map(x -> new SellerDTO(x)).collect(Collectors.toList()); 	
	}
}
