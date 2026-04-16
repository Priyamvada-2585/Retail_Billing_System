package com.example.retail_billing.service;

import com.example.retail_billing.dto.BillItemRequest;
import com.example.retail_billing.dto.BillRequest;
import com.example.retail_billing.entity.*;
import com.example.retail_billing.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BillingService {

    @Autowired
    private BillRepository billRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private CustomerRepository customerRepo;

    public Bill createBill(BillRequest request) {
        Bill bill = new Bill();

        // Set customer
        Customer customer = customerRepo.findById(request.getCustomerId()).orElseThrow();
        bill.setCustomer(customer);

        // Build bill items
        List<BillItem> billItems = new ArrayList<>();
        double total = 0;

        for (BillItemRequest itemReq : request.getItems()) {
            Product product = productRepo.findById(itemReq.getProductId()).orElseThrow();

            // Reduce stock
            product.setQuantity(product.getQuantity() - itemReq.getQuantity());
            productRepo.save(product);

            BillItem billItem = new BillItem();
            billItem.setProduct(product);
            billItem.setQuantity(itemReq.getQuantity());
            billItem.setPriceAtBilling(product.getPrice());
            billItem.setSubtotal(product.getPrice() * itemReq.getQuantity());
            billItem.setBill(bill);

            total += billItem.getSubtotal();
            billItems.add(billItem);
        }

        // Apply discount and GST (18%)
        double discount = request.getDiscount();
        double afterDiscount = total - discount;
        double gst = afterDiscount * 0.18;
        double finalAmount = afterDiscount + gst;

        bill.setTotalAmount(total);
        bill.setDiscount(discount);
        bill.setGst(gst);
        bill.setFinalAmount(finalAmount);
        bill.setItems(billItems);

        return billRepo.save(bill);
    }

    public List<Bill> getAllBills() {
        return billRepo.findAll();
    }

    public Bill getBillById(Long id) {
        return billRepo.findById(id).orElseThrow();
    }
}