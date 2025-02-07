document.addEventListener('DOMContentLoaded', () => {
    fetch('setup.json')
        .then(response => response.json())
        .then(data => {
            renderNavigation(data);
            renderContent(data);
        })
        .catch(error => console.error('Error loading the JSON file:', error));
});

function renderNavigation(data) {
    const nav = document.getElementById('category-nav');
    Object.keys(data).forEach(category => {
        const link = document.createElement('a');
        link.href = `#${category}`;
        link.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        nav.appendChild(link);
    });
}

function renderContent(data) {
    const main = document.getElementById('main-content');
    Object.entries(data).forEach(([category, items]) => {
        const section = document.createElement('section');
        section.id = category;
        
        const heading = document.createElement('h2');
        heading.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        section.appendChild(heading);
        
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';
        
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            
            const icon = document.createElement('i');
            icon.className = item.icon;
            icon.classList.add('card-icon');
            card.appendChild(icon);
            
            if (item.image) {
                const img = document.createElement('img');
                img.src = item.image;
                img.alt = item.name;
                card.appendChild(img);
            }
            
            const title = document.createElement('h3');
            title.textContent = item.name;
            card.appendChild(title);
            
            const description = document.createElement('p');
            description.textContent = item.description;
            card.appendChild(description);
            
            if (item.url) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', () => {
                    window.open(item.url, '_blank');
                });
            }
            
            cardContainer.appendChild(card);
        });
        
        section.appendChild(cardContainer);
        main.appendChild(section);
    });
}
