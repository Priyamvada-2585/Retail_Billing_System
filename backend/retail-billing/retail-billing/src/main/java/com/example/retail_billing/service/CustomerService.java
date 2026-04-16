package com.example.retail_billing.service;

import com.example.retail_billing.entity.Customer;
import com.example.retail_billing.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository repo;

    public List<Customer> getAllCustomers() {
        return repo.findAll();
    }

    public Customer addCustomer(Customer c) {
        return repo.save(c);
    }

    public Customer updateCustomer(Long id, Customer updated) {
        Customer existing = repo.findById(id).orElseThrow();
        existing.setName(updated.getName());
        existing.setPhone(updated.getPhone());
        existing.setEmail(updated.getEmail());
        return repo.save(existing);
    }

    public void deleteCustomer(Long id) {
        repo.deleteById(id);
    }
}