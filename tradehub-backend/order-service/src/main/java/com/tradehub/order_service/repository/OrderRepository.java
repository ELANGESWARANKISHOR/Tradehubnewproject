package com.tradehub.order_service.repository;

import com.tradehub.order_service.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    
    List<Order> findByCustomerId(Long customerId);

    @Query("SELECT DISTINCT o FROM Order o JOIN o.items i WHERE i.sellerId = :sellerId")
    List<Order> findOrdersBySellerId(@Param("sellerId") Long sellerId);
}
