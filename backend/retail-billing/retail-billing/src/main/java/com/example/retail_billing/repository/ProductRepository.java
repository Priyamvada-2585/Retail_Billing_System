package com.example.retail_billing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.retail_billing.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}