/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor() {}
  render(ticket) {
    document.querySelector(".tickets").insertAdjacentHTML(
      "beforeend",
      `
  <li class="ticket" data-id =${ticket.id}>
    <input type ="checkbox" class="status-checkbox">
    <div class="description">
      <p class="short-description">${ticket.name}</p>
      <p class="full-description deactive">${ticket.description}</p>
    </div>
  <div class="date">${new Date(ticket.created).toLocaleString("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })}
  </div>
  <button class="btn change-ticket"><div class="change-ticket">&#9998</div></button>
  <button class="btn delete-ticket"><div class="delete-ticket">&#10006</div></button>
</li> `
    );
    document.querySelector(".status-checkbox").checked = ticket.status;
  }
}
