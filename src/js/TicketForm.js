/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor() {}
  createForm() {
    document.querySelector(".container").insertAdjacentHTML(
      "afterend",
      `
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
  </div>`
    );
  }
  createPopupDelete() {
    document.querySelector(".container").insertAdjacentHTML(
      "afterend",
      `
    <div class="form-container delete deactive">
      <div class="form-wrap delete">
        <h2 class="form-header delete">Удалить тикет</h2>
        <p class="delete-text">Вы уверены что хотите удалить тикет?Это действие необратимо.</p>
        <div class="btn-wrap delete-btn">
          <button type="reset" class="btn delete btn-reset">Отмена</button>
          <button type="submit" class="btn delete btn-submit">Ок</button>
        </div>
      </div>
    </div>`
    );
  }
}
