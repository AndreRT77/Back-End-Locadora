CREATE TABLE tbl_filme(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(100) NOT NULL,
sinopse TEXT NULL,
data_lancamento DATE NULL,
duracao TIME NOT NULL,
orcamento DECIMAL (13,2) NOT NULL,
trailer VARCHAR (200) NULL,
capa VARCHAR (200) NOT NULL
);

INSERT INTO tbl_filme (
    nome,
    sinopse,
    data_lancamento,
    duracao,
    orcamento,
    trailer,
    capa
) VALUES
(
    'A Lenda do Cavaleiro Sem Cabeça',
    'No século XVIII, um detetive é enviado para a pequena vila de Sleepy Hollow para investigar uma série de assassinatos cometidos por um misterioso cavaleiro sem cabeça.',
    '1999-11-19',
    '01:45:00',
    100000000.00,
    'https://www.youtube.com/watch?v=6RsKwn_-Adg',
    'https://www.impawards.com/1999/sleepy_hollow_ver1.jpg'
),
(
    'A Colina Escarlate',
    'Após se casar com um misterioso inventor, uma jovem escritora se muda para uma mansão isolada onde começa a descobrir segredos sombrios e fantasmas do passado.',
    '2015-10-16',
    '01:59:00',
    55000000.00,
    'https://www.youtube.com/watch?v=7URe9-8H7mY',
    'https://www.impawards.com/2015/crimson_peak_ver3.jpg'
);

select * from tbl_filme; 

/*************************************************************
**************************************************************/


UPDATE tbl_filme
SET sinopse = 'Depois de uma tragédia familiar, uma aspirante a escritora se vê dividida entre o amor por seu amigo de infância e a tentação de um estranho misterioso. Tentando escapar dos fantasmas de seu passado, ela é arrastada para uma casa que respira, sangra e lembra.'
WHERE id =  2;

CREATE TABLE tbl_filme_genero (
	id int PRIMARY KEY AUTO_INCREMENT,
	id_filme int NOT NULL,
    id_genero int NOT NULL,
    FOREIGN KEY (id_filme) REFERENCES tbl_filme(id),
    FOREIGN KEY (id_genero) REFERENCES tbl_genero(id)
);

CREATE TABLE tbl_classificacao(
	id int PRIMARY KEY AUTO_INCREMENT,
	nivel VARCHAR(3) NOT NULL,
    descricao TEXT NULL
);
tbl_cargotbl_cargo
drop table tbl_filme_generotbl_genero;


select * from tbl_distribuidora;

INSERT INTO tbl_distribuidora (distribuidora_id, nome, site)
VALUES
(1, 'Warner Bros. Pictures', 'https://www.warnerbros.com'),
(2, 'Universal Pictures', 'https://www.universalpictures.com'),
(3, 'Paramount Pictures', 'https://www.paramount.com'),
(4, 'Sony Pictures', 'https://www.sonypictures.com'),
(5, '20th Century Studios', 'https://www.20thcenturystudios.com'),
(6, 'Netflix', 'https://www.netflix.com'),
(7, 'Amazon Studios', 'https://www.amazonstudios.com'),
(8, 'Lionsgate', 'https://www.lionsgate.com'),
(9, 'DreamWorks Pictures', 'https://www.dreamworks.com'),
(10, 'Pixar Animation Studios', 'https://www.pixar.com');


ALTER TABLE tbl_distribuidora
CHANGE COLUMN distribuidora_id id INT NOT NULL AUTO_INCREMENT;



----------



CREATE TABLE tbl_genero(
    genero_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(100) NOT NULL UNIQUE
);
ALTER TABLE tbl_genero
CHANGE COLUMN id genero_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL;
ALTER TABLE tbl_genero RENAME COLUMN id TO genero_id;

CREATE TABLE tbl_profissional(
    profissional_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(500) NOT NULL,
    nacionalidade VARCHAR(200) NOT NULL,
    biografia TEXT NULL
);

CREATE TABLE tbl_cargo(
    cargo_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT NULL
);

CREATE TABLE tbl_distribuidora(
    distribuidora_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(100) NOT NULL UNIQUE,
    site VARCHAR(200) NOT NULL
);

CREATE TABLE tbl_personagem(
    personagem_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT NULL
);

