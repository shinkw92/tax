// 블로그 글 데이터 관리 (여기에 글을 추가하면 홈페이지에 바로 반영됩니다)
const blogPosts = [
    {
        id: 1,
        title: "2026년 상반기 주요 세법 개정안 안내",
        category: "절세 팁",
        summary: "올해부터 달라지는 주요 세법 내용을 알기 쉽게 정리해 드립니다.",
        link: "tax-info.html",
        imgText: "Tax Tip 1"
    },
    {
        id: 2,
        title: "효율적인 사전 증여 전략 세우기",
        category: "상속/증여",
        summary: "가족의 미래를 위한 현명한 자산 이전 방법을 전문가와 상의하세요.",
        link: "tax-info.html",
        imgText: "Tax Tip 2"
    },
    {
        id: 3,
        title: "1주택자 비과세 요건 완벽 가이드",
        category: "부동산 세무",
        summary: "복잡한 부동산 양도소득세, 이것만 알면 실수하지 않습니다.",
        link: "tax-info.html",
        imgText: "Tax Tip 3"
    }
];

// 블로그 글 렌더링 함수
function renderBlogPosts() {
    const container = document.getElementById('blog-posts-container');
    if (!container) return;

    container.innerHTML = blogPosts.map(post => `
        <article class="blog-card">
            <div class="blog-card-img">${post.imgText}</div>
            <div class="blog-card-content">
                <span class="category">${post.category}</span>
                <h3>${post.title}</h3>
                <p>${post.summary}</p>
                <a href="${post.link}" class="read-more">자세히 보기</a>
            </div>
        </article>
    `).join('');
}

// 기존 애니메이션 로직 유지 및 초기화 실행
window.addEventListener('load', () => {
    renderBlogPosts();
    revealOnScroll(); // 렌더링 후 애니메이션 재계산
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.padding = '20px 0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    }
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.service-card, .about-text, .about-img, .contact-info, .map-placeholder');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Initial setup for reveal animations
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Contact form interaction
const mapPlaceholder = document.querySelector('.map-placeholder');
if (mapPlaceholder) {
    mapPlaceholder.addEventListener('click', () => {
        alert('실제 구현 시 구글 지도 또는 카카오 지도가 여기에 표시됩니다.');
    });
}
