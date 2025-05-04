# rocono apis

## User Data

- **Endpoint:**  
  `GET https://rocono.xyz/apisite/users/v1/users/[userId]`

- **Response Data:**
  ```json
  {
    "id": [userId],
    "name": "string",
    "displayName": "string",
    "description": "string",
    "created": "date",
    "isBanned": false,
    "postCount": 0,
    "discord": "[discordId]",
    "staffStatus": false,
    "placeVisits": 0,
    "headerBadge": Badges
  }
  ```

---

## User Avatar

- **Endpoint:**  
  `GET https://rocono.xyz/apisite/thumbnails/v1/users/avatar?userIds=[userId]&size=420x420&format=png`

- **Response Data:**
  ```json
  {
    "data": [UserAvatarInfos]
  }
  ```

---

## User Avatar (Headshot)

- **Endpoint:**  
  `GET https://rocono.xyz/apisite/thumbnails/v1/users/avatar-headshot?userIds=[userId]&size=420x420&format=png`

- **Response Data:**
  ```json
  {
    "data": [UserAvatarInfos]
  }
  ```
