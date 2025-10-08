package com.tradehub.order_service.service;

import com.tradehub.order_service.model.Order;
import com.tradehub.order_service.model.OrderItem;
import com.tradehub.order_service.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final RestTemplate restTemplate;

    private final String PRODUCT_SERVICE_URL = "http://localhost:8093/api/products";
    private final String SELLER_SERVICE_URL = "http://localhost:8095/api/sellers/internal/sellers";

    public OrderService(OrderRepository orderRepository, RestTemplate restTemplate) {
        this.orderRepository = orderRepository;
        this.restTemplate = restTemplate;
    }

    public Order placeOrder(Long customerId, double customerLat, double customerLon, List<OrderItem> items) {
        double totalItemsSubtotal = 0;
        double totalDiscount = 0;
        Map<Long, Double> sellerDeliveryCharges = new HashMap<>();

        for (OrderItem item : items) {
            // Fetch product
            ProductDto product = restTemplate.getForObject(PRODUCT_SERVICE_URL + "/" + item.getProductId(), ProductDto.class);
            if (product == null) throw new RuntimeException("Invalid productId: " + item.getProductId());

            if (product.getStock() < item.getQuantity())
                throw new RuntimeException("Insufficient stock for product: " + product.getName());

            // Deduct stock in ProductService
            product.setStock(product.getStock() - item.getQuantity());
            restTemplate.put(PRODUCT_SERVICE_URL + "/" + product.getId(), product);

            item.setSellerId(product.getSellerId());
            item.setProductName(product.getName());
            item.setPrice(product.getPrice());
            item.setTotal(product.getPrice() * item.getQuantity() - (item.getDiscount() != null ? item.getDiscount() : 0));

            totalItemsSubtotal += item.getPrice() * item.getQuantity();
            totalDiscount += (item.getDiscount() != null ? item.getDiscount() : 0);

            // Delivery charge per seller
            if (!sellerDeliveryCharges.containsKey(product.getSellerId())) {
                SellerDto seller = restTemplate.getForObject(SELLER_SERVICE_URL + "/" + product.getSellerId(), SellerDto.class);
                if (seller == null) throw new RuntimeException("Seller not found: " + product.getSellerId());

                double distanceKm = calculateDistance(customerLat, customerLon, seller.getLatitude(), seller.getLongitude());
                double deliveryCharge = distanceKm * seller.getDeliveryChargePerKm();
                sellerDeliveryCharges.put(seller.getId(), deliveryCharge);
            }
        }

        double totalDelivery = sellerDeliveryCharges.values().stream().mapToDouble(Double::doubleValue).sum();
        double totalAmount = totalItemsSubtotal + totalDelivery - totalDiscount;

        Order order = Order.builder()
                .customerId(customerId)
                .orderDate(LocalDateTime.now())
                .totalItemsSubtotal(totalItemsSubtotal)
                .totalDelivery(totalDelivery)
                .totalDiscount(totalDiscount)
                .totalAmount(totalAmount)
                .status("PENDING")
                .items(items)
                .build();

        for (OrderItem item : items) item.setOrder(order);

        return orderRepository.save(order);
    }

    public List<Order> getOrdersByCustomer(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    public Order confirmOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus("CONFIRMED");
        return orderRepository.save(order);
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371;
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }


    public List<Order> getOrdersBySeller(Long sellerId) {
    
    return orderRepository.findOrdersBySellerId(sellerId);
}


    // --- DTOs ---
    private static class ProductDto {
        private Long id;
        private String name;
        private Double price;
        private int stock;
        private Long sellerId;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public Double getPrice() { return price; }
        public void setPrice(Double price) { this.price = price; }
        public int getStock() { return stock; }
        public void setStock(int stock) { this.stock = stock; }
        public Long getSellerId() { return sellerId; }
        public void setSellerId(Long sellerId) { this.sellerId = sellerId; }
    }

    private static class SellerDto {
        private Long id;
        private double latitude;
        private double longitude;
        private double deliveryChargePerKm;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public double getLatitude() { return latitude; }
        public void setLatitude(double latitude) { this.latitude = latitude; }
        public double getLongitude() { return longitude; }
        public void setLongitude(double longitude) { this.longitude = longitude; }
        public double getDeliveryChargePerKm() { return deliveryChargePerKm; }
        public void setDeliveryChargePerKm(double deliveryChargePerKm) { this.deliveryChargePerKm = deliveryChargePerKm; }
    }


}
