// hover navigatie
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, { color: "#e63946", duration: 0.3 });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(link, { color: "#fff", duration: 0.3 });
    });
});

// webmentions
const WEBSITE = 'https://hellokittyuncensored.github.io/MyRoutine/';

function getType(type) {
    if (type === 'like-of')      return 'Like';
    if (type === 'repost-of')    return 'Repost';
    if (type === 'in-reply-to')  return 'Reactie';
    if (type === 'mention-of')   return 'Vermelding';
    return 'Link';
}

async function laadMentions() {
    const response = await fetch(`https://webmention.io/api/mentions.jf2?domain=${WEBSITE}`);
    const data = await response.json();
    const mentions = data.children || [];

    const container = document.getElementById('mentions');

    if (mentions.length === 0) {
        container.innerHTML = '<p>Er zijn nog geen vermeldingen.</p>';
        return;
    }

    container.innerHTML = mentions.map(m => `

        <div class="mention-card">
            <h3>${m.author?.name || 'Onbekend'}</h3>
            <p>Type: ${getType(m['wm-property'])}</p>
            <p>Pagina: <a href="${m['wm-target']}">${m['wm-target']}</a></p>
            <p>Bron: <a href="${m.url}">${m.url}</a></p>
            <p>Datum: ${m.published ? new Date(m.published).toLocaleDateString('nl-BE') : 'Onbekend'}</p>
            ${m.content ? `<p>Inhoud: ${m.content.text}</p>` : ''}
        </div>

    `).join('');
}

laadMentions();
