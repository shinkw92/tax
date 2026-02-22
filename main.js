// 블로그 글 렌더링 함수 (Firebase Firestore 연동)
async function renderBlogPosts() {
    const container = document.getElementById('blog-posts-container');
    if (!container || !window.fb) return;

    try {
        // 'posts' 컬렉션에서 작성일 역순으로 데이터 가져오기
        const q = window.fb.query(window.fb.collection(window.fb.db, "posts"), window.fb.orderBy("createdAt", "desc"));
        const querySnapshot = await window.fb.getDocs(q);
        
        const posts = [];
        querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() });
        });

        // 데이터가 없을 경우 기본 안내 메시지
        if (posts.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 50px;">등록된 블로그 글이 없습니다. 새 글을 작성해 보세요.</p>';
            return;
        }

        container.innerHTML = posts.map(post => `
            <article class="blog-card">
                <div class="blog-card-img">${post.category || 'Tax Tip'}</div>
                <div class="blog-card-content">
                    <span class="category">${post.category}</span>
                    <h3>${post.title}</h3>
                    <p>${post.summary}</p>
                    <a href="tax-info.html" class="read-more">자세히 보기</a>
                </div>
            </article>
        `).join('');
        
        // 애니메이션 다시 적용
        revealOnScroll();
    } catch (error) {
        console.error("Firebase 로딩 오류:", error);
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: red;">데이터를 불러오는 중 오류가 발생했습니다. Firebase 설정을 확인하세요.</p>';
    }
}

// 글쓰기 폼 제어 로직
document.addEventListener('DOMContentLoaded', () => {
    const showFormBtn = document.getElementById('show-post-form');
    const cancelFormBtn = document.getElementById('cancel-post');
    const formContainer = document.getElementById('post-form-container');
    const blogForm = document.getElementById('blog-form');

    if (showFormBtn) {
        showFormBtn.addEventListener('click', () => {
            formContainer.style.display = 'block';
            showFormBtn.style.display = 'none';
        });
    }

    if (cancelFormBtn) {
        cancelFormBtn.addEventListener('click', () => {
            formContainer.style.display = 'none';
            showFormBtn.style.display = 'inline-block';
        });
    }

    if (blogForm) {
        blogForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const title = document.getElementById('post-title').value;
            const category = document.getElementById('post-category').value;
            const summary = document.getElementById('post-summary').value;

            try {
                await window.fb.addDoc(window.fb.collection(window.fb.db, "posts"), {
                    title,
                    category,
                    summary,
                    createdAt: new Date(),
                    imgText: category.substring(0, 2)
                });

                alert('글이 성공적으로 등록되었습니다!');
                blogForm.reset();
                formContainer.style.display = 'none';
                showFormBtn.style.display = 'inline-block';
                renderBlogPosts(); // 목록 새로고침
            } catch (error) {
                alert('저장 중 오류가 발생했습니다: ' + error.message);
            }
        });
    }
});

// 기존 애니메이션 로직 유지 및 초기화 실행
window.addEventListener('load', () => {
    // Firebase SDK가 로드될 때까지 잠시 대기 후 실행 (모듈 방식 대응)
    setTimeout(renderBlogPosts, 500);
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
