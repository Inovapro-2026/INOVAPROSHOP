# Security Specification - FreelancePro Marketplace

## Data Invariants
1. A **User** document path must match their `request.auth.uid`.
2. A **Product** or **Service** can only be created by a user with the `seller` role.
3. An **Order** must have a status from the allowed enum.
4. During an **Order** creation, the `buyerId` must match the authenticated user.
5. Users cannot change their own `role` after the first creation (immutability).

## The "Dirty Dozen" Payloads (Denial Tests)
1. Creating a user profile with `role: 'admin'` as a normal user.
2. Creating a product with `price: -10`.
3. Updating someone else's product.
4. Reading all orders without being the buyer or seller.
5. Creating an order where `buyerId` is different from `request.auth.uid`.
6. Updating an order's `status` from `delivered` to `pending`.
7. Injecting a 2MB string into a product's `description`.
8. Deleting a user profile that isn't yours.
9. Listing products and seeing $fileURL (if it's private metadata).
10. Spoofing `createdAt` with a client-side date.
11. Updating a product's `sellerId`.
12. Creating a product with an ID that is 500 characters long.

## Firestore Rules Implementation Strategy
- Use `isValidUser`, `isValidProduct`, `isValidOrder`.
- Use `hasOnly()` for specific action-based updates.
- All timestamps must be `request.time`.
