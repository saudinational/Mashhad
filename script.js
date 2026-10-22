const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// تاريخ السنة الحالية في التذييل.
document.getElementById('year').textContent = new Date().getFullYear();

// التاريخ المحلي، دون الاعتماد على خادم.
const dateEl = document.getElementById('today-date');
try {
  dateEl.textContent = new Intl.DateTimeFormat('ar-SA', {
    weekday: 'long', day: 'numeric', month: 'long'
  }).format(new Date());
} catch {
  dateEl.textContent = 'قراءة أعمق للمشهد';
}

// نموذج التحقق توضيحي فقط؛ لا يدّعي التحقق من صحة الأخبار.
document.getElementById('check-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const value = document.getElementById('source-input').value.trim();
  const message = document.getElementById('form-message');
  if (!value) {
    message.textContent = 'أدخل رابط الخبر أو عنوانه أولًا.';
    return;
  }
  message.textContent = 'هذه النسخة لا تفحص الخبر تلقائيًا. راجع مصدره الأصلي، وتاريخ النشر، وأكّده من مصادر مستقلة موثوقة.';
});

// نموذج النشرة تجريبي ولا يجمع البريد الإلكتروني أو يرسله.
document.getElementById('newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.getElementById('newsletter-message');
  const email = document.getElementById('email-input');
  if (!email.checkValidity()) {
    email.reportValidity();
    return;
  }
  message.textContent = 'شكرًا لاهتمامك بمَشهد! هذه نسخة تجريبية ولا يتم حفظ بريدك أو إرساله.';
  email.value = '';
});
