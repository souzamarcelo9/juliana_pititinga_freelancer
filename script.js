document.addEventListener('DOMContentLoaded', () => {

    // ====================================
    // 1. FUNCIONALIDADE DO MENU MOBILE
    // ====================================
    // ... (código do menu mobile) ...
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
    // ... (código da animação de rolagem) ...
    const elementosParaAnimar = document.querySelectorAll('.secao, .servico-card, .projeto-item');
    const imagemPerfil = document.querySelector('.conteudo-sobre .imagem-perfil');

    if (imagemPerfil) {
        imagemPerfil.classList.add('animacao-sobre-inicio');
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');

                if (entry.target === imagemPerfil) {
                    entry.target.classList.remove('animacao-sobre-inicio');
                    entry.target.classList.add('animacao-sobre-fim');
                    observer.unobserve(entry.target);
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


    // ====================================
    // 3. FUNCIONALIDADE DE FILTRAGEM DE PROJETOS
    // ====================================
    // ... (código de filtragem de projetos) ...
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
    // ... (código do slider de vídeos) ...
    const videoSlides = document.querySelectorAll('.video-slide');
    let currentVideo = 0;

    function changeVideo() {
        videoSlides[currentVideo].classList.remove('ativo');
        currentVideo = (currentVideo + 1) % videoSlides.length;
        videoSlides[currentVideo].classList.add('ativo');
    }

    if (videoSlides.length > 1) {
        setInterval(changeVideo, 8000); // 8000ms = 8 segundos
    }

    // ====================================
    // 5. MODAL DE VISUALIZAÇÃO DE PROJETOS
    // ====================================
    const modal = document.getElementById('modal-visualizacao');
    const fecharBtn = document.querySelector('.fechar-modal');
    // Obs: itensProjeto já foi definido na seção 3

    itensProjeto.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o link de navegar

            // 1. Captura de dados do item clicado
            const imgSrc = item.querySelector('img').src;
            const titulo = item.querySelector('.info-overlay h3').textContent;
            const categoria = item.querySelector('.info-overlay p span').textContent;
            const linkDetalhe = item.getAttribute('href');

            // 2. Preenche o modal
            document.getElementById('modal-imagem').src = imgSrc;
            document.querySelector('#modal-info h3').textContent = titulo;
            document.querySelector('#modal-info p').textContent = `Categoria: ${categoria}`;

            // 3. O link "Ver Projeto Completo" leva ao link original do <a>
            document.querySelector('.btn-detalhe-projeto').setAttribute('href', linkDetalhe);

            // 4. Exibe o modal
            modal.style.display = 'block';
        });
    });

    // Função para fechar o modal
    fecharBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fechar se clicar fora do modal
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});