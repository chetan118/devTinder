# Episode-14 |Building Feed API & Pagination

## TODOs

- Logic for GET /user/feed API
- Explore the $nin, $and, $ne and other query operators
- Implement Pagination

## Pagination

- /user/feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)
- /user/feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)
- /user/feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)
