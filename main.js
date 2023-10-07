/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/api/createRequest.js
const createRequest = async function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let url = `http://localhost:3000?method=${options.method}&id=${options.id}`;
  let response = await fetch(url, options.params);
  let result = await response.json();
  return result;
};
/* harmony default export */ const api_createRequest = (createRequest);
;// CONCATENATED MODULE: ./src/js/TicketService.js
/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */

class TicketService {
  list(callback) {
    const res = api_createRequest({
      method: "allTickets"
    });
    if (res) {
      callback(res);
    }
  }
  get(id, callback) {}
  create(data, callback) {
    const res = api_createRequest({
      method: "createTicket",
      params: {
        method: "POST",
        body: data
      }
    });
    if (res) {
      callback(res);
    }
  }
  update(id, data, callback) {
    const res = api_createRequest({
      method: "updateById",
      id: id,
      params: {
        method: "POST",
        body: data
      }
    });
    if (res) {
      callback(res);
    }
  }
  delete(id, callback) {
    const res = api_createRequest({
      method: "deleteById",
      id: id,
      params: {
        // method:'DELETE',
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        // body:JSON.stringify({day:123}),
      }
    });
    if (res) {
      callback(res);
    }
  }
}
;// CONCATENATED MODULE: ./src/js/Ticket.js
class Ticket {
  constructor(_ref) {
    let {
      id,
      name,
      description,
      status,
      created
    } = _ref;
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.created = created;
  }
}
;// CONCATENATED MODULE: ./src/js/TicketView.js
/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
class TicketView {
  constructor() {}
  render(ticket) {
    document.querySelector(".tickets").insertAdjacentHTML("beforeend", `
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
      second: "numeric"
    })}
  </div>
  <button class="btn change-ticket"><div class="change-ticket">&#9998</div></button>
  <button class="btn delete-ticket"><div class="delete-ticket">&#10006</div></button>
</li> `);
    document.querySelector(".status-checkbox").checked = ticket.status;
  }
}
;// CONCATENATED MODULE: ./src/js/TicketForm.js
/**
 *  Класс для создания формы создания нового тикета
 * */
class TicketForm {
  constructor() {}
  createForm() {
    document.querySelector(".container").insertAdjacentHTML("afterend", `
  <div class="form-container deactive">
    <div class="form-wrap">
      <h2 class="form-header">Добавить тикет</h2>
      <form class="ticket-form">
        <div class="input-short-wrap">
          <h2 class="form-input-short-title">Краткое описание</h2>
          <input type="text" name ="name" class="short-description">
        </div>
        <div class="input-full-wrap">
          <h2 class="form-input-full-title">Подробное описание</h2>
          <textarea class="full-description" name ="description"></textarea>
        </div>
        <div class="btn-wrap">
          <button type="reset" class="btn btn-reset">Отмена</button>
          <button type="submit" class="btn btn-submit">Ок</button>
        </div>
      </form>
    </div>
  </div>`);
  }
  createPopupDelete() {
    document.querySelector(".container").insertAdjacentHTML("afterend", `
    <div class="form-container delete deactive">
      <div class="form-wrap delete">
        <h2 class="form-header delete">Удалить тикет</h2>
        <p class="delete-text">Вы уверены что хотите удалить тикет?Это действие необратимо.</p>
        <div class="btn-wrap delete-btn">
          <button type="reset" class="btn delete btn-reset">Отмена</button>
          <button type="submit" class="btn delete btn-submit">Ок</button>
        </div>
      </div>
    </div>`);
  }
}
;// CONCATENATED MODULE: ./src/js/HelpDesk.js




/**
 *  Основной класс приложения
 * */
class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.container = container;
    this.ticketService = new TicketService();
    this.ticketView = new TicketView();
    this.ticketForm = new TicketForm();
  }
  init() {
    let ticket;
    this.renderTickets();
    this.ticketForm.createPopupDelete();
    this.ticketForm.createForm();
    document.querySelector(".add-ticket").addEventListener("click", () => {
      document.querySelector(".form-container").classList.remove("deactive");
    });
    document.querySelector(".tickets").addEventListener("click", e => {
      if (e.target.classList.contains("change-ticket")) {
        ticket = e.target.closest("li");
        const form = document.querySelector(".form-container");
        form.querySelector(".form-header").textContent = "Изменить тикет";
        form.classList.add("change");
        form.classList.remove("deactive");
        form.querySelector("input").value = ticket.querySelector(".short-description").textContent;
        form.querySelector("textarea").value = ticket.querySelector(".full-description").textContent;
      }
      if (e.target.classList.contains("delete-ticket")) {
        ticket = e.target.closest("li");
        const form = document.querySelector(".form-container.delete");
        form.classList.remove("deactive");
      }
      if (e.target.closest(".description")) {
        ticket = e.target.closest("li");
        if (ticket.querySelector(".full-description").classList.contains("deactive")) {
          return ticket.querySelector(".full-description").classList.remove("deactive");
        }
        return ticket.querySelector(".full-description").classList.add("deactive");
      }
    });
    document.querySelectorAll(".btn-reset").forEach(element => {
      element.addEventListener("click", e => {
        e.target.closest(".form-container").classList.add("deactive");
        if (e.target.closest(".form-container").classList.contains("change")) {
          e.target.closest(".form-container").classList.remove("change");
        }
      });
    });
    document.querySelectorAll(".btn-submit").forEach(element => {
      element.addEventListener("click", e => {
        e.preventDefault();
        const container = e.target.closest(".form-container");
        const form = e.target.closest(".ticket-form");
        if (container.classList.contains("delete")) {
          this.ticketService.delete(ticket.dataset.id, async result => {
            const res = await result;
            e.target.closest(".form-container").classList.add("deactive");
            if (res) {
              alert("Тикет удален");
              return this.renderTickets();
            }
          });
        }
        if (container.classList.contains("change")) {
          const data = {
            name: form.querySelector("input").value,
            description: form.querySelector("textarea").value
          };
          return this.ticketService.update(ticket.dataset.id, JSON.stringify(data), async result => {
            const res = await result;
            e.target.closest(".form-container").classList.add("deactive");
            if (res) {
              alert("Тикет исправлен");
              this.renderTickets();
            }
          });
        } else {
          const data = {
            name: form.querySelector("input").value,
            description: form.querySelector("textarea").value
          };
          return this.ticketService.create(JSON.stringify(data), async result => {
            const res = await result;
            e.target.closest(".form-container").classList.add("deactive");
            if (res) {
              alert("Тикет добавлен");
              this.renderTickets();
            }
          });
        }
      });
    });
  }
  renderTickets() {
    document.querySelectorAll(".ticket").forEach(el => {
      el.remove();
    });
    this.ticketService.list(async result => {
      const res = await result;
      res.forEach(element => {
        const Tick = new Ticket({
          id: element.id,
          name: element.name,
          description: element.description,
          status: element.status,
          created: element.created
        });
        this.ticketView.render(Tick);
      });
    });
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const root = document.getElementById("root");
const app = new HelpDesk(root);
app.init();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;