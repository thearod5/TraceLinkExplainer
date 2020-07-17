import { objectContainsKeys } from "../util/TypeUtil";

export interface CustomError {
  error: string;
  message: string;
}

export function isError(obj: object): obj is CustomError {
  const requiredKeys: string[] = ["error", "message"];
  return objectContainsKeys(obj, requiredKeys);
  return true;
}

export function createAlertMessage(error: CustomError): string {
  const message = [
    "An error occurred.",
    "",
    "Error Type:",
    error.error,
    "",
    "Message:",
    error.message,
  ].join("\n");
  return message;
}
