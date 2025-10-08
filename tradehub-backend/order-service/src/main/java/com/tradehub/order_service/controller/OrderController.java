package com.tradehub.order_service.controller;

import com.tradehub.order_service.model.Order;
import com.tradehub.order_service.model.OrderItem;
import com.tradehub.order_service.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    
    @PostMapping
    public Order placeOrder(@RequestParam Long customerId,
                            @RequestParam double customerLat,
                            @RequestParam double customerLon,
                            @RequestBody List<OrderItem> items) {
        return orderService.placeOrder(customerId, customerLat, customerLon, items);
    }

    
    @GetMapping
    public List<Order> getOrdersByCustomer(@RequestParam Long customerId) {
        return orderService.getOrdersByCustomer(customerId);
    }

    @PutMapping("/{orderId}/confirm")
    public Order confirmOrder(@PathVariable Long orderId) {
    return orderService.confirmOrder(orderId);
}

    @GetMapping("/seller/{sellerId}")
    public List<Order> getOrdersBySeller(@PathVariable Long sellerId) {
    return orderService.getOrdersBySeller(sellerId);
}

}
