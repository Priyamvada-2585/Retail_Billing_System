package com.example.retail_billing.repository;

import com.example.retail_billing.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<Bill, Long> {
}