// Marca automaticamente o link ativo na sidebar
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-item");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});
