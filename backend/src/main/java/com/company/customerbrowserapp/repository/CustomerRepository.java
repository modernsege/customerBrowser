package com.company.customerbrowserapp.repository;

import com.company.customerbrowserapp.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    public Page<Customer> findAll(Pageable pageable);

    @Query(value = "SELECT * FROM customers c WHERE c.email = ?1", nativeQuery = true)
    Optional<Customer> findCustomerByEmail(String email);
}