CREATE TABLE tbl_formato_audiovisual(
    formato_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE tbl_filme(
    filme_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    sinopse TEXT NULL,
    data_lancamento DATE NULL,
    duracao TIME NULL,
    orcamento DECIMAL(13,2) NOT NULL,
    trailer VARCHAR(200) NULL,
    capa VARCHAR(200) NOT NULL
);

CREATE TABLE tbl_genero_filme(
    genero_filme_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    genero_id INT NOT NULL,
    filme_id INT NOT NULL,
    FOREIGN KEY (id) REFERENCES tbl_genero(id) ON DELETE CASCADE,
    FOREIGN KEY (filme_id) REFERENCES tbl_filme(filme_id) ON DELETE CASCADE,
    UNIQUE (id, filme_id)
);

CREATE TABLE tbl_personagem_filme(
    personagem_filme_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    personagem_id INT NOT NULL,
    filme_id INT NOT NULL,
    FOREIGN KEY (personagem_id) REFERENCES tbl_personagem(personagem_id) ON DELETE CASCADE,
    FOREIGN KEY (filme_id) REFERENCES tbl_filme(filme_id) ON DELETE CASCADE,
    UNIQUE (personagem_id, filme_id)
);

CREATE TABLE tbl_cargo_profissional(
    cargo_profissional_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    profissional_id INT NOT NULL,
    cargo_id INT NOT NULL,
    FOREIGN KEY (profissional_id) REFERENCES tbl_profissional(profissional_id) ON DELETE CASCADE,
    FOREIGN KEY (cargo_id) REFERENCES tbl_cargo(cargo_id) ON DELETE CASCADE,
    UNIQUE (profissional_id, cargo_id)
);

CREATE TABLE tbl_distribuidora_filme(
    distribuidora_filme_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    distribuidora_id INT NOT NULL,
    filme_id INT NOT NULL,
    FOREIGN KEY (distribuidora_id) REFERENCES tbl_distribuidora(distribuidora_id) ON DELETE CASCADE,
    FOREIGN KEY (filme_id) REFERENCES tbl_filme(filme_id) ON DELETE CASCADE,
    UNIQUE (distribuidora_id, filme_id)
);

CREATE TABLE tbl_formato_filme(
    formato_filme_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    formato_id INT NOT NULL,
    filme_id INT NOT NULL,
    FOREIGN KEY (formato_id) REFERENCES tbl_formato_audiovisual(formato_id) ON DELETE CASCADE,
    FOREIGN KEY (filme_id) REFERENCES tbl_filme(filme_id) ON DELETE CASCADE,
    UNIQUE (formato_id, filme_id)
);

CREATE TABLE tbl_producao(
    producao_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    filme_id INT NOT NULL,
    profissional_id INT NOT NULL,
    cargo_id INT NOT NULL,
    FOREIGN KEY (filme_id) REFERENCES tbl_filme(filme_id) ON DELETE CASCADE,
    FOREIGN KEY (profissional_id) REFERENCES tbl_profissional(profissional_id) ON DELETE CASCADE,
    FOREIGN KEY (cargo_id) REFERENCES tbl_cargo(cargo_id) ON DELETE CASCADE,
    UNIQUE (filme_id, profissional_id, cargo_id)
);

CREATE TABLE tbl_ator(
    ator_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    profissional_id INT NOT NULL,
    personagem_id INT NOT NULL,
    filme_id INT NOT NULL,
    FOREIGN KEY (profissional_id) REFERENCES tbl_profissional(profissional_id) ON DELETE CASCADE,
    FOREIGN KEY (personagem_id) REFERENCES tbl_personagem(personagem_id) ON DELETE CASCADE,
    FOREIGN KEY (filme_id) REFERENCES tbl_filme(filme_id) ON DELETE CASCADE,
    UNIQUE (profissional_id, personagem_id, filme_id)
);
INSERT INTO tbl_genero (nome) VALUES
    ('Ação'),
    ('Aventura'),
    ('Comédia'),
    ('Drama'),
    ('Ficção Científica'),
    ('Terror'),
    ('Romance'),
    ('Documentário'),
    ('Animação'),
    ('Suspense');


INSERT INTO tbl_profissional (nome, nacionalidade, biografia) VALUES
    ('Tim Burton', 'Americano', 'Diretor conhecido por filmes góticos e excêntricos.'),
    ('Johnny Depp', 'Americano', 'Ator famoso por papéis excêntricos e colaborações com Tim Burton.'),
    ('Helena Bonham Carter', 'Britânica', 'Atriz conhecida por papéis em filmes de época e colaborações com Tim Burton.'),
    ('Guillermo del Toro', 'Mexicano', 'Diretor e roteirista aclamado por filmes de fantasia sombria.'),
    ('Mia Wasikowska', 'Australiana', 'Atriz conhecida por papéis em filmes independentes e de fantasia.'),
    ('Tom Hiddleston', 'Britânico', 'Ator conhecido por interpretar Loki no MCU.'),
    ('Jessica Chastain', 'Americana', 'Atriz vencedora do Oscar, conhecida por papéis intensos.'),
    ('Leonardo DiCaprio', 'Americano', 'Ator e produtor, vencedor do Oscar.'),
    ('Christopher Nolan', 'Britânico', 'Diretor e roteirista conhecido por filmes complexos e não lineares.'),
    ('Quentin Tarantino', 'Americano', 'Diretor e roteirista conhecido por filmes estilizados e diálogos marcantes.'),
    ('Steven Spielberg', 'Americano', 'Um dos diretores mais renomados da história do cinema.'),
    ('Meryl Streep', 'Americana', 'Atriz com o maior número de indicações ao Oscar na história.'),
    ('Denzel Washington', 'Americano', 'Ator e diretor, vencedor de múltiplos prêmios Oscar.'),
    ('Sofia Coppola', 'Americana', 'Diretora e roteirista, conhecida por seu estilo visual distinto.'),
    ('Brad Pitt', 'Americano', 'Ator e produtor, um dos nomes mais influentes de Hollywood.');


INSERT INTO tbl_cargo (nome, descricao) VALUES
    ('Diretor', 'Responsável pela direção artística e técnica do filme.'),
    ('Ator', 'Interpreta personagens no filme.'),
    ('Roteirista', 'Escreve o roteiro do filme.'),
    ('Produtor', 'Gerencia a produção e finanças do filme.'),
    ('Editor', 'Monta e edita o filme.'),
    ('Diretor de Fotografia', 'Responsável pela estética visual do filme.'),
    ('Compositor', 'Cria a trilha sonora do filme.'),
    ('Designer de Produção', 'Responsável pelo visual dos cenários e ambientes.');


INSERT INTO tbl_distribuidora (nome, site) VALUES
    ('Warner Bros.', 'https://www.warnerbros.com'),
    ('Universal Pictures', 'https://www.universalpictures.com'),
    ('20th Century Fox', 'https://www.20thcenturyfox.com'),
    ('Paramount Pictures', 'https://www.paramount.com'),
    ('Sony Pictures', 'https://www.sonypictures.com'),
    ('Walt Disney Studios', 'https://www.disneystudios.com'),
    ('Lionsgate', 'https://www.lionsgate.com'),
    ('Netflix', 'https://www.netflix.com');


INSERT INTO tbl_personagem (nome, descricao) VALUES
    ('Ichabod Crane', 'Detetive de Nova York enviado para Sleepy Hollow.'),
    ('Lady Lucille Sharpe', 'A misteriosa irmã de Thomas Sharpe.'),
    ('Edith Cushing', 'Jovem escritora americana que se casa com Thomas Sharpe.'),
    ('Thomas Sharpe', 'Baronete inglês, marido de Edith.'),
    ('Capitão Jack Sparrow', 'Pirata excêntrico e carismático.'),
    ('Edward Mãos de Tesoura', 'Jovem artificial com tesouras no lugar das mãos.'),
    ('Willy Wonka', 'Excêntrico dono de uma fábrica de chocolates.'),
    ('Rainha de Copas', 'Monarca tirana do País das Maravilhas.'),
    ('Loki', 'Deus da trapaça e irmão adotivo de Thor.'),
    ('Hulk', 'Cientista que se transforma em um monstro verde gigante.'),
    ('Homem de Ferro', 'Gênio, bilionário, playboy, filantropo com uma armadura de alta tecnologia.'),
    ('Capitão América', 'Soldado da Segunda Guerra Mundial transformado em super-soldado.'),
    ('Viúva Negra', 'Ex-espiã russa e membro dos Vingadores.'),
    ('Pantera Negra', 'Rei de Wakanda e super-herói.'),
    ('Doutor Estranho', 'Neurocirurgião que se torna Mago Supremo.');


INSERT INTO tbl_formato_audiovisual (nome) VALUES
    ('DVD'),
    ('Blu-ray'),
    ('Digital HD'),
    ('4K Ultra HD'),
    ('VHS');


INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa) VALUES
    ('A Lenda do Cavaleiro Sem Cabeça', 'No século XVIII, um detetive é enviado para a pequena vila de Sleepy Hollow para investigar uma série de assassinatos cometidos por um misterioso cavaleiro sem cabeça.', '1999-11-19', '01:45:00', 100000000.00, 'https://www.youtube.com/watch?v=6RsKwn_-Adg', 'https://www.impawards.com/1999/sleepy_hollow_ver1.jpg'),
    ('A Colina Escarlate', 'Após se casar com um misterioso inventor, uma jovem escritora se muda para uma mansão isolada onde começa a descobrir segredos sombrios e fantasmas do passado.', '2015-10-16', '01:59:00', 55000000.00, 'https://www.youtube.com/watch?v=7URe9-8H7mY', 'https://www.impawards.com/2015/crimson_peak_ver3.jpg'),
    ('Piratas do Caribe: A Maldição do Pérola Negra', 'O ferreiro Will Turner se une ao excêntrico Capitão Jack Sparrow para resgatar sua amada Elizabeth Swann, que foi sequestrada por piratas amaldiçoados.', '2003-09-05', '02:23:00', 140000000.00, 'https://www.youtube.com/watch?v=na_XoOq4s9s', 'https://www.impawards.com/2003/pirates_of_the_caribbean_ver1.jpg'),
    ('Edward Mãos de Tesoura', 'Um jovem artificial com tesouras no lugar das mãos é acolhido por uma família suburbana, mas sua natureza única causa fascínio e medo.', '1990-12-07', '01:45:00', 20000000.00, 'https://www.youtube.com/watch?v=M9oN_g236gM', 'https://www.impawards.com/1990/edward_scissorhands.html'),
    ('A Fantástica Fábrica de Chocolate', 'Charlie Bucket, um menino pobre, ganha um bilhete dourado para visitar a misteriosa fábrica de chocolates de Willy Wonka.', '2005-07-15', '01:55:00', 150000000.00, 'https://www.youtube.com/watch?v=OFV0Y9z_g94', 'https://www.impawards.com/2005/charlie_and_the_chocolate_factory.html'),
    ('Alice no País das Maravilhas', 'Alice, agora com 19 anos, retorna ao País das Maravilhas para cumprir seu destino e acabar com o reinado da Rainha Vermelha.', '2010-03-05', '01:48:00', 200000000.00, 'https://www.youtube.com/watch?v=9_iM8y_d29k', 'https://www.impawards.com/2010/alice_in_wonderland.html'),
    ('Thor: Ragnarok', 'Thor é aprisionado do outro lado do universo e descobre que seu lar, Asgard, está ameaçado pela poderosa Hela. Ele deve lutar para sobreviver e salvar seu povo.', '2017-10-26', '02:10:00', 180000000.00, 'https://www.youtube.com/watch?v=v7MGUNV8MxU', 'https://www.impawards.com/2017/thor_ragnarok.html'),
    ('Doutor Estranho', 'Um neurocirurgião arrogante tem sua vida virada de cabeça para baixo após um acidente que o impede de usar as mãos. Ele embarca em uma jornada de cura que o leva a se tornar um mestre das artes místicas.', '2016-11-03', '01:55:00', 165000000.00, 'https://www.youtube.com/watch?v=LtP62K2f22o', 'https://www.impawards.com/2016/doctor_strange.html');


