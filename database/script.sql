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