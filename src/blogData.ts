export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'como-ganhar-dinheiro-online',
    title: 'Como Ganhar Dinheiro Online em 2026: Guia Definitivo',
    excerpt: 'Descubra as melhores estratégias reais para monetizar suas habilidades digitais através do FreelancePro.',
    content: `
      <h2>O Mercado Digital em 2026</h2>
      <p>O trabalho remoto não é mais uma tendência, é a norma. Em 2026, a economia de paixão (passion economy) atingiu seu auge, permitindo que qualquer pessoa com uma habilidade específica encontre um mercado global.</p>
      
      <h3>1. Venda de Micro-Serviços</h3>
      <p>Serviços rápidos, conhecidos como "Gigs", são a porta de entrada mais rápida para quem quer começar. Design de banners para redes sociais, edição de vídeos curtos ou até mesmo pequenos ajustes em sites WordPress são altamente demandados.</p>
      
      <h3>2. Criação de Produtos Digitais</h3>
      <p>Este é o verdadeiro "game changer". Em vez de vender seu tempo, você vende seu conhecimento. Crie packs de templates no Figma, e-books especializados ou cursos em vídeo que resolvam um problema real.</p>
      
      <blockquote>"Sua expertise é um ativo. Transforme-a em um produto digital e venda enquanto dorme."</blockquote>
      
      <h3>3. Especialização em IA</h3>
      <p>A automação não veio para substituir, mas para potencializar. Freelancers que dominam ferramentas de IA para gerar conteúdo, código ou imagens saem na frente em produtividade e qualidade.</p>
      
      <p>No FreelancePro, facilitamos todo esse processo. Você cria seu perfil, publica seus serviços e nós cuidamos do checkout seguro.</p>
    `,
    author: 'Equipe FreelancePro',
    date: '15 Abr, 2026',
    category: 'Estratégia',
    readTime: '8 min',
    image: 'https://picsum.photos/seed/money/800/600'
  },
  {
    id: '2',
    slug: 'como-contratar-freelancer',
    title: 'Como Contratar um Freelancer de Elite Sem Erros',
    excerpt: 'Evite dores de cabeça e garanta o sucesso do seu projeto seguindo este guia de contratação.',
    content: `
      <h2>Qualidade acima de tudo</h2>
      <p>Contratar o talento ideal pode ser o diferencial entre o sucesso e o fracasso da sua startup. Aqui no FreelancePro, filtramos os melhores, mas você também precisa saber escolher.</p>
      
      <h3>Passo 1: Defina o Escopo</h3>
      <p>Um erro comum é ser vago. Seja ultra-específico sobre o que você deseja receber no final do projeto.</p>
      
      <h3>Passo 2: Avalie o Portfólio</h3>
      <p>Não olhe apenas para o preço. Olhe para trabalhos entregues anteriormente que tenham a mesma estética ou complexidade do seu.</p>
      
      <p>Utilize nosso sistema de chat para tirar todas as dúvidas antes de liberar o primeiro pagamento no sistema de Escrow.</p>
    `,
    author: 'Ana Silva',
    date: '10 Abr, 2026',
    category: 'Para Clientes',
    readTime: '5 min',
    image: 'https://picsum.photos/seed/hire/800/600'
  },
  {
    id: '3',
    slug: 'ideias-produtos-digitais',
    title: '10 Ideias de Produtos Digitais Lucrativos para 2026',
    excerpt: 'Templates, presets, e-books e mais. O que mais vende hoje no marketplace?',
    content: `
      <h2>Produtos de Alta Conversão</h2>
      <p>Se você tem um conhecimento técnico, você tem uma mina de ouro. Veja o que está bombando no FreelancePro:</p>
      
      <ol>
        <li>Templates de Automação para Notion</li>
        <li>Prompts específicos para IA Generativa</li>
        <li>Kits de UI/UX para Aplicativos Financeiros</li>
        <li>Cursos Rápidos de "Como Fazer X em 30 Minutos"</li>
        <li>Planilhas Inteligentes de Gestão de Tráfego</li>
      </ol>
      
      <p>A vantagem dos produtos digitais é a escala. No FreelancePro, a entrega é automática após o pagamento confirmado pelo Mercado Pago.</p>
    `,
    author: 'Carlos Dev',
    date: '05 Abr, 2026',
    category: 'Produtos',
    readTime: '6 min',
    image: 'https://picsum.photos/seed/products/800/600'
  }
];