INSERT INTO tbl_genero_filme (genero_id, filme_id) VALUES
    (6, 1),
    (6, 2),
    (7, 2),
    (1, 3),
    (2, 3),
    (7, 4),
    (5, 4),
    (2, 5),
    (3, 5),
    (2, 6),
    (5, 6),
    (1, 7),
    (5, 7),
    (1, 8),
    (5, 8);


INSERT INTO tbl_personagem_filme (personagem_id, filme_id) VALUES
    (1, 1),
    (2, 2),
    (3, 2),
    (4, 2),
    (5, 3),
    (6, 4),
    (7, 5),
    (8, 6),
    (9, 7),
    (15, 8);


INSERT INTO tbl_cargo_profissional (profissional_id, cargo_id) VALUES
    (1, 1),
    (2, 2),
    (3, 2),
    (4, 1),
    (5, 2),
    (6, 2),
    (7, 2),
    (8, 2),
    (9, 1),
    (10, 1),
    (11, 1),
    (12, 2),
    (13, 2),
    (14, 1),
    (15, 2);


INSERT INTO tbl_distribuidora_filme (distribuidora_id, filme_id) VALUES
    (1, 1),
    (2, 2),
    (6, 3),
    (2, 4),
    (1, 5),
    (6, 6),
    (6, 7),
    (6, 8);


