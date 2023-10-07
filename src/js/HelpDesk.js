import TicketService from "./TicketService";
import Ticket from "./Ticket";
import TicketView from "./TicketView";
import TicketForm from "./TicketForm";
/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
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

    document.querySelector(".tickets").addEventListener("click", (e) => {
      if (e.target.classList.contains("change-ticket")) {
        ticket = e.target.closest("li");
        const form = document.querySelector(".form-container");
        form.querySelector(".form-header").textContent = "Изменить тикет";
        form.classList.add("change");
        form.classList.remove("deactive");
        form.querySelector("input").value =
          ticket.querySelector(".short-description").textContent;
        form.querySelector("textarea").value =
          ticket.querySelector(".full-description").textContent;
      }
      if (e.target.classList.contains("delete-ticket")) {
        ticket = e.target.closest("li");
        const form = document.querySelector(".form-container.delete");
        form.classList.remove("deactive");
      }
      if (e.target.closest(".description")) {
        ticket = e.target.closest("li");
        if (
          ticket
            .querySelector(".full-description")
            .classList.contains("deactive")
        ) {
          return ticket
            .querySelector(".full-description")
            .classList.remove("deactive");
        }
        return ticket
          .querySelector(".full-description")
          .classList.add("deactive");
      }
    });
    document.querySelectorAll(".btn-reset").forEach((element) => {
      element.addEventListener("click", (e) => {
        e.target.closest(".form-container").classList.add("deactive");
        if (e.target.closest(".form-container").classList.contains("change")) {
          e.target.closest(".form-container").classList.remove("change");
        }
      });
    });
    document.querySelectorAll(".btn-submit").forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        const container = e.target.closest(".form-container");
        const form = e.target.closest(".ticket-form");

        if (container.classList.contains("delete")) {
          this.ticketService.delete(ticket.dataset.id, async (result) => {
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
            description: form.querySelector("textarea").value,
          };
          return this.ticketService.update(
            ticket.dataset.id,
            JSON.stringify(data),
            async (result) => {
              const res = await result;
              e.target.closest(".form-container").classList.add("deactive");
              if (res) {
                alert("Тикет исправлен");
                this.renderTickets();
              }
            }
          );
        } else {
          const data = {
            name: form.querySelector("input").value,
            description: form.querySelector("textarea").value,
          };
          return this.ticketService.create(
            JSON.stringify(data),
            async (result) => {
              const res = await result;
              e.target.closest(".form-container").classList.add("deactive");
              if (res) {
                alert("Тикет добавлен");
                this.renderTickets();
              }
            }
          );
        }
      });
    });
  }

  renderTickets() {
    document.querySelectorAll(".ticket").forEach((el) => {
      el.remove();
    });
    this.ticketService.list(async (result) => {
      const res = await result;
      res.forEach((element) => {
        const Tick = new Ticket({
          id: element.id,
          name: element.name,
          description: element.description,
          status: element.status,
          created: element.created,
        });
        this.ticketView.render(Tick);
      });
    });
  }
}
