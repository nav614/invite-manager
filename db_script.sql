CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, 
    is_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE invites (
    id SERIAL PRIMARY KEY,
    inviter_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    invitee_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_accepted BOOLEAN DEFAULT FALSE,
    is_pending BOOLEAN DEFAULT TRUE,
    permissions TEXT[] NOT NULL, 
    expiration_date TIMESTAMP,  
    invite_date TIMESTAMP DEFAULT NOW(),
    accepted_at TIMESTAMP
);