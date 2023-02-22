CREATE TABLE members(
	id VARCHAR(100) PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE,
	pfp VARCHAR(255) NOT NULL,
	required_count TINYINT UNSIGNED NOT NULL,
	extra_count TINYINT UNSIGNED NOT NULL,
	taken BOOLEAN NOT NULL
);

INSERT INTO members (id, name, pfp, required_count, extra_count, taken)
VALUES 
	('250957620930805761', 'Jojo', 'https://cdn.discordapp.com/avatars/250957620930805761/ff6bc719ccc1366340495e4ecb958cda.webp?size=160', 0, 0, FALSE),
	('210556882442518528', 'Mykel', 'https://cdn.discordapp.com/avatars/210556882442518528/7d6101dcf27e434b42d8ecc306ab4f3a.webp?size=160', 0, 0, FALSE),
	('709446231331700767', 'Sid', 'https://cdn.discordapp.com/avatars/709446231331700767/1495e9a2846a2b9287deef15bf8c6999.webp?size=160', 0, 0, FALSE),
	('286999428492165124', 'Wild', 'https://cdn.discordapp.com/avatars/286999428492165124/3d0ec6ac79b5f07a98c9efd9373241c9.webp?size=160', 0, 0, FALSE)