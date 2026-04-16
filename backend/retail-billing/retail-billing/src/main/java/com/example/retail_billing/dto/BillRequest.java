package com.example.retail_billing.dto;

import java.util.List;

public class BillRequest {
    private Long customerId;
    private double discount;
    private List<BillItemRequest> items;

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public double getDiscount() { return discount; }
    public void setDiscount(double discount) { this.discount = discount; }

    public List<BillItemRequest> getItems() { return items; }
    public void setItems(List<BillItemRequest> items) { this.items = items; }
}