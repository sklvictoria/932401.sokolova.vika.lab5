(function () {
    'use strict';

    const skillsList = document.getElementById('skills-list');
    const interactiveSection = document.getElementById('interactive-skills');
    const addSkillBtn = document.getElementById('add-skill-btn');
    const clearSkillsBtn = document.getElementById('clear-skills-btn');
    const toggleThemeBtn = document.getElementById('toggle-theme-btn');
    const toggleVisibilityBtn = document.getElementById('toggle-visibility-btn');
    
    const contactForm = document.getElementById('contact-form');
    const toggleFormBtn = document.getElementById('toggle-form-btn');

    const requiredElements = [
        { el: skillsList, id: '#skills-list' },
        { el: interactiveSection, id: '#interactive-skills' },
        { el: addSkillBtn, id: '#add-skill-btn' },
        { el: clearSkillsBtn, id: '#clear-skills-btn' },
        { el: toggleThemeBtn, id: '#toggle-theme-btn' },
        { el: toggleVisibilityBtn, id: '#toggle-visibility-btn' },
        { el: contactForm, id: '#contact-form' },
        { el: toggleFormBtn, id: '#toggle-form-btn' }
    ];

    for (const item of requiredElements) {
        if (!item.el) {
            console.error('Элемент не найден: ' + item.id);
            return;
        }
    }

    const STORAGE_SKILLS_KEY = 'traveler_skills';
    const STORAGE_THEME_KEY = 'traveler_theme';

    function createSkillItem(skillName) {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = skillName;
        li.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function () {
            li.remove();
            saveSkillsToStorage();
        });
        li.appendChild(deleteBtn);

        return li;
    }

    function saveSkillsToStorage() {
        const items = skillsList.querySelectorAll('li');
        const skillsData = [];
        items.forEach(function (li) {
            const span = li.querySelector('span');
            if (span) {
                skillsData.push(span.textContent);
            }
        });
        localStorage.setItem(STORAGE_SKILLS_KEY, JSON.stringify(skillsData));
    }

    function loadSkillsFromStorage() {
        const stored = localStorage.getItem(STORAGE_SKILLS_KEY);
        if (stored) {
            try {
                const skillsData = JSON.parse(stored);
                skillsData.forEach(function (skillName) {
                    const li = createSkillItem(skillName);
                    skillsList.appendChild(li);
                });
            } catch (e) {
                console.error('Ошибка при загрузке навыков из localStorage:', e);
            }
        }
    }

    function toggleTheme() {
        document.body.classList.toggle('theme-dark');
        const isDark = document.body.classList.contains('theme-dark');
        localStorage.setItem(STORAGE_THEME_KEY, isDark ? 'dark' : 'light');
        
        // Иконка
        toggleThemeBtn.textContent = isDark ? '☀️ Тема' : '🌙 Тема';
    }

    function loadThemeFromStorage() {
        const savedTheme = localStorage.getItem(STORAGE_THEME_KEY);
        if (savedTheme === 'dark') {
            document.body.classList.add('theme-dark');
            toggleThemeBtn.textContent = '☀️ Тема';
        }
    }

    function toggleSkillsVisibility() {
        skillsList.classList.toggle('invisible');
        const isHidden = skillsList.classList.contains('invisible');
        toggleVisibilityBtn.textContent = isHidden
            ? 'Показать список навыков'
            : 'Скрыть список навыков';
    }

    function toggleFormVisibility() {
        contactForm.classList.toggle('invisible');
        const isHidden = contactForm.classList.contains('invisible');
        toggleFormBtn.textContent = isHidden ? 'Показать форму' : 'Скрыть форму';
    }

    function addSkill() {
        const skillName = prompt('Введите название навыка для поездки:');
        if (skillName && skillName.trim() !== '') {
            const li = createSkillItem(skillName.trim());
            skillsList.appendChild(li);
            saveSkillsToStorage();
        }
    }

    function clearSkills() {
        const items = skillsList.querySelectorAll('li');
        if (items.length === 0) {
            alert('Навыки уже удалены');
            return;
        }
        items.forEach(function (li) {
            li.remove();
        });
        saveSkillsToStorage();
    }

    addSkillBtn.addEventListener('click', addSkill);
    clearSkillsBtn.addEventListener('click', clearSkills);
    toggleThemeBtn.addEventListener('click', toggleTheme);
    toggleVisibilityBtn.addEventListener('click', toggleSkillsVisibility);
    toggleFormBtn.addEventListener('click', toggleFormVisibility);

    loadThemeFromStorage();
    loadSkillsFromStorage();

})();