import { Notify } from "quasar";

export function showMessageSucess(message) {
  Notify.create({
    message: message,
    color: "green",
  });
}

export function showMessageError(message) {
  Notify.create({
    message: message,
    color: "red",
  });
}
