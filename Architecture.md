# For chat application why mongoose over postgress 
  - If choosed postgress for every feature upgrade i needed to write a join, there table was not flexible, 
  - In mongoose write is faster compares to postgress. 

# Architectue of project 
  - 1 thread per user pair, permanent across time
  - Redis for volatile stuff, never in Mongo
  - Messages tied to room, Always use thread
  - Pagination, Cursor-based
  - Security checks, Mandatory per request/socket
  - Archive/delete, Soft flags only
  - Device mapping, Separate Redis map


# Flow of user behaviour(online/offline)
  