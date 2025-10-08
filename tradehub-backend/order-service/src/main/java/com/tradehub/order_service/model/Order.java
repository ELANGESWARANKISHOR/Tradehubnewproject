package com.tradehub.order_service.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customerId; // user who placed the order

    private LocalDateTime orderDate;

    private Double totalItemsSubtotal;

    private Double totalDelivery;

    private Double totalDiscount;

    private Double totalAmount;

    private String status; // (PENDING, CONFIRMED, DELIVERED)

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<OrderItem> items;

}
