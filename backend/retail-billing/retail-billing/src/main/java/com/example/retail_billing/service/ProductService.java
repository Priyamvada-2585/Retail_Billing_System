package com.example.retail_billing.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.retail_billing.entity.Product;
import com.example.retail_billing.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repo;

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product addProduct(Product p) {
        return repo.save(p);
    }

    public void deleteProduct(Long id) {
        repo.deleteById(id);
    }
}