/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
import createRequest from "./api/createRequest";
export default class TicketService {
  list(callback) {
    const res = createRequest({
      method: "allTickets",
    });
    if (res) {
      callback(res);
    }
  }

  get(id, callback) {}

  create(data, callback) {
    const res = createRequest({
      method: "createTicket",
      params: {
        method: "POST",
        body: data,
      },
    });
    if (res) {
      callback(res);
    }
  }

  update(id, data, callback) {
    const res = createRequest({
      method: "updateById",
      id: id,
      params: {
        method: "POST",
        body: data,
      },
    });
    if (res) {
      callback(res);
    }
  }

  delete(id, callback) {
    const res = createRequest({
      method: "deleteById",
      id: id,
      params: {
        // method:'DELETE',
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        // body:JSON.stringify({day:123}),
      },
    });
    if (res) {
      callback(res);
    }
  }
}