INSERT INTO tbl_formato_filme (formato_id, filme_id) VALUES
    (1, 1),
    (2, 1),
    (2, 2),
    (3, 2),
    (2, 3),
    (4, 3),
    (1, 4),
    (2, 4),
    (1, 5),
    (2, 5),
    (3, 5),
    (2, 6),
    (4, 6),
    (2, 7),
    (3, 7),
    (4, 7),
    (2, 8),
    (3, 8),
    (4, 8);


INSERT INTO tbl_producao (filme_id, profissional_id, cargo_id) VALUES
    (1, 1, 1),
    (2, 4, 1),
    (3, 11, 1),
    (4, 1, 1),
    (5, 1, 1),
    (6, 1, 1),
    (7, 9, 1),
    (8, 9, 1),
    (1, 2, 2),
    (2, 3, 2),
    (2, 5, 2),
    (3, 2, 2),
    (4, 2, 2),
    (5, 2, 2),
    (6, 2, 2),
    (7, 6, 2),
    (8, 6, 2);


INSERT INTO tbl_ator (profissional_id, personagem_id, filme_id) VALUES
    (2, 1, 1),
    (3, 2, 2),
    (5, 3, 2),
    (2, 5, 3),
    (2, 6, 4),
    (2, 7, 5),
    (3, 8, 6),
    (6, 9, 7),
    (6, 15, 8);


