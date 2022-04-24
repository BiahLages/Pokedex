import express from 'express';
import path from 'path';

const __dirname = path.resolve(path.dirname(''));

console.log(__dirname);

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const port = 3003;
app.listen(port, () => {
    console.log(`Rodando na porta ${port}.`)
})

const pokedex = [
    {
        id: 1,
        numero: '004',
        nome: 'Charmander',
        tipo: 'Fogo',
        imagem: '/img/charmander.png',
        descricao: 'Tem preferência por coisas quentes. Quando chove, dizem que jorra fumaça da ponta da sua cauda.',
        altura: '0.6 m',
        peso: '8.5 kg',
        categoria: 'Lagarto',
        habilidade: 'Chama'
    },
    {
        id: 2,
        numero: '007',
        nome: 'Squirtle',
        tipo: 'Água',
        imagem: '/img/squirtle.png',
        descricao: 'Quando retrai seu longo pescoço para dentro da sua concha, esguicha água com força vigorosa.',
        altura: '0.5 m',
        peso: '9.0 kg',
        categoria: 'PequenaTtartaruga',
        habilidade: 'Torrente'
    },
    {
        id: 3,
        numero: '038',
        nome: 'Ninetales',
        tipo: 'Fogo',
        imagem: '/img/ninetales.png',
        descricao: 'É dito que vive 1000 anos, e cada uma da suas caudas é carregada com poderes sobrenaturais.',
        altura: '1.1 m',
        peso: '19.9 kg',
        categoria: 'Raposa',
        habilidade: 'Fogo Relâmpago'
    },
    {
        id: 4,
        numero: '053',
        nome: 'Persian',
        tipo: 'Normal',
        imagem: '/img/persian.png',
        descricao: 'Fazer com que esse Pokémon se aqueça com você exige muito esforço, e ele vai arranhar você no momento em que ficar irritado.',
        altura: '1.0 m',
        peso: '32.0 kg',
        categoria: 'Gato Elegante',
        habilidade: 'Técnico, Flexível'
    }
];

app.get('/', (req, res) => {
    res.render('index.ejs', {
        pokedex
    })
});

app.get('/detalhes/:id', (req, res) => {
    let poke;
    pokedex.filter((element) => {
        if(element.id == req.params.id){
            poke = element
        }
    })
    res.render('detalhes.ejs', {
        poke
    })
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro.ejs')
});

app.post('/cadastro', (req, res) => {
    let i = pokedex[pokedex.length - 1].id + 1
    const {nome, numero, tipo, imagem, descricao, altura, peso, categoria, habilidade} = req.body
    pokedex.push({id: i, nome, numero, tipo, imagem, descricao, altura, peso, categoria, habilidade})
    res.redirect('/')
});