document.addEventListener('DOMContentLoaded', () => {

    // ====================================
    // 1. FUNCIONALIDADE DO MENU MOBILE
    // ====================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.menu-principal');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('ativo');
            menuToggle.classList.toggle('aberto');
        });

        navMenu.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('ativo');
                menuToggle.classList.remove('aberto');
            });
        });
    }

    // ====================================
    // 2. ANIMAÇÃO DE ROLAGEM (Intersection Observer)
    // ====================================
    // Inclui todas as seções, cards de serviço, itens de projeto e a nova seção de Contato/Inovação
    const elementosParaAnimar = document.querySelectorAll('.secao, .servico-card, .projeto-item, .inovacao-grid-container,#ideia');
    const imagemPerfil = document.querySelector('.conteudo-sobre .imagem-perfil');
    const contatoFormCard = document.querySelector('.contato-form-card');
    const contatoInfoCard = document.querySelector('.contato-info-card');
    const infoItens = document.querySelectorAll('.contato-info-card .contato-item'); // Itens dentro do card de info

    if (imagemPerfil) {
        imagemPerfil.classList.add('animacao-sobre-inicio');
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');

                // Animação da Imagem de Perfil
                if (entry.target === imagemPerfil) {
                    entry.target.classList.remove('animacao-sobre-inicio');
                    entry.target.classList.add('animacao-sobre-fim');
                    observer.unobserve(entry.target);
                }

                // Animação da Seção de Contato
                if (entry.target === contatoFormCard) {
                    contatoInfoCard.classList.add('visivel');
                    // Animação sequencial dos itens de info (individualmente)
                    infoItens.forEach(item => {
                        item.classList.add('visivel');
                    });
                    observer.unobserve(contatoFormCard);
                }

            }
        });
    }, {
        threshold: 0.1
    });

    elementosParaAnimar.forEach(el => {
        el.classList.add('oculto');
        observer.observe(el);
    });

    if (imagemPerfil) {
        observer.observe(imagemPerfil);
    }

    // Observar o card de formulário de contato e o card de info (para a animação)
    if (contatoFormCard) observer.observe(contatoFormCard);
    if (contatoInfoCard) observer.observe(contatoInfoCard);


    // ====================================
    // 3. FUNCIONALIDADE DE FILTRAGEM DE PROJETOS
    // ====================================
    const filtroBotoes = document.querySelectorAll('.filtro-btn');
    const itensProjeto = document.querySelectorAll('.grid-projetos .projeto-item');

    filtroBotoes.forEach(button => {
        button.addEventListener('click', () => {
            filtroBotoes.forEach(btn => btn.classList.remove('ativo'));
            button.classList.add('ativo');

            const filtro = button.dataset.filtro;

            itensProjeto.forEach(item => {
                const categoriaItem = item.dataset.categoria;
                if (filtro === 'todos' || categoriaItem === filtro) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ====================================
    // 4. FUNCIONALIDADE DE SLIDE DE VÍDEOS DE FUNDO
    // ====================================
    const videoSlides = document.querySelectorAll('.video-slide');
    let currentVideo = 0;

    function changeVideo() {
        videoSlides[currentVideo].classList.remove('ativo');
        currentVideo = (currentVideo + 1) % videoSlides.length;
        videoSlides[currentVideo].classList.add('ativo');
    }

    if (videoSlides.length > 1) {
        setInterval(changeVideo, 8000); // Alterado para 8 segundos conforme a intenção
    }

    // ====================================
    // 5. MODAL DE VISUALIZAÇÃO DE PROJETOS (AJUSTADO PARA NOVA PÁGINA)
    // ====================================
    const modal = document.getElementById('modal-visualizacao');
    const fecharBtn = document.querySelector('.fechar-modal');

    itensProjeto.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            const imgSrc = item.querySelector('img').src;
            const titulo = 'Álbum de fotos GOD WRITES';//item.querySelector('.info-overlay h3').textContent;
            const categoria = item.querySelector('.info-overlay p span').textContent;

            // SIMULAÇÃO DE MAIS IMAGENS PARA O CARROSSEL NA NOVA PÁGINA
            const imagensCarrossel = [
                'Logo GW - Assinatura Secundária Azul Médio Vertical.jpg',
                //imgSrc, // Imagem principal
                'projeto2.jpeg', // Adicione o URL de cada imagem extra aqui
                'projeto-controle-remoto-guindaste.jpeg',
                'zwzmf_WhatsApp Image 2025-11-12 at 10.04.19.jpeg',
                'zfftt_WhatsApp Image 2025-11-12 at 10.10.14.jpeg',
                'xktif_WhatsApp Image 2025-11-12 at 10.04.19.jpeg',
                'woyvi_WhatsApp Image 2025-11-12 at 10.04.19.jpeg',
                'WhatsApp Image 2025-11-12 at 10.09.43.jpeg',
                'WhatsApp Image 2025-11-12 at 10.04.52.jpeg',
                'WhatsApp Image 2025-11-12 at 10.04.19.jpeg',
                'WhatsApp Image 2025-11-12 at 10.04.18.jpeg',
                'vtcit_WhatsApp Image 2025-11-12 at 10.04.19.jpeg',
                'sistema_combate_incendio.jpeg',
                'rpais_WhatsApp Image 2025-11-12 at 10.04.19.jpeg',
                'rodtp_WhatsApp Image 2025-11-12 at 10.04.18.jpeg',
                'quuws_WhatsApp Image 2025-11-12 at 10.04.19.jpeg',
                'qatzn_WhatsApp Image 2025-11-12 at 10.09.43.jpeg',
                'projeto-ihm-display.jpeg',
                'painel_eletronica.jpeg',
                'placa_eletronica7.png',
                'pdjrx_WhatsApp Image 2025-11-12 at 10.04.19.jpeg',
                'inversor1.jpeg',
                'hoqrd_WhatsApp Image 2025-11-12 at 10.04.52.jpeg',
                'hmduf_WhatsApp Image 2025-11-12 at 10.04.19.jpeg',
                'epcom_WhatsApp Image 2025-11-12 at 10.04.19.jpeg'
                //imgSrc.replace('.jpeg', '_detalhe1.jpeg'),
                //imgSrc.replace('.jpeg', '_detalhe2.jpeg'),
            ];
            const imagensParam = encodeURIComponent(JSON.stringify(imagensCarrossel));


            // Preenche o modal
            document.getElementById('modal-imagem').src = imgSrc;
            document.querySelector('#modal-info h3').textContent = titulo;
            document.querySelector('#modal-info p').textContent = `Categoria: ${categoria}`;

            // O botão "Ver mais" leva para a nova página de detalhes (detalhe-projeto.html)
            const linkDetalhePagina = `detalhe-projeto.html?titulo=${encodeURIComponent(titulo)}&categoria=${encodeURIComponent(categoria)}&imagens=${imagensParam}`;
            document.querySelector('.btn-detalhe-projeto').setAttribute('href', linkDetalhePagina);

            modal.style.display = 'block';
        });
    });

    fecharBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });


    // ====================================
    // 6. LÓGICA DO CARROSSEL DE IMAGENS (PARA detalhe-projeto.html)
    // ====================================
    const carrosselContainer = document.querySelector('.carrossel-container');

    if (carrosselContainer) { // Verifica se estamos na página de detalhe-projeto.html
        const urlParams = new URLSearchParams(window.location.search);
        const tituloProjeto = urlParams.get('titulo');
        const categoriaProjeto = urlParams.get('categoria');

        // Verifica se há imagens na URL, se não, usa um array vazio
        let imagensProjeto = [];
        try {
            const imagensParam = urlParams.get('imagens');
            if(imagensParam) {
                imagensProjeto = JSON.parse(decodeURIComponent(imagensParam));
            }
        } catch (e) {
            console.error("Erro ao decodificar parâmetro de imagens:", e);
        }

        // Preenche o título e categoria na página de detalhe
        const tituloElement = document.getElementById('titulo-projeto-detalhe');
        const categoriaElement = document.getElementById('categoria-projeto-detalhe');
        if (tituloElement) tituloElement.textContent = tituloProjeto || 'Projeto Não Encontrado';
        if (categoriaElement) categoriaElement.textContent = categoriaProjeto || '';


        const carrosselSlides = document.querySelector('.carrossel-slides');
        const carrosselPrev = document.querySelector('.carrossel-prev');
        const carrosselNext = document.querySelector('.carrossel-next');
        const carrosselDots = document.querySelector('.carrossel-dots');
        let slideIndex = 0;

        // Adiciona as imagens ao carrossel
        if (carrosselSlides && imagensProjeto.length > 0) {
            imagensProjeto.forEach((imgSrc, index) => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = `Imagem ${index + 1} do Projeto`;
                img.classList.add('carrossel-slide-item');
                carrosselSlides.appendChild(img);

                const dot = document.createElement('span');
                dot.classList.add('carrossel-dot');
                dot.addEventListener('click', () => currentSlide(index));
                carrosselDots.appendChild(dot);
            });
        }


        const slides = document.querySelectorAll('.carrossel-slide-item');
        const dots = document.querySelectorAll('.carrossel-dot');

        if (slides.length > 0) {
            function showSlides(n) {
                if (n >= slides.length) { slideIndex = 0; }
                if (n < 0) { slideIndex = slides.length - 1; }

                slides.forEach(slide => slide.classList.remove('ativo'));
                dots.forEach(dot => dot.classList.remove('ativo'));

                slides[slideIndex].classList.add('ativo');
                dots[slideIndex].classList.add('ativo');

                // Ajusta o transform para exibir o slide correto
                carrosselSlides.style.transform = `translateX(-${slideIndex * 100}%)`;
            }

            function plusSlides(n) {
                showSlides(slideIndex += n);
            }

            function currentSlide(n) {
                showSlides(slideIndex = n);
            }

            carrosselPrev.addEventListener('click', () => plusSlides(-1));
            carrosselNext.addEventListener('click', () => plusSlides(1));

            showSlides(slideIndex); // Mostra o primeiro slide ao carregar
        } else {
            // Esconde os controles se não houver slides
            if(carrosselPrev) carrosselPrev.style.display = 'none';
            if(carrosselNext) carrosselNext.style.display = 'none';
            if(carrosselDots) carrosselDots.style.display = 'none';
        }
    }
});