--------------------------------------------------


SELECT `tbl_filme`.`id`,
    `tbl_filme`.`nome`,
    `tbl_filme`.`sinopse`,
    `tbl_filme`.`data_lançamento`,
    `tbl_filme`.`duração`,
    `tbl_filme`.`orçamento`,
    `tbl_filme`.`trailer`,
    `tbl_filme`.`capa`
FROM `db_locadora_filme_ds2m_25_2`.`tbl_filme`;


show tables;

drop table tbl_teste;

CREATE TABLE tbl_filme(
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(100) NOT NULL,
sinopse TEXT NULL,
data_lancamento DATE NULL,
duracao TIME NOT NULL,
orcamento DECIMAL (13,2) NOT NULL,
trailer VARCHAR (200) NULL,
capa VARCHAR (200) NOT NULL
);

INSERT INTO tbl_filme (
    nome,
    sinopse,
    data_lancamento,
    duracao,
    orcamento,
    trailer,
    capa
) VALUES
(
    'A Lenda do Cavaleiro Sem Cabeça',
    'No século XVIII, um detetive é enviado para a pequena vila de Sleepy Hollow para investigar uma série de assassinatos cometidos por um misterioso cavaleiro sem cabeça.',
    '1999-11-19',
    '01:45:00',
    100000000.00,
    'https://www.youtube.com/watch?v=6RsKwn_-Adg',
    'https://www.impawards.com/1999/sleepy_hollow_ver1.jpg'
),
(
    'A Colina Escarlate',
    'Após se casar com um misterioso inventor, uma jovem escritora se muda para uma mansão isolada onde começa a descobrir segredos sombrios e fantasmas do passado.',
    '2015-10-16',
    '01:59:00',
    55000000.00,
    'https://www.youtube.com/watch?v=7URe9-8H7mY',
    'https://www.impawards.com/2015/crimson_peak_ver3.jpg'
);



ALTER TABLE tbl_filme
CHANGE `data_lançamento` data_lancamento DATE,
CHANGE `duração` duracao TIME NOT NULL,
CHANGE `orçamento` orcamento DECIMAL(13,2) NOT NULL;

select id from tbl_filme order by id desc limit 1



-----------------------------------------