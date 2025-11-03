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

        // Fechar menu ao clicar em um item (opcional)
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
    // Inclui todas as seções, cards de serviço e itens de projeto
    const elementosParaAnimar = document.querySelectorAll('.secao, .servico-card, .projeto-item');

    // Elemento específico para a animação SLIDE/FADE da imagem de perfil
    const imagemPerfil = document.querySelector('.conteudo-sobre .imagem-perfil');

    // Se a imagem de perfil existir, aplicamos o estado inicial
    if (imagemPerfil) {
        imagemPerfil.classList.add('animacao-sobre-inicio');
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');

                // Lógica Específica para a imagem de perfil (Fade e Slide)
                if (entry.target === imagemPerfil) {
                    entry.target.classList.remove('animacao-sobre-inicio');
                    entry.target.classList.add('animacao-sobre-fim');
                    // Desliga o observador para esta imagem após a primeira animação
                    observer.unobserve(entry.target);
                }

            }
        });
    }, {
        threshold: 0.1 // Começa a animar quando 10% do elemento estiver visível
    });

    // Observa todos os elementos genéricos
    elementosParaAnimar.forEach(el => {
        el.classList.add('oculto');
        observer.observe(el);
    });

    // Observa a imagem de perfil (se ela existir)
    if (imagemPerfil) {
        observer.observe(imagemPerfil);
    }


    // ====================================
    // 3. FUNCIONALIDADE DE FILTRAGEM DE PROJETOS
    // ====================================
    const filtroBotoes = document.querySelectorAll('.filtro-btn');
    const itensProjeto = document.querySelectorAll('.grid-projetos .projeto-item');

    filtroBotoes.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'ativo' de todos os botões e adiciona ao clicado
            filtroBotoes.forEach(btn => btn.classList.remove('ativo'));
            button.classList.add('ativo');

            const filtro = button.dataset.filtro; // Pega o valor do atributo data-filtro

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
        // Remove a classe 'ativo' do vídeo atual
        videoSlides[currentVideo].classList.remove('ativo');

        // Move para o próximo vídeo ou volta para o primeiro
        currentVideo = (currentVideo + 1) % videoSlides.length;

        // Adiciona a classe 'ativo' ao novo vídeo
        videoSlides[currentVideo].classList.add('ativo');
    }

    // Inicia a troca automática de vídeos a cada 8 segundos
    if (videoSlides.length > 1) {
        setInterval(changeVideo, 6000); // 8000ms = 8 segundos
    }
});