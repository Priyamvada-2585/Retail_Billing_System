package com.example.retail_billing.controller;

import com.example.retail_billing.dto.BillRequest;
import com.example.retail_billing.entity.Bill;
import com.example.retail_billing.service.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin
public class BillingController {

    @Autowired
    private BillingService service;

    @PostMapping
    public Bill createBill(@RequestBody BillRequest request) {
        return service.createBill(request);
    }

    @GetMapping
    public List<Bill> getAllBills() {
        return service.getAllBills();
    }

    @GetMapping("/{id}")
    public Bill getBillById(@PathVariable Long id) {
        return service.getBillById(id);
    }
